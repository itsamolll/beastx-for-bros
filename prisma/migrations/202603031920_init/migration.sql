

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,
    "heightCm" DOUBLE PRECISION NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "goal" TEXT NOT NULL,
    "bmi" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklySplit" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "weekday" INTEGER NOT NULL,
    "muscleGroup" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeeklySplit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseLibrary" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "muscleGroup" TEXT NOT NULL,
    "gifUrl" TEXT NOT NULL,
    "suggestedSets" INTEGER NOT NULL,
    "suggestedReps" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExerciseLibrary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseAlternative" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "alternativeId" INTEGER NOT NULL,

    CONSTRAINT "ExerciseAlternative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSession" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExerciseEntry" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkoutExerciseEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeeklySplit_userId_weekday_key" ON "WeeklySplit"("userId", "weekday");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseLibrary_name_key" ON "ExerciseLibrary"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseAlternative_exerciseId_alternativeId_key" ON "ExerciseAlternative"("exerciseId", "alternativeId");

-- AddForeignKey
ALTER TABLE "WeeklySplit" ADD CONSTRAINT "WeeklySplit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseAlternative" ADD CONSTRAINT "ExerciseAlternative_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "ExerciseLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseAlternative" ADD CONSTRAINT "ExerciseAlternative_alternativeId_fkey" FOREIGN KEY ("alternativeId") REFERENCES "ExerciseLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSession" ADD CONSTRAINT "WorkoutSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseEntry" ADD CONSTRAINT "WorkoutExerciseEntry_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "WorkoutSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseEntry" ADD CONSTRAINT "WorkoutExerciseEntry_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "ExerciseLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
