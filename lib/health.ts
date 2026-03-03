export const calculateBMI = (weightKg: number, heightCm: number) => {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
};

export const bmiCategory = (bmi: number) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};
