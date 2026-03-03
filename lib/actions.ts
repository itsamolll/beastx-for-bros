'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { calculateBMI } from './health';
import { prisma } from './prisma';
import { MUSCLE_GROUPS } from './constants';

const onboardingSchema = z.object({
  age: z.coerce.number().int().min(13).max(100),
  heightCm: z.coerce.number().min(100).max(250),
  weightKg: z.coerce.number().min(30).max(300),
  goal: z.enum(['fat_loss', 'muscle_gain', 'strength', 'maintenance'])
});

export async function saveOnboarding(formData: FormData) {
  const parsed = onboardingSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? 'Invalid onboarding data');
  }

  const { age, heightCm, weightKg, goal } = parsed.data;
  const bmi = calculateBMI(weightKg, heightCm);

  const existing = await prisma.userProfile.findFirst({ orderBy: { id: 'asc' } });
  if (existing) {
    await prisma.userProfile.update({ where: { id: existing.id }, data: { age, heightCm, weightKg, goal, bmi } });
  } else {
    await prisma.userProfile.create({ data: { age, heightCm, weightKg, goal, bmi } });
  }

  revalidatePath('/');
  redirect('/split');
}

export async function saveSplit(formData: FormData) {
  const user = await prisma.userProfile.findFirst();
  if (!user) throw new Error('Complete onboarding first.');

  const records = Array.from({ length: 7 }, (_, i) => ({
    weekday: i,
    muscleGroup: String(formData.get(`day-${i}`) || 'rest')
  }));

  for (const record of records) {
    if (!MUSCLE_GROUPS.includes(record.muscleGroup as (typeof MUSCLE_GROUPS)[number])) {
      throw new Error('Invalid muscle group.');
    }
  }

  await prisma.weeklySplit.deleteMany({ where: { userId: user.id } });
  await prisma.weeklySplit.createMany({ data: records.map((r) => ({ ...r, userId: user.id })) });

  revalidatePath('/');
  redirect('/');
}

export async function createSession(formData: FormData) {
  const user = await prisma.userProfile.findFirst();
  if (!user) throw new Error('Complete onboarding first.');

  const notes = String(formData.get('sessionNotes') || '');
  const raw = JSON.parse(String(formData.get('entries') || '[]')) as Array<{exerciseId:number;sets:number;reps:number;weightKg:number;notes?:string}>;

  if (!Array.isArray(raw) || raw.length === 0) throw new Error('Add at least one exercise entry.');

  const entrySchema = z.object({
    exerciseId: z.number().int().positive(),
    sets: z.number().int().min(1).max(20),
    reps: z.number().int().min(1).max(100),
    weightKg: z.number().min(0).max(1000),
    notes: z.string().max(250).optional()
  });

  const entries = raw.map((entry) => entrySchema.parse(entry));

  const session = await prisma.workoutSession.create({
    data: {
      userId: user.id,
      notes,
      entries: {
        create: entries
      }
    }
  });

  revalidatePath('/');
  revalidatePath('/history');
  revalidatePath('/progress');
  redirect(`/history/${session.id}`);
}
