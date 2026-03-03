export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import Image from 'next/image';
import { SessionForm } from '@/components/session-form';
import { WEEK_DAYS } from '@/lib/constants';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const user = await prisma.userProfile.findFirst();

  if (!user) {
    return <p className="rounded-xl border border-border bg-card p-4">Welcome to Beast X. Start with <a className="underline" href="/onboarding">Onboarding</a>.</p>;
  }

  const jsDay = new Date().getDay();
  const weekday = (jsDay + 6) % 7;
  const split = await prisma.weeklySplit.findUnique({ where: { userId_weekday: { userId: user.id, weekday } } });
  const group = split?.muscleGroup ?? 'rest';

  const exercises = group === 'rest' ? [] : await prisma.exerciseLibrary.findMany({
    where: { muscleGroup: group },
    include: { alternativesTo: { include: { alternative: true } } },
    take: 7
  });

  const allExercises = await prisma.exerciseLibrary.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } });

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm text-zinc-500">Today is {WEEK_DAYS[weekday]}</p>
        <h2 className="text-2xl font-bold capitalize">{group.replace('_', ' ')}</h2>
      </div>

      {exercises.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6 text-center">No exercises found for today. Enjoy rest or update your split.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="rounded-xl border border-border bg-card p-4">
              <div className="relative mb-2 aspect-video overflow-hidden rounded">
                <Image src={exercise.gifUrl} alt={exercise.name} fill className="object-cover" />
              </div>
              <h3 className="font-semibold">{exercise.name}</h3>
              <p className="text-sm text-zinc-500">{exercise.suggestedSets} sets • {exercise.suggestedReps} reps</p>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer">Alternatives</summary>
                <ul className="list-disc pl-5">
                  {exercise.alternativesTo.length === 0 ? <li>No alternatives</li> : exercise.alternativesTo.map((a) => <li key={a.id}>{a.alternative.name}</li>)}
                </ul>
              </details>
            </div>
          ))}
        </div>
      )}

      <SessionForm exercises={allExercises} />
    </div>
  );
}
