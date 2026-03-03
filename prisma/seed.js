const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const exercises = [
  ['Barbell Bench Press', 'chest'], ['Dumbbell Bench Press', 'chest'], ['Push-Ups', 'chest'], ['Incline Dumbbell Press', 'chest'], ['Cable Fly', 'chest'],
  ['Pull-Up', 'back'], ['Lat Pulldown', 'back'], ['Barbell Row', 'back'], ['Seated Cable Row', 'back'], ['Face Pull', 'back'],
  ['Back Squat', 'legs'], ['Front Squat', 'legs'], ['Romanian Deadlift', 'legs'], ['Leg Press', 'legs'], ['Walking Lunges', 'legs'],
  ['Overhead Press', 'shoulders'], ['Dumbbell Shoulder Press', 'shoulders'], ['Lateral Raise', 'shoulders'], ['Rear Delt Fly', 'shoulders'], ['Arnold Press', 'shoulders'],
  ['Barbell Curl', 'arms'], ['Hammer Curl', 'arms'], ['Triceps Pushdown', 'arms'], ['Skull Crusher', 'arms'], ['Close-Grip Push-Up', 'arms'],
  ['Burpee', 'full_body'], ['Kettlebell Swing', 'full_body'], ['Thruster', 'full_body'], ['Mountain Climbers', 'full_body'], ['Deadlift', 'full_body']
];

const alternatives = [
  ['Barbell Bench Press', 'Dumbbell Bench Press'],
  ['Dumbbell Bench Press', 'Push-Ups'],
  ['Pull-Up', 'Lat Pulldown'],
  ['Back Squat', 'Leg Press'],
  ['Overhead Press', 'Dumbbell Shoulder Press'],
  ['Barbell Curl', 'Hammer Curl'],
  ['Triceps Pushdown', 'Skull Crusher'],
  ['Deadlift', 'Kettlebell Swing']
];

async function main() {
  await prisma.exerciseAlternative.deleteMany();
  await prisma.workoutExerciseEntry.deleteMany();
  await prisma.workoutSession.deleteMany();
  await prisma.weeklySplit.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.exerciseLibrary.deleteMany();

  for (const [name, muscleGroup] of exercises) {
    await prisma.exerciseLibrary.create({
      data: {
        name,
        muscleGroup,
        gifUrl: `https://placehold.co/600x400/gif?text=${encodeURIComponent(name)}`,
        suggestedSets: 4,
        suggestedReps: muscleGroup === 'full_body' ? '10-15' : '8-12'
      }
    });
  }

  for (const [exercise, alt] of alternatives) {
    const exerciseRecord = await prisma.exerciseLibrary.findUnique({ where: { name: exercise } });
    const altRecord = await prisma.exerciseLibrary.findUnique({ where: { name: alt } });
    if (exerciseRecord && altRecord) {
      await prisma.exerciseAlternative.create({
        data: { exerciseId: exerciseRecord.id, alternativeId: altRecord.id }
      });
    }
  }
}

main().finally(() => prisma.$disconnect());
