import type { TemplateVariant } from "@prisma/client";

export type StudioTheme = {
  primary: string;
  secondary: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  fontDisplay: string;
  fontBody: string;
  heroGradient: string;
};

const BASE: Omit<StudioTheme, "primary" | "secondary" | "heroGradient"> = {
  surface: "#faf9f7",
  surfaceMuted: "#f3f1ed",
  text: "#1a1a1a",
  textMuted: "#6b7280",
  fontDisplay: "var(--font-display)",
  fontBody: "var(--font-body)",
};

export function getStudioTheme(
  variant: TemplateVariant,
  primaryColor: string,
  secondaryColor?: string | null
): StudioTheme {
  const secondary = secondaryColor ?? adjustColor(primaryColor, 0.15);

  if (variant === "care_calm") {
    return {
      ...BASE,
      primary: primaryColor,
      secondary: secondaryColor ?? "#e8f4f0",
      surface: "#f8fafb",
      surfaceMuted: "#eef4f2",
      heroGradient: `linear-gradient(135deg, ${primaryColor}22 0%, #f8fafb 60%)`,
    };
  }

  if (variant === "salon_solo") {
    return {
      ...BASE,
      primary: primaryColor,
      secondary,
      heroGradient: `linear-gradient(160deg, ${primaryColor}33 0%, #faf9f7 55%)`,
    };
  }

  return {
    ...BASE,
    primary: primaryColor,
    secondary,
    heroGradient: `linear-gradient(145deg, ${primaryColor}28 0%, #faf9f7 50%)`,
  };
}

function adjustColor(hex: string, amount: number): string {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const r = Math.min(255, Math.round(parseInt(h.slice(0, 2), 16) * (1 + amount)));
  const g = Math.min(255, Math.round(parseInt(h.slice(2, 4), 16) * (1 + amount)));
  const b = Math.min(255, Math.round(parseInt(h.slice(4, 6), 16) * (1 + amount)));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function themeToCssVars(theme: StudioTheme): Record<string, string> {
  return {
    "--studio-primary": theme.primary,
    "--studio-secondary": theme.secondary,
    "--studio-surface": theme.surface,
    "--studio-surface-muted": theme.surfaceMuted,
    "--studio-text": theme.text,
    "--studio-text-muted": theme.textMuted,
    "--studio-hero-gradient": theme.heroGradient,
  };
}
