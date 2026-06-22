import type { OpeningHours } from "@/lib/types";

const DAY_LABELS: Record<keyof OpeningHours, string> = {
  monday: "Montag",
  tuesday: "Dienstag",
  wednesday: "Mittwoch",
  thursday: "Donnerstag",
  friday: "Freitag",
  saturday: "Samstag",
  sunday: "Sonntag",
};

export function OpeningHoursDisplay({ hours }: { hours: OpeningHours }) {
  return (
    <dl className="space-y-2 text-sm">
      {(Object.keys(DAY_LABELS) as (keyof OpeningHours)[]).map((day) => {
        const ranges = hours[day];
        const value = ranges.length
          ? ranges.map((r) => `${r.from} – ${r.to}`).join(", ")
          : "Geschlossen";
        return (
          <div key={day} className="flex justify-between gap-4 border-b border-black/5 py-2">
            <dt className="text-studio-text-muted">{DAY_LABELS[day]}</dt>
            <dd className="font-medium">{value}</dd>
          </div>
        );
      })}
    </dl>
  );
}
