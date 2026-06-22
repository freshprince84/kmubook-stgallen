import type { OpeningHours } from "../../src/lib/types";

export const BLUM_HOURS: OpeningHours = {
  monday: [],
  tuesday: [{ from: "09:00", to: "18:30" }],
  wednesday: [{ from: "09:00", to: "18:30" }],
  thursday: [{ from: "09:00", to: "18:30" }],
  friday: [{ from: "09:00", to: "18:30" }],
  saturday: [{ from: "08:00", to: "15:00" }],
  sunday: [],
};

export const STANDARD_HOURS: OpeningHours = {
  monday: [{ from: "09:00", to: "18:00" }],
  tuesday: [{ from: "09:00", to: "18:00" }],
  wednesday: [{ from: "09:00", to: "18:00" }],
  thursday: [{ from: "09:00", to: "18:00" }],
  friday: [{ from: "09:00", to: "18:00" }],
  saturday: [{ from: "08:00", to: "16:00" }],
  sunday: [],
};

export const FLEXIBLE_HOURS: OpeningHours = {
  monday: [{ from: "08:00", to: "19:00" }],
  tuesday: [{ from: "08:00", to: "19:00" }],
  wednesday: [{ from: "08:00", to: "19:00" }],
  thursday: [{ from: "08:00", to: "19:00" }],
  friday: [{ from: "08:00", to: "19:00" }],
  saturday: [],
  sunday: [],
};
