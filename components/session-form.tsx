'use client';

import { createSession } from '@/lib/actions';
import { useState } from 'react';

type Exercise = { id: number; name: string };

export function SessionForm({ exercises }: { exercises: Exercise[] }) {
  const [rows, setRows] = useState([{ exerciseId: exercises[0]?.id ?? 0, sets: 4, reps: 10, weightKg: 0, notes: '' }]);

  return (
    <form action={createSession} className="space-y-4 rounded-xl border border-border bg-card p-4">
      <h3 className="font-semibold">Start Session</h3>
      {rows.map((row, idx) => (
        <div key={idx} className="grid gap-2 rounded border border-border p-3 md:grid-cols-5">
          <select value={row.exerciseId} onChange={(e) => {
            const copy = [...rows];
            copy[idx].exerciseId = Number(e.target.value);
            setRows(copy);
          }} className="rounded border border-border bg-transparent p-2">
            {exercises.map((ex) => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
          </select>
          <input type="number" className="rounded border border-border bg-transparent p-2" value={row.sets} onChange={(e) => {
            const copy = [...rows]; copy[idx].sets = Number(e.target.value); setRows(copy);
          }} placeholder="Sets" />
          <input type="number" className="rounded border border-border bg-transparent p-2" value={row.reps} onChange={(e) => {
            const copy = [...rows]; copy[idx].reps = Number(e.target.value); setRows(copy);
          }} placeholder="Reps" />
          <input type="number" step="0.5" className="rounded border border-border bg-transparent p-2" value={row.weightKg} onChange={(e) => {
            const copy = [...rows]; copy[idx].weightKg = Number(e.target.value); setRows(copy);
          }} placeholder="Weight Kg" />
          <input className="rounded border border-border bg-transparent p-2" value={row.notes} onChange={(e) => {
            const copy = [...rows]; copy[idx].notes = e.target.value; setRows(copy);
          }} placeholder="Notes" />
        </div>
      ))}
      <button type="button" onClick={() => setRows([...rows, { exerciseId: exercises[0]?.id ?? 0, sets: 4, reps: 10, weightKg: 0, notes: '' }])} className="rounded border border-border px-3 py-2">+ Add Exercise</button>
      <textarea name="sessionNotes" className="block w-full rounded border border-border bg-transparent p-2" placeholder="Session notes" />
      <input type="hidden" name="entries" value={JSON.stringify(rows)} readOnly />
      <button className="rounded bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900">Save Session</button>
    </form>
  );
}
