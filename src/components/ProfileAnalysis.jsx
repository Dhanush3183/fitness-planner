import React, { useState, useEffect } from "react";
import {
  User,
  Activity,
  Flame,
  Scale,
  Heart,
  Droplet,
  Printer,
  Sparkles,
  Zap,
  CheckCircle,
  HelpCircle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { calculateBodyAnalysis } from "../utils/bodyAnalyzer";

export default function ProfileAnalysis({ onGoToDiet, onGoToPlan }) {
  // Load saved profile or defaults
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("aurapulse_user_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: "Alex Hunter",
      gender: "male",
      age: 26,
      height: 178,
      weight: 76,
      targetWeight: 72,
      activityLevel: "moderate",
      goal: "fat_loss",
    };
  });

  const [savedNotice, setSavedNotice] = useState(false);

  // Calculate body analysis metrics
  const analysis = calculateBodyAnalysis(profile);

  // Save changes to localStorage
  const handleInputChange = (field, value) => {
    const updated = { ...profile, [field]: value };
    setProfile(updated);
    try {
      localStorage.setItem("aurapulse_user_profile", JSON.stringify(updated));
    } catch (e) {}

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="text-center sm:text-left space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5" />
          <span>Biometric Diagnostics</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
          Precision <span className="text-gradient-cyan">Body Analysis</span> &
          Metabolic Profile
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
          Enter your current physiological metrics below. Our engine computes
          your Mifflin-St Jeor metabolic baseline, TDEE caloric target, and
          macronutrient architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form (4 or 5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-brand-400" />
              <span>Biometric Parameters</span>
            </h2>
            {savedNotice && (
              <span className="text-xs text-brand-400 font-bold animate-pulse">
                Auto-saved
              </span>
            )}
          </div>

          <div className="space-y-4 text-xs">
            {/* Full Name */}
            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                Full Name / Nickname
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-medium focus:outline-none focus:border-brand-500 transition-all"
                placeholder="Your Name"
              />
            </div>

            {/* Biological Sex */}
            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                Biological Sex (For Hormone & BMR Equation)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleInputChange("gender", "male")}
                  className={`py-2.5 rounded-xl font-bold transition-all ${
                    profile.gender === "male"
                      ? "bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20"
                      : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  Male (+5 kcal)
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange("gender", "female")}
                  className={`py-2.5 rounded-xl font-bold transition-all ${
                    profile.gender === "female"
                      ? "bg-brand-500 text-slate-950 shadow-md shadow-brand-500/20"
                      : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  Female (-161 kcal)
                </button>
              </div>
            </div>

            {/* Age & Height */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                  Age (Years)
                </label>
                <input
                  type="number"
                  min="14"
                  max="95"
                  value={profile.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-medium focus:outline-none focus:border-brand-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="120"
                  max="240"
                  value={profile.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-medium focus:outline-none focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            {/* Current Weight & Target Weight */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  min="35"
                  max="250"
                  step="0.5"
                  value={profile.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-medium focus:outline-none focus:border-brand-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                  Target Goal Weight (kg)
                </label>
                <input
                  type="number"
                  min="35"
                  max="250"
                  step="0.5"
                  value={profile.targetWeight}
                  onChange={(e) =>
                    handleInputChange("targetWeight", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-medium focus:outline-none focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            {/* Daily Activity Level */}
            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                Physical Activity Multiplier
              </label>
              <select
                value={profile.activityLevel}
                onChange={(e) =>
                  handleInputChange("activityLevel", e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl bg-[#0e131b] border border-white/10 text-white font-medium focus:outline-none focus:border-brand-500 transition-all"
              >
                <option value="sedentary">Sedentary (Desk job, rare lifting)</option>
                <option value="light">Lightly Active (1-3 gym sessions/wk)</option>
                <option value="moderate">Moderately Active (3-5 sessions/wk)</option>
                <option value="very_active">Very Active (6-7 intense sessions/wk)</option>
                <option value="athlete">Athlete / Extreme physical demand</option>
              </select>
            </div>

            {/* Primary Strategy Goal */}
            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                Metabolic Strategy Goal
              </label>
              <select
                value={profile.goal}
                onChange={(e) => handleInputChange("goal", e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0e131b] border border-white/10 text-white font-medium focus:outline-none focus:border-brand-500 transition-all"
              >
                <option value="fat_loss">Controlled Fat Loss (-450 kcal)</option>
                <option value="aggressive_cut">Aggressive Rapid Cut (-650 kcal)</option>
                <option value="recomp">Body Recomposition (Maintenance)</option>
                <option value="lean_bulk">Clean Hypertrophy Bulk (+300 kcal)</option>
                <option value="strength">Strength & Neurological Power (+150 kcal)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Generated Body Analysis Report (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Analytics Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

            {/* Header with Print */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Biometric Diagnostics for {profile.name}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white mt-1">
                  Metabolic Analysis Report
                </h3>
              </div>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-slate-200 border border-white/10 transition-all self-start sm:self-auto"
              >
                <Printer className="w-4 h-4 text-brand-400" />
                <span>Export Report</span>
              </button>
            </div>

            {/* Top 4 Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* BMI */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                  <span>BMI</span>
                  <Scale className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-2xl font-black text-white">{analysis.bmi}</div>
                <div className={`text-[11px] font-bold ${analysis.bmiColor} truncate`}>
                  {analysis.bmiCategory}
                </div>
              </div>

              {/* BMR */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                  <span>BMR Baseline</span>
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-2xl font-black text-amber-300">
                  {analysis.bmr}
                </div>
                <div className="text-[11px] text-slate-400">kcal at complete rest</div>
              </div>

              {/* TDEE */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                  <span>TDEE Burn</span>
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-cyan-300">
                  {analysis.tdee}
                </div>
                <div className="text-[11px] text-slate-400">kcal daily expenditure</div>
              </div>

              {/* Target Calories */}
              <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/30 space-y-1">
                <div className="text-[10px] uppercase font-bold text-brand-300 flex items-center justify-between">
                  <span>Daily Calorie Target</span>
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                </div>
                <div className="text-2xl font-black text-brand-400">
                  {analysis.targetCalories}
                </div>
                <div className="text-[11px] text-brand-300 font-semibold truncate">
                  {analysis.calorieAdjustmentDesc}
                </div>
              </div>
            </div>

            {/* Target Macronutrient Precision Distribution */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Target Daily Macronutrient Architecture
                </h4>
                <span className="text-xs text-brand-400 font-semibold">
                  2.1g Protein / kg
                </span>
              </div>

              {/* Visual Multi-Segment Bar */}
              <div className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-white/[0.05]">
                <div
                  className="bg-brand-500 h-full rounded-l-full"
                  style={{ width: `${analysis.macros.protein.pct}%` }}
                  title={`Protein: ${analysis.macros.protein.grams}g (${analysis.macros.protein.pct}%)`}
                />
                <div
                  className="bg-cyan-500 h-full"
                  style={{ width: `${analysis.macros.carbs.pct}%` }}
                  title={`Carbs: ${analysis.macros.carbs.grams}g (${analysis.macros.carbs.pct}%)`}
                />
                <div
                  className="bg-amber-500 h-full rounded-r-full"
                  style={{ width: `${analysis.macros.fats.pct}%` }}
                  title={`Fats: ${analysis.macros.fats.grams}g (${analysis.macros.fats.pct}%)`}
                />
              </div>

              {/* Macro Details Trio */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20">
                  <div className="text-[10px] font-bold uppercase text-brand-300">
                    Protein ({analysis.macros.protein.pct}%)
                  </div>
                  <div className="text-xl font-black text-white">
                    {analysis.macros.protein.grams}g
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {analysis.macros.protein.kcal} kcal
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <div className="text-[10px] font-bold uppercase text-cyan-300">
                    Carbohydrates ({analysis.macros.carbs.pct}%)
                  </div>
                  <div className="text-xl font-black text-white">
                    {analysis.macros.carbs.grams}g
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {analysis.macros.carbs.kcal} kcal
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="text-[10px] font-bold uppercase text-amber-300">
                    Healthy Fats ({analysis.macros.fats.pct}%)
                  </div>
                  <div className="text-xl font-black text-white">
                    {analysis.macros.fats.grams}g
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {analysis.macros.fats.kcal} kcal
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Body Metrics (Body Fat %, Lean Mass, Water, Healthy Range) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] text-slate-400 font-bold uppercase">
                  Est. Body Fat
                </div>
                <div className="text-base font-extrabold text-white">
                  ~{analysis.estimatedBodyFat}%
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] text-slate-400 font-bold uppercase">
                  Lean Mass Est.
                </div>
                <div className="text-base font-extrabold text-white">
                  {analysis.leanMassKg} kg
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] text-slate-400 font-bold uppercase">
                  Water Target
                </div>
                <div className="text-base font-extrabold text-cyan-400 flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5" />
                  <span>{analysis.waterLiters} L / day</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] text-slate-400 font-bold uppercase">
                  Ideal Weight
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {analysis.idealWeightRange}
                </div>
              </div>
            </div>

            {/* Actionable Health Coaching Directive */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-950/40 via-cyan-950/30 to-transparent border border-brand-500/20 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-brand-400" />
                <span>Weekly Trajectory: {analysis.weeklyPace}</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-normal">
                To achieve your target of {profile.targetWeight} kg, adhere to {analysis.targetCalories} kcal daily while maintaining your daily {analysis.macros.protein.grams}g protein target. Track weekly moving averages every Sunday morning before breakfast.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
