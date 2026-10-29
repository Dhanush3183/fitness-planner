/**
 * Comprehensive Biometric Body Analysis Engine
 * Uses validated physiological formulas: Mifflin-St Jeor, Deurenberg, TDEE Multipliers.
 */

export function calculateBodyAnalysis(profile) {
  const age = Number(profile.age) || 26;
  const gender = profile.gender || "male"; // 'male' | 'female'
  const heightCm = Number(profile.height) || 175;
  const weightKg = Number(profile.weight) || 72;
  const targetWeightKg = Number(profile.targetWeight) || 70;
  const activityLevel = profile.activityLevel || "moderate";
  const goal = profile.goal || "fat_loss"; // 'fat_loss' | 'lean_bulk' | 'recomp' | 'strength'

  // Height in meters
  const heightM = heightCm / 100;

  // 1. BMI Calculation
  const bmiRaw = weightKg / (heightM * heightM);
  const bmi = Math.round(bmiRaw * 10) / 10;

  let bmiCategory = "Normal Weight";
  let bmiColor = "text-emerald-400";
  let bmiBadgeBg = "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";

  if (bmi < 18.5) {
    bmiCategory = "Underweight";
    bmiColor = "text-amber-400";
    bmiBadgeBg = "bg-amber-500/10 border-amber-500/30 text-amber-300";
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiCategory = "Optimal Health Range";
    bmiColor = "text-emerald-400";
    bmiBadgeBg = "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = "Overweight (High Muscle or Adipose)";
    bmiColor = "text-amber-400";
    bmiBadgeBg = "bg-amber-500/10 border-amber-500/30 text-amber-300";
  } else {
    bmiCategory = "Obesity Range";
    bmiColor = "text-rose-400";
    bmiBadgeBg = "bg-rose-500/10 border-rose-500/30 text-rose-300";
  }

  // Healthy weight range (BMI 19 to 24.5)
  const minHealthyWeight = Math.round(19 * heightM * heightM);
  const maxHealthyWeight = Math.round(24.5 * heightM * heightM);

  // 2. Basal Metabolic Rate (Mifflin-St Jeor)
  let bmrRaw = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === "male") {
    bmrRaw += 5;
  } else {
    bmrRaw -= 161;
  }
  const bmr = Math.round(bmrRaw);

  // 3. TDEE Activity Multipliers
  const activityMultipliers = {
    sedentary: 1.2, // Desk job, little exercise
    light: 1.375, // 1-3 days light exercise
    moderate: 1.55, // 3-5 days moderate exercise
    very_active: 1.725, // 6-7 days heavy lifting
    athlete: 1.9, // 2x daily or physical job + gym
  };

  const multiplier = activityMultipliers[activityLevel] || 1.55;
  const tdee = Math.round(bmr * multiplier);

  // 4. Target Calories based on Goal
  let targetCalories = tdee;
  let calorieAdjustmentDesc = "Maintenance / Recomposition";
  let weeklyPace = "0.0 kg/week (Recomposition)";

  if (goal === "fat_loss") {
    targetCalories = Math.round(tdee - 450);
    calorieAdjustmentDesc = "Controlled 450 kcal Fat Burning Deficit";
    weeklyPace = "-0.45 kg / week (Preserves Lean Muscle)";
  } else if (goal === "aggressive_cut") {
    targetCalories = Math.round(tdee - 650);
    calorieAdjustmentDesc = "Aggressive 650 kcal Cutting Deficit";
    weeklyPace = "-0.65 kg / week (Rapid Fat Loss)";
  } else if (goal === "lean_bulk") {
    targetCalories = Math.round(tdee + 300);
    calorieAdjustmentDesc = "Clean Anabolic 300 kcal Hypertrophy Surplus";
    weeklyPace = "+0.25 to +0.35 kg / month (Pure Muscle)";
  } else if (goal === "strength") {
    targetCalories = Math.round(tdee + 150);
    calorieAdjustmentDesc = "Slight 150 kcal Surplus for Neurological Force";
    weeklyPace = "+0.15 kg / week";
  }

  // Never drop below essential BMR safety threshold
  if (targetCalories < bmr) {
    targetCalories = bmr;
  }

  // 5. Precision Macronutrient Split
  // Protein: 2.1g per kg bodyweight
  const proteinGrams = Math.round(weightKg * 2.1);
  const proteinCalories = proteinGrams * 4;

  // Fat: 27% of target calories
  const fatCalories = Math.round(targetCalories * 0.27);
  const fatGrams = Math.round(fatCalories / 9);

  // Carbs: Remaining calories
  const carbCalories = Math.max(0, targetCalories - (proteinCalories + fatCalories));
  const carbGrams = Math.round(carbCalories / 4);

  // Macro percentages
  const proteinPct = Math.round((proteinCalories / targetCalories) * 100);
  const fatPct = Math.round((fatCalories / targetCalories) * 100);
  const carbPct = Math.max(0, 100 - (proteinPct + fatPct));

  // 6. Estimated Body Fat % (Deurenberg Adult Formula)
  const genderBinary = gender === "male" ? 1 : 0;
  let estimatedBodyFat = Math.round(
    1.2 * bmi + 0.23 * age - 10.8 * genderBinary - 5.4
  );
  if (estimatedBodyFat < 6) estimatedBodyFat = 6;
  if (estimatedBodyFat > 48) estimatedBodyFat = 48;

  // 7. Water Hydration Target
  const waterLiters = (weightKg * 0.04 + 0.6).toFixed(1);

  // 8. Lean Body Mass estimate (Boer Formula approx)
  let leanMassKg = 0;
  if (gender === "male") {
    leanMassKg = Math.round(0.407 * weightKg + 0.267 * heightCm - 19.2);
  } else {
    leanMassKg = Math.round(0.252 * weightKg + 0.473 * heightCm - 48.3);
  }
  if (leanMassKg <= 0 || leanMassKg > weightKg) {
    leanMassKg = Math.round(weightKg * (1 - estimatedBodyFat / 100));
  }
  const fatMassKg = Math.max(0, weightKg - leanMassKg);

  return {
    bmi,
    bmiCategory,
    bmiColor,
    bmiBadgeBg,
    idealWeightRange: `${minHealthyWeight} - ${maxHealthyWeight} kg`,
    bmr,
    tdee,
    targetCalories,
    calorieAdjustmentDesc,
    weeklyPace,
    estimatedBodyFat,
    leanMassKg,
    fatMassKg,
    waterLiters,
    macros: {
      protein: { grams: proteinGrams, kcal: proteinCalories, pct: proteinPct },
      carbs: { grams: carbGrams, kcal: carbCalories, pct: carbPct },
      fats: { grams: fatGrams, kcal: fatCalories, pct: fatPct },
    },
    weightDifference: Math.round((weightKg - targetWeightKg) * 10) / 10,
  };
}
