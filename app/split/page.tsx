export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { saveSplit } from '@/lib/actions';
import { MUSCLE_GROUPS, WEEK_DAYS } from '@/lib/constants';
import { prisma } from '@/lib/prisma';

export default async function SplitPage() {
  const user = await prisma.userProfile.findFirst();
  const splits = user ? await prisma.weeklySplit.findMany({ where: { userId: user.id } }) : [];
  const splitMap = new Map(splits.map((s) => [s.weekday, s.muscleGroup]));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Weekly Split Setup</h2>
      {!user ? <p>Please complete onboarding first.</p> : (
        <form action={saveSplit} className="space-y-3 rounded-xl border border-border bg-card p-4">
          {WEEK_DAYS.map((day, i) => (
            <label key={day} className="grid grid-cols-2 items-center gap-3">
              <span>{day}</span>
              <select className="rounded border border-border bg-transparent p-2" name={`day-${i}`} defaultValue={splitMap.get(i) ?? 'rest'}>
                {MUSCLE_GROUPS.map((group) => <option key={group} value={group}>{group}</option>)}
              </select>
            </label>
          ))}
          <button className="rounded bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900">Save Split</button>
        </form>
      )}
    </div>
  );
}
