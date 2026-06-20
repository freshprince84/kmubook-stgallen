import type { Studio, SubscriptionStatus } from "@prisma/client";

export const SMS_OVERAGE_PRICE_CHF = 0.1;
export const STARTER_PRICE_CHF = 39;
export const SMS_QUOTA_STARTER = 50;
export const TRIAL_DAYS = 30;

export function isStudioActive(studio: Pick<Studio, "subscriptionStatus" | "trialEndsAt">): boolean {
  if (studio.subscriptionStatus === "active") return true;
  if (studio.subscriptionStatus === "trial" && studio.trialEndsAt > new Date()) return true;
  return false;
}

export function canSendSms(studio: Pick<Studio, "smsUsedThisMonth" | "smsQuotaMonthly">): boolean {
  return studio.smsUsedThisMonth < studio.smsQuotaMonthly;
}

export function subscriptionLabel(status: SubscriptionStatus): string {
  const labels: Record<SubscriptionStatus, string> = {
    trial: "Testphase",
    active: "Aktiv",
    past_due: "Zahlung ausstehend",
    cancelled: "Gekündigt",
  };
  return labels[status];
}

export function trialDaysLeft(trialEndsAt: Date): number {
  const diff = trialEndsAt.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
