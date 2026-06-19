import { addMinutes, format, parse } from "date-fns";
import type { OpeningHours, TimeRange, Weekday } from "./types";
import { WEEKDAYS } from "./types";

function parseTime(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function rangesForDay(hours: OpeningHours, day: Weekday): TimeRange[] {
  return hours[day] ?? [];
}

type ExistingAppointment = {
  startTime: string;
  endTime: string;
};

export function generateSlots(
  date: Date,
  durationMinutes: number,
  openingHours: OpeningHours,
  existing: ExistingAppointment[],
  slotStepMinutes = 15
): string[] {
  const weekday = WEEKDAYS[date.getDay()] as Weekday;
  const ranges = rangesForDay(openingHours, weekday);
  if (ranges.length === 0) return [];

  const booked = existing
    .filter((a) => a.startTime && a.endTime)
    .map((a) => ({ start: parseTime(a.startTime), end: parseTime(a.endTime) }));

  const slots: string[] = [];

  for (const range of ranges) {
    const rangeStart = parseTime(range.from);
    const rangeEnd = parseTime(range.to);

    for (let t = rangeStart; t + durationMinutes <= rangeEnd; t += slotStepMinutes) {
      const slotEnd = t + durationMinutes;
      const overlaps = booked.some((b) => t < b.end && slotEnd > b.start);
      if (!overlaps) slots.push(formatTime(t));
    }
  }

  return slots;
}

export function computeEndTime(startTime: string, durationMinutes: number): string {
  const base = parse(startTime, "HH:mm", new Date());
  return format(addMinutes(base, durationMinutes), "HH:mm");
}

export function parseOpeningHours(raw: unknown): OpeningHours {
  if (!raw || typeof raw !== "object") {
    throw new Error("Ungültige Öffnungszeiten");
  }
  return raw as OpeningHours;
}
