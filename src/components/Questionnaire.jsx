import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Flame,
  Dumbbell,
  Zap,
  Trophy,
  HeartPulse,
  ShieldAlert,
  TrendingUp,
  Award,
  Crown,
  Building2,
  Home,
  Activity,
  Compass,
  CalendarCheck2,
  Sparkles,
  Clock,
  Target,
  Layers,
  RefreshCw,
  Beef,
  Salad,
  Fish,
  PieChart,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { questions } from "../data/questionsData";

// Icon mapping helper
const iconMap = {
  Flame,
  Dumbbell,
  Zap,
  Trophy,
  HeartPulse,
  ShieldAlert,
  TrendingUp,
  Award,
  Crown,
  Building2,
  Home,
  Activity,
  Compass,
  CalendarCheck2,
  Sparkles,
  Clock,
  Target,
  Layers,
  RefreshCw,
  Beef,
  Salad,
  Fish,
  PieChart,
};

export default function Questionnaire({ onPlanGenerated, existingAnswers }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState(
    existingAnswers || {
      1: "muscle_gain",
      2: "intermediate",
      3: "commercial_gym",
      4: "4_days",
      5: "45_mins",
      6: "upper_lower",
      7: "high_protein_nonveg",
    }
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const currentQ = questions.find((q) => q.id === currentStep) || questions[0];
  const totalSteps = questions.length;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const handleSelectOption = (optionId) => {
    const updated = { ...answers, [currentStep]: optionId };
    setAnswers(updated);

    // If not last question, advance smoothly to next step
    if (currentStep < totalSteps) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 200);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      triggerPlanGeneration();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const triggerPlanGeneration = () => {
    setIsGenerating(true);

    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10B981", "#00F5D4", "#FF6B35", "#FBBF24"],
      });
    } catch (e) {
      // safe fallback
    }

    setTimeout(() => {
      setIsGenerating(false);
      onPlanGenerated(answers);
    }, 800);
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen flex flex-col justify-center">
      {/* Step Header with Progress Bar */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-pulse" />
            <span>AI Calibration Engine</span>
          </span>
          <span className="text-brand-300 font-black">
            Question {currentStep} of {totalSteps} ({progressPercent}%)
          </span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/[0.06]">
          <div
            className="h-full bg-gradient-to-r from-brand-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-500 shadow-lg shadow-brand-500/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Step Indicator Pills */}
        <div className="flex items-center justify-between gap-1 pt-1">
          {questions.map((q) => {
            const isCompleted = answers[q.id] && q.id < currentStep;
            const isCurrent = q.id === currentStep;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentStep(q.id)}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  isCurrent
                    ? "bg-brand-400 h-2 shadow-md shadow-brand-400/50"
                    : isCompleted
                    ? "bg-emerald-600/70"
                    : "bg-slate-800"
                }`}
                title={`Jump to step ${q.id}`}
              />
            );
          })}
        </div>
      </div>

      {/* Main Question Card with 3D Depth */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl overflow-hidden">
        {/* Glow behind */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 blur-[90px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 blur-[90px] pointer-events-none rounded-full" />

        {/* Question Header */}
        <div className="relative z-10 space-y-3 mb-8 text-center sm:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-bold tracking-wide">
            {currentQ.badge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
            {currentQ.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal">
            {currentQ.subtitle}
          </p>
        </div>

        {/* Options Selection Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {currentQ.options.map((option) => {
            const Icon = iconMap[option.icon] || Dumbbell;
            const isSelected = answers[currentStep] === option.id;

            return (
              <div
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? "bg-gradient-to-br from-brand-950/80 via-[#131d27] to-[#0a141b] border-brand-400 shadow-xl shadow-brand-500/20 scale-[1.01]"
                    : "glass-panel-card hover:border-slate-500 hover:bg-slate-800/40"
                }`}
              >
                {/* Active Selection Glow Ring */}
                {isSelected && (
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-brand-500/30 to-cyan-500/30 -z-10 blur-sm" />
                )}

                <div className="flex items-start gap-4">
                  {/* Icon Badge */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                      isSelected
                        ? "bg-brand-500 text-black shadow-lg shadow-brand-500/40"
                        : "bg-slate-800/90 text-brand-400 border border-white/10"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-base font-bold tracking-tight transition-colors ${
                          isSelected
                            ? "text-brand-300"
                            : "text-white group-hover:text-brand-300"
                        }`}
                      >
                        {option.label}
                      </h3>
                      {isSelected ? (
                        <CheckCircle className="w-5 h-5 text-brand-400 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-600 group-hover:border-slate-400 shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {option.desc}
                    </p>

                    {option.tag && (
                      <div className="pt-2">
                        <span
                          className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                            isSelected
                              ? "bg-brand-500/20 text-brand-300 border border-brand-500/30"
                              : "bg-white/[0.05] text-slate-400"
                          }`}
                        >
                          {option.tag}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Bar at Bottom */}
        <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/[0.08]">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
              currentStep === 1
                ? "opacity-30 cursor-not-allowed text-slate-600"
                : "text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="text-xs text-slate-500 font-medium hidden sm:block">
            Choose an option to auto-advance, or click Next
          </div>

          <button
            onClick={handleNext}
            disabled={isGenerating}
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-400 text-slate-950 font-black text-sm shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-105 transition-all"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>Calibrating Plan...</span>
              </span>
            ) : currentStep === totalSteps ? (
              <span className="flex items-center gap-2">
                <span>Synthesize Weekly Plan</span>
                <Sparkles className="w-4 h-4 fill-current" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
