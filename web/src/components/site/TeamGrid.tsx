type TeamMember = {
  id: string;
  name: string;
  role?: string | null;
  bio?: string | null;
};

export function TeamGrid({ members }: { members: TeamMember[] }) {
  if (!members.length) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m) => (
        <div key={m.id} className="glass-card p-6 text-center">
          <div
            className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full text-2xl font-semibold text-white"
            style={{ background: "var(--studio-primary)" }}
          >
            {m.name.charAt(0)}
          </div>
          <h3 className="font-display text-xl font-semibold">{m.name}</h3>
          {m.role && <p className="mt-1 text-sm text-studio-primary">{m.role}</p>}
          {m.bio && <p className="mt-3 text-sm leading-relaxed text-studio-text-muted">{m.bio}</p>}
        </div>
      ))}
    </div>
  );
}
