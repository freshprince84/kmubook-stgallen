import { prisma } from "./db";
import { SMS_OVERAGE_PRICE_CHF, canSendSms } from "./billing";

type SendSmsParams = {
  studioId: string;
  toPhone: string;
  message: string;
  type: "confirmation" | "reminder_24h" | "reminder_2h" | "admin";
};

export async function sendSms(params: SendSmsParams): Promise<{ ok: boolean; mock: boolean }> {
  const studio = await prisma.studio.findUniqueOrThrow({ where: { id: params.studioId } });

  const provider = process.env.SMS_PROVIDER ?? "mock";
  const apiKey = process.env.SMS_API_KEY;
  const sender = process.env.SMS_SENDER ?? "KMU Book";

  let delivered = false;
  let mock = false;

  if (provider === "mock" || !apiKey) {
    console.info(`[SMS Mock] an ${params.toPhone}: ${params.message}`);
    delivered = true;
    mock = true;
  } else {
    // HTTP-Provider (z.B. SMS Pirates) — REST-Endpunkt per Env
    const endpoint = process.env.SMS_API_URL;
    if (!endpoint) throw new Error("SMS_API_URL fehlt");

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: sender,
        to: params.toPhone,
        text: params.message,
      }),
    });
    delivered = res.ok;
  }

  if (delivered) {
    await prisma.smsLog.create({
      data: {
        studioId: params.studioId,
        toPhone: params.toPhone,
        message: params.message,
        type: params.type,
      },
    });

    await prisma.studio.update({
      where: { id: params.studioId },
      data: { smsUsedThisMonth: { increment: 1 } },
    });
  }

  const withinQuota = canSendSms({
    smsUsedThisMonth: studio.smsUsedThisMonth + 1,
    smsQuotaMonthly: studio.smsQuotaMonthly,
  });

  if (!withinQuota && !mock) {
    console.warn(
      `Studio ${params.studioId}: SMS-Quota überschritten (Zusatz CHF ${SMS_OVERAGE_PRICE_CHF}/SMS)`,
    );
  }

  return { ok: delivered, mock };
}

export function formatConfirmationSms(
  studioName: string,
  date: string,
  time: string,
  cancelUrl: string,
): string {
  return `Termin bestätigt: ${date} ${time} bei ${studioName}. Absagen: ${cancelUrl}`;
}
