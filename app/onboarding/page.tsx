export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { saveOnboarding } from '@/lib/actions';
import { bmiCategory, calculateBMI } from '@/lib/health';
import { prisma } from '@/lib/prisma';

export default async function OnboardingPage() {
  const profile = await prisma.userProfile.findFirst();
  const bmi = profile ? calculateBMI(profile.weightKg, profile.heightCm) : null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Onboarding</h2>
      <form action={saveOnboarding} className="grid gap-4 rounded-xl border border-border bg-card p-4 md:grid-cols-2">
        <label className="grid gap-1">Age<input className="rounded border border-border bg-transparent p-2" type="number" name="age" defaultValue={profile?.age} required /></label>
        <label className="grid gap-1">Height (cm)<input className="rounded border border-border bg-transparent p-2" type="number" step="0.1" name="heightCm" defaultValue={profile?.heightCm} required /></label>
        <label className="grid gap-1">Weight (kg)<input className="rounded border border-border bg-transparent p-2" type="number" step="0.1" name="weightKg" defaultValue={profile?.weightKg} required /></label>
        <label className="grid gap-1">Goal
          <select className="rounded border border-border bg-transparent p-2" name="goal" defaultValue={profile?.goal ?? 'maintenance'}>
            <option value="fat_loss">Fat Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="strength">Strength</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </label>
        <button className="rounded bg-zinc-900 p-2 text-white dark:bg-zinc-100 dark:text-zinc-900 md:col-span-2">Save Profile</button>
      </form>

      {bmi && (
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm">Current BMI: <strong>{bmi.toFixed(1)}</strong> ({bmiCategory(bmi)})</p>
        </div>
      )}
    </div>
  );
}
