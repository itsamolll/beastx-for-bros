import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function HistoryPage() {
  const sessions = await prisma.workoutSession.findMany({
    orderBy: { date: 'desc' },
    include: { entries: true }
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Workout History</h2>
      <div className="space-y-3">
        {sessions.map((session) => (
          <Link key={session.id} href={`/history/${session.id}`} className="block rounded-xl border border-border bg-card p-4">
            <p className="font-medium">Session #{session.id}</p>
            <p className="text-sm text-zinc-500">{new Date(session.date).toLocaleString()} • {session.entries.length} exercises</p>
          </Link>
        ))}
        {sessions.length === 0 && <p className="rounded-xl border border-border bg-card p-4">No sessions yet.</p>}
      </div>
    </div>
  );
}
