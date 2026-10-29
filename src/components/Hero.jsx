import React, { useState } from "react";
import {
  Sparkles,
  Flame,
  Dumbbell,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  HeartPulse,
  Activity,
  Play,
  CheckCircle2,
  Crown,
} from "lucide-react";

export default function Hero({ onStartQuiz, onExploreDiet, onOpenProfile, onOpenPro, isPro }) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // High quality curated fitness visual cards with 3D aesthetic
  const visualCards = [
    {
      title: "Hypertrophy & Power",
      subtitle: "Maximum MPS & Progressive Load",
      tag: "Muscle Synthesis",
      stat: "+34% Anabolic Yield",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      color: "from-emerald-500/80 to-teal-700/90",
    },
    {
      title: "Metabolic Shred & Core",
      subtitle: "Intense Caloric Deficit Protocol",
      tag: "Body Recomposition",
      stat: "450 kcal Burn / Session",
      image:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      color: "from-orange-500/80 to-rose-700/90",
    },
    {
      title: "Precision Macronutrient Matrix",
      subtitle: "Leucine-Dense Muscle Fuel",
      tag: "Science Nutrition",
      stat: "2.2g Protein / kg Target",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
      color: "from-cyan-500/80 to-blue-700/90",
    },
    {
      title: "Athletic Conditioning",
      subtitle: "VO2 Max & Functional Longevity",
      tag: "Endurance & Speed",
      stat: "Sub-130ms Neuromuscular Drive",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
      color: "from-purple-500/80 to-indigo-700/90",
    },
  ];

  return (
    <div className="relative pt-28 pb-20 overflow-hidden bg-cyber-grid min-h-screen flex flex-col justify-center">
      {/* 3D Atmospheric Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-brand-500/15 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-brand-orange/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel-glow border border-brand-500/30 text-xs font-bold text-brand-300 animate-float shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            <span className="tracking-wide uppercase text-[11px]">
              Next-Gen 3D Fitness Architecture
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Zero Backend / Pure Edge Speed</span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Compelling Typography & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-black tracking-tight leading-[1.08] text-white">
              Forge Your Peak Body With{" "}
              <span className="text-gradient-emerald">Intelligent 3D</span> Weekly
              Architecture.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Step through our high-precision{" "}
              <strong className="text-white font-semibold">7-Question Diagnostic</strong> to
              generate an exact, periodized 7-day training blueprint calibrated to your
              environment, target split, and metabolic threshold.
            </p>

            {/* Quick Feature Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 max-w-lg mx-auto lg:mx-0">
              <div className="glass-panel p-3 rounded-xl border border-white/[0.08] flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">7-Step Quiz</div>
                  <div className="text-[10px] text-slate-400">Tailored Plan</div>
                </div>
              </div>

              <div className="glass-panel p-3 rounded-xl border border-white/[0.08] flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Body Analysis</div>
                  <div className="text-[10px] text-slate-400">BMI • BMR • TDEE</div>
                </div>
              </div>

              <div className="glass-panel p-3 rounded-xl border border-white/[0.08] flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">Diet Science</div>
                  <div className="text-[10px] text-slate-400">Instant Filters</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={onStartQuiz}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-teal-400 to-cyan-400 text-slate-950 font-extrabold text-base shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] transform transition-all flex items-center justify-center gap-3 group"
              >
                <span>Launch 7-Step Plan Generator</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenProfile}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-panel hover:bg-white/[0.08] border border-white/10 text-white font-bold text-sm hover:border-slate-400 transition-all flex items-center justify-center gap-2.5"
              >
                <Activity className="w-4 h-4 text-brand-400" />
                <span>Biometric Analysis</span>
              </button>

              <button
                onClick={onExploreDiet}
                className="w-full sm:w-auto px-5 py-4 rounded-2xl glass-panel hover:bg-white/[0.08] border border-white/10 text-slate-300 font-semibold text-sm hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <span>Nutrition Hub</span>
              </button>
            </div>

            {/* Trust and Social Proof */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-400" />
                <span>100% Client-Side & Private</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-400" />
                <span>Evidence-Based Hypertrophy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-400" />
                <span>Razorpay Secured Pro (₹99)</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Visual Stage with Interactive Multi-layer Cards */}
          <div className="lg:col-span-5 relative perspective-1000">
            {/* Visual 3D Stage Container */}
            <div className="relative mx-auto max-w-md transform-style-3d transition-transform duration-500 hover:rotate-y-6 hover:-rotate-x-3">
              {/* Backing Hologram Ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-brand-500/25 via-cyan-500/20 to-purple-600/20 blur-xl opacity-75 -z-10 animate-pulse-slow" />

              {/* Main 3D Card */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#131922] to-[#0a0d13] shadow-2xl">
                {/* Visual Image with Overlay */}
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <img
                    src={visualCards[activeCardIndex].image}
                    alt={visualCards[activeCardIndex].title}
                    className="w-full h-full object-cover object-center transform scale-105 hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-[#0a0d13] via-[#0a0d13]/50 to-transparent`}
                  />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-brand-300">
                      {visualCards[activeCardIndex].tag}
                    </span>
                  </div>

                  {/* Top Right Floating Stat */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-brand-500/90 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5 animate-bounce">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>{visualCards[activeCardIndex].stat}</span>
                  </div>

                  {/* Card Selector Dots */}
                  <div className="absolute bottom-4 left-6 flex items-center gap-2 z-20">
                    {visualCards.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveCardIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          activeCardIndex === idx
                            ? "w-8 bg-brand-400"
                            : "w-2 bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Card Bottom Details */}
                <div className="p-6 pt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {visualCards[activeCardIndex].title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {visualCards[activeCardIndex].subtitle}
                      </p>
                    </div>

                    <button
                      onClick={onStartQuiz}
                      className="p-3 rounded-2xl bg-white/[0.08] hover:bg-brand-500 hover:text-black text-brand-400 transition-all border border-white/10"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Floating Micro Status Badges */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.08]">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03]">
                      <Dumbbell className="w-4 h-4 text-brand-400" />
                      <div>
                        <div className="text-[10px] text-slate-400">Dynamic Cues</div>
                        <div className="text-xs font-semibold text-slate-200">
                          Form Precision
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-white/[0.03]">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="text-[10px] text-slate-400">Overload Engine</div>
                        <div className="text-xs font-semibold text-slate-200">
                          RPE Tracking
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3D Floating Holographic Overlays */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl glass-panel-glow border border-brand-500/40 shadow-2xl flex items-center gap-3 animate-float hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Weekly Target</div>
                  <div className="text-sm font-bold text-white">3,200+ kcal Burn</div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 p-3.5 rounded-2xl glass-panel border border-cyan-500/30 shadow-2xl flex items-center gap-2.5 animate-float-reverse hidden sm:flex">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">BMR Baseline</div>
                  <div className="text-xs font-bold text-white">Validated Mifflin Eq</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
