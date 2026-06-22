export type TimeRange = { from: string; to: string };

export type OpeningHours = {
  monday: TimeRange[];
  tuesday: TimeRange[];
  wednesday: TimeRange[];
  thursday: TimeRange[];
  friday: TimeRange[];
  saturday: TimeRange[];
  sunday: TimeRange[];
};

export const WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export const DEFAULT_OPENING_HOURS: OpeningHours = {
  monday: [{ from: "09:00", to: "18:00" }],
  tuesday: [{ from: "09:00", to: "18:00" }],
  wednesday: [{ from: "09:00", to: "18:00" }],
  thursday: [{ from: "09:00", to: "18:00" }],
  friday: [{ from: "09:00", to: "18:00" }],
  saturday: [{ from: "08:00", to: "15:00" }],
  sunday: [],
};
