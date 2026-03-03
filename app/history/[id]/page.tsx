import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function SessionDetailPage({ params }: { params: { id: string } }) {
  const session = await prisma.workoutSession.findUnique({
    where: { id: Number(params.id) },
    include: { entries: { include: { exercise: true } } }
  });

  if (!session) return notFound();

  const totalVolume = session.entries.reduce((sum, e) => sum + e.sets * e.reps * e.weightKg, 0);

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-4">
      <h2 className="text-xl font-semibold">Session #{session.id} Summary</h2>
      <p className="text-sm text-zinc-500">Total Volume: {totalVolume.toFixed(1)} kg</p>
      <div className="space-y-2">
        {session.entries.map((entry) => (
          <div key={entry.id} className="rounded border border-border p-3">
            <p className="font-medium">{entry.exercise.name}</p>
            <p className="text-sm">{entry.sets} sets × {entry.reps} reps × {entry.weightKg} kg</p>
            {entry.notes && <p className="text-xs text-zinc-500">{entry.notes}</p>}
          </div>
        ))}
      </div>
      {session.notes && <p className="text-sm">Session Notes: {session.notes}</p>}
    </div>
  );
}
