import React, { useState, useEffect } from "react";
import {
  Calendar,
  Flame,
  CheckCircle2,
  Clock,
  Dumbbell,
  ArrowRight,
  RotateCcw,
  Printer,
  Sparkles,
  Info,
  Layers,
  Award,
  Crown,
} from "lucide-react";

export default function WeeklyPlan({ plan, onRetakeQuiz, onOpenPro, isPro }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(() => {
    try {
      const saved = localStorage.getItem("aurapulse_completed_exercises");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [viewMode, setViewMode] = useState("single"); // 'single' | 'all'

  // Persist completed exercise checkboxes to localStorage
  const toggleExercise = (dayIdx, exIdx) => {
    const key = `${dayIdx}_${exIdx}`;
    setCompletedExercises((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(
          "aurapulse_completed_exercises",
          JSON.stringify(updated)
        );
      } catch (e) {}
      return updated;
    });
  };

  const currentDay = plan?.days?.[selectedDayIndex] || plan?.days?.[0];

  // Calculate day completion progress
  const getDayProgress = (dayIdx) => {
    const day = plan?.days?.[dayIdx];
    if (!day || !day.exercises || day.exercises.length === 0) return 0;
    const completedCount = day.exercises.filter(
      (_, exIdx) => completedExercises[`${dayIdx}_${exIdx}`]
    ).length;
    return Math.round((completedCount / day.exercises.length) * 100);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!plan || !plan.days) {
    return (
      <div className="py-32 text-center text-slate-400">
        <p>No plan generated yet. Please take the 7-step questionnaire.</p>
        <button
          onClick={onRetakeQuiz}
          className="mt-4 px-6 py-2.5 rounded-xl bg-brand-500 text-black font-bold"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Plan Header Card */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl mb-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored 7-Day Architecture</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              {plan.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              {plan.summary}
            </p>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  Target Burn
                </div>
                <div className="text-base font-extrabold text-brand-400 flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  <span>{plan.metrics.weeklyCalBurn}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  Session Intensity
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-cyan-300">
                  {plan.metrics.intensity}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  Repetition Protocol
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-amber-300">
                  {plan.metrics.repScheme}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  Rest Between Sets
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-purple-300">
                  {plan.metrics.restPeriod}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass-panel hover:bg-white/[0.08] text-white text-xs font-bold border border-white/10 transition-all"
            >
              <Printer className="w-4 h-4 text-brand-400" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onRetakeQuiz}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass-panel hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-bold border border-white/10 transition-all"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              <span>Retake 7 Questions</span>
            </button>

            {!isPro && (
              <button
                onClick={onOpenPro}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-black shadow-lg shadow-orange-500/20 hover:scale-105 transition-all"
              >
                <Crown className="w-4 h-4" />
                <span>Unlock Pro AI Coach (₹99)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Week Day Selector Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {plan.days.map((day, idx) => {
          const isSelected = selectedDayIndex === idx && viewMode === "single";
          const progress = getDayProgress(idx);
          const isRest = day.type === "Rest" || day.type === "Active Recovery";

          return (
            <button
              key={idx}
              onClick={() => {
                setSelectedDayIndex(idx);
                setViewMode("single");
              }}
              className={`flex-1 min-w-[130px] p-3.5 rounded-2xl transition-all duration-300 border text-left relative ${
                isSelected
                  ? "bg-gradient-to-b from-[#16222f] to-[#0d141d] border-brand-400 shadow-xl shadow-brand-500/20 scale-[1.02]"
                  : "glass-panel-card hover:border-slate-600"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-xs font-bold ${
                    isSelected ? "text-brand-300" : "text-slate-300"
                  }`}
                >
                  {day.dayName}
                </span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    day.type === "Training"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-cyan-500/20 text-cyan-400"
                  }`}
                >
                  {day.type === "Training" ? "WORKOUT" : "REST"}
                </span>
              </div>

              <div className="text-[11px] text-slate-400 font-medium truncate mb-2">
                {day.tag}
              </div>

              {/* Progress mini bar */}
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-400 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </button>
          );
        })}

        {/* View Toggle */}
        <button
          onClick={() => setViewMode(viewMode === "single" ? "all" : "single")}
          className={`shrink-0 px-4 py-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 ${
            viewMode === "all"
              ? "bg-brand-500 text-slate-950 border-brand-400 shadow-lg shadow-brand-500/20"
              : "glass-panel text-slate-300 hover:text-white border-white/10"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{viewMode === "all" ? "Day View" : "Full 7-Day Matrix"}</span>
        </button>
      </div>

      {/* Main Day Display (Single Mode or All Mode) */}
      {viewMode === "single" ? (
        <DayDetailCard
          day={currentDay}
          dayIndex={selectedDayIndex}
          completedExercises={completedExercises}
          onToggleExercise={toggleExercise}
          onOpenPro={onOpenPro}
          isPro={isPro}
        />
      ) : (
        <div className="space-y-8">
          {plan.days.map((day, idx) => (
            <DayDetailCard
              key={idx}
              day={day}
              dayIndex={idx}
              completedExercises={completedExercises}
              onToggleExercise={toggleExercise}
              onOpenPro={onOpenPro}
              isPro={isPro}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Subcomponent for Day Details
function DayDetailCard({
  day,
  dayIndex,
  completedExercises,
  onToggleExercise,
  onOpenPro,
  isPro,
}) {
  const isTraining = day.type === "Training";
  const completedCount = day.exercises.filter(
    (_, exIdx) => completedExercises[`${dayIndex}_${exIdx}`]
  ).length;
  const progressPercent =
    day.exercises.length > 0
      ? Math.round((completedCount / day.exercises.length) * 100)
      : 0;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
      {/* Day Title and Focus Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-brand-400 uppercase tracking-widest mb-1">
            <span>{day.dayName}</span>
            <span>•</span>
            <span>{day.type}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
            {day.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Target Focus:{" "}
            <span className="text-brand-300 font-semibold">{day.focus}</span>
          </p>
        </div>

        {/* Progress & Duration stats */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase">
              Duration / Burn
            </div>
            <div className="text-sm font-extrabold text-white flex items-center justify-end gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{day.duration}</span>
              <span>•</span>
              <span className="text-brand-400">{day.estCalories} kcal</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-right min-w-[90px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">
              Completion
            </div>
            <div className="text-sm font-extrabold text-brand-300">
              {progressPercent}%
            </div>
          </div>
        </div>
      </div>

      {/* Warmup Routine Section */}
      {day.warmup && day.warmup.length > 0 && (
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Dynamic Warmup & Joint Preparation (5-8 Mins)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {day.warmup.map((warmupItem, wIdx) => (
              <div
                key={wIdx}
                className="text-xs text-slate-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.03]"
              >
                {warmupItem}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exercises List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
          <span>
            {isTraining ? "Prescribed Workouts & Exercises" : "Recovery Protocols"}
          </span>
          <span>Click checkmark when completed</span>
        </div>

        <div className="space-y-3">
          {day.exercises.map((exercise, exIdx) => {
            const isCompleted =
              completedExercises[`${dayIndex}_${exIdx}`] || false;

            return (
              <div
                key={exIdx}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                  isCompleted
                    ? "bg-brand-950/40 border-brand-500/30 opacity-75"
                    : "glass-panel-card hover:border-slate-500"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Exercise details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-white/[0.06] text-[11px] font-bold text-brand-400 flex items-center justify-center">
                        #{exIdx + 1}
                      </span>
                      <h4
                        className={`text-base font-bold transition-all ${
                          isCompleted
                            ? "line-through text-slate-400"
                            : "text-white"
                        }`}
                      >
                        {exercise.name}
                      </h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.05] text-cyan-300 border border-white/[0.05]">
                        {exercise.muscle}
                      </span>
                    </div>

                    {/* Prescription: Reps, Sets & Rest */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5 font-bold text-brand-300 bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20">
                        <Dumbbell className="w-3.5 h-3.5" />
                        <span>{exercise.reps}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-400 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/[0.05]">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Rest: {exercise.rest}</span>
                      </div>
                    </div>

                    {/* Pro Coaching Cue */}
                    {exercise.cue && (
                      <p className="text-xs text-slate-400 leading-relaxed font-normal bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.03]">
                        <strong className="text-slate-300 font-semibold">
                          Form Cue:{" "}
                        </strong>
                        {exercise.cue}
                      </p>
                    )}
                  </div>

                  {/* Right: Checkbox complete toggle */}
                  <button
                    onClick={() => onToggleExercise(dayIndex, exIdx)}
                    className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isCompleted
                        ? "bg-brand-500 text-slate-950 shadow-md shadow-brand-500/30"
                        : "bg-white/[0.05] text-slate-500 hover:text-white border border-white/10 hover:border-brand-400"
                    }`}
                    title={
                      isCompleted ? "Mark as Incomplete" : "Mark as Completed"
                    }
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cooldown Section */}
      {day.cooldown && (
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-xs text-slate-300 flex items-center gap-3">
          <Award className="w-4 h-4 text-brand-400 shrink-0" />
          <div>
            <strong className="text-white font-semibold">
              Post-Workout Cool Down:{" "}
            </strong>
            {day.cooldown}
          </div>
        </div>
      )}
    </div>
  );
}
