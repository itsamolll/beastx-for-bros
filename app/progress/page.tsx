import { endOfWeek, startOfWeek, subWeeks } from 'date-fns';
import { prisma } from '@/lib/prisma';

export default async function ProgressPage() {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const sessions = await prisma.workoutSession.findMany({
    where: { date: { gte: weekStart, lte: weekEnd } },
    include: { entries: { include: { exercise: true } } }
  });

  const setsByGroup = new Map<string, number>();
  for (const session of sessions) {
    for (const entry of session.entries) {
      const group = entry.exercise.muscleGroup;
      setsByGroup.set(group, (setsByGroup.get(group) ?? 0) + entry.sets);
    }
  }

  const weeklyVolume = [] as { weekLabel: string; volume: number }[];
  for (let i = 0; i < 4; i++) {
    const start = startOfWeek(subWeeks(now, i), { weekStartsOn: 1 });
    const end = endOfWeek(subWeeks(now, i), { weekStartsOn: 1 });
    const weekSessions = await prisma.workoutSession.findMany({ where: { date: { gte: start, lte: end } }, include: { entries: true } });
    const volume = weekSessions.flatMap((s) => s.entries).reduce((sum, e) => sum + e.sets * e.reps * e.weightKg, 0);
    weeklyVolume.push({ weekLabel: `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`, volume });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Progress</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-zinc-500">Sessions this week</p>
          <p className="text-2xl font-bold">{sessions.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-zinc-500">Sets by muscle group</p>
          <ul className="text-sm">
            {[...setsByGroup.entries()].map(([group, sets]) => <li key={group} className="capitalize">{group.replace('_', ' ')}: {sets}</li>)}
            {setsByGroup.size === 0 && <li>No sets logged this week.</li>}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="mb-2 text-sm text-zinc-500">Total weekly volume (last 4 weeks)</p>
        <ul className="space-y-1 text-sm">
          {weeklyVolume.map((w) => <li key={w.weekLabel}>{w.weekLabel}: <strong>{w.volume.toFixed(1)} kg</strong></li>)}
        </ul>
      </div>
    </div>
  );
}
