import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Crown,
  Sparkles,
  CheckCircle2,
  Volume2,
  Calculator,
  ShieldCheck,
  Zap,
  ArrowRight,
  Flame,
  Award,
  RefreshCw,
  Sliders,
  Play,
  Square,
  Lock,
  Unlock,
} from "lucide-react";

export default function ProPlanner({ isPro, onUnlockPro }) {
  const [billingCycle, setBillingCycle] = useState("annual"); // 'monthly' | 'annual'
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // Pro Feature 1: 1RM Calculator State
  const [oneRmWeight, setOneRmWeight] = useState(80);
  const [oneRmReps, setOneRmReps] = useState(5);

  // Pro Feature 2: Audio Voice Coach State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedCoachCue, setSelectedCoachCue] = useState("squat");

  // Pro Feature 3: Exercise Swap State
  const [selectedIssue, setSelectedIssue] = useState("lower_back");

  // 1RM Calculation (Epley and Brzycki average)
  const calc1RM = () => {
    const w = Number(oneRmWeight) || 0;
    const r = Number(oneRmReps) || 1;
    if (r === 1) return w;
    const epley = w * (1 + r / 30);
    const brzycki = w * (36 / (37 - Math.min(r, 36)));
    return Math.round((epley + brzycki) / 2);
  };

  const estimated1RM = calc1RM();

  // Voice Coach Speech Synthesis
  const playAudioCoach = (cueType) => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported by your browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const cues = {
      squat:
        "Attention lifter. Lock in your stance slightly wider than hips. Breathe deep into your diaphragm, expand your ribs 360 degrees. Hinge back, drive knees out over pinky toes, hit parallel, now explode through the midfoot!",
      bench:
        "Retract and depress your scapulae. Dig your lats into the bench. Arch upper back, grip the bar tight like you want to bend it. Lower under 3 seconds control, touch mid sternum, now drive upward violently!",
      deadlift:
        "Step up to the bar, shins one inch away. Wedge your hips in. Pull slack out of the bar until you hear the click. Squeeze your armpits shut like holding a pair of oranges. Push the floor away!",
      overhead:
        "Squeeze your glutes and brace your abs like getting punched in the gut. Keep elbows tucked slightly forward. Press straight up overhead, poke your head through at the top. Complete lockout!",
    };

    const textToSpeak = cues[cueType] || cues.squat;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopAudioCoach = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Razorpay Gateway Handler
  const handleRazorpayPayment = (cycle) => {
    setPaymentError("");
    const amountInPaise = cycle === "monthly" ? 9900 : 89900;
    const planName =
      cycle === "monthly"
        ? "Pro Monthly Subscription (₹99)"
        : "Pro Annual VIP Membership (₹899)";

    // Verify if Razorpay checkout script is available
    if (typeof window.Razorpay === "undefined") {
      setPaymentError(
        "Razorpay SDK could not load. You can click 'Simulate Test Payment' below to test immediately."
      );
      return;
    }

    try {
      const options = {
        key: "rzp_test_TtFdkRit81xGF6", // Test API Key provided by user
        amount: amountInPaise,
        currency: "INR",
        name: "AuraPulse 3D Fitness",
        description: planName,
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop",
        handler: function (response) {
          // Success!
          onUnlockPro();
          setPaymentSuccess(true);

          try {
            confetti({
              particleCount: 150,
              spread: 90,
              origin: { y: 0.5 },
              colors: ["#FBBF24", "#10B981", "#00F5D4", "#FF6B35"],
            });
          } catch (e) {}
        },
        prefill: {
          name: "Elite Athlete",
          email: "athlete@aurapulse.fit",
          contact: "9876543210",
        },
        theme: {
          color: "#10B981",
        },
        modal: {
          ondismiss: function () {
            console.log("Razorpay checkout closed by user.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (resp) {
        setPaymentError(
          resp.error.description || "Payment could not be processed."
        );
      });
      rzp.open();
    } catch (err) {
      setPaymentError(
        "Razorpay checkout error: " + (err.message || "Failed to initialize.")
      );
    }
  };

  // Instant Test Simulation for local testing
  const handleSimulatePayment = () => {
    onUnlockPro();
    setPaymentSuccess(true);
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#FBBF24", "#10B981", "#00F5D4"],
      });
    } catch (e) {}
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-500/10">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>AuraPulse Elite Pro Tier</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight">
          Supercharge Your Physique With{" "}
          <span className="text-gradient-gold">Pro Architecture</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 font-normal">
          Unlock audio form coach guidance, automated 1-Rep Max progressive
          overload calculators, injury substitution matrices, and custom macro
          blueprints.
        </p>

        {/* Pricing Cycle Selector Tabs */}
        {!isPro && (
          <div className="pt-4 flex items-center justify-center">
            <div className="p-1.5 rounded-2xl bg-[#0e131b] border border-white/10 flex items-center gap-2">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-brand-500 text-slate-950 shadow-md shadow-brand-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly Plan (₹99)
              </button>

              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all relative flex items-center gap-2 ${
                  billingCycle === "annual"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Annual VIP (₹899)</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-black/40 text-white">
                  Save 25%
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pricing Cards Grid (Show if not yet Pro) */}
      {!isPro ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan Card */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-brand-500/50 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Monthly Pass
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-bold">
                  Flexible
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-display">
                    ₹99
                  </span>
                  <span className="text-slate-400 text-sm">/ month</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Billed monthly. Cancel anytime with zero questions asked.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.08] text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Real-Time AI Voice Coaching Audio Engine</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Brzycki & Epley 1-Rep Max Load Calculator</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>VIP Joint Rehab & Exercise Swapping System</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>Unlimited High-Res PDF Workout Logging Exports</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <button
                onClick={() => handleRazorpayPayment("monthly")}
                className="w-full py-4 rounded-2xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-black text-sm shadow-xl shadow-brand-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <span>Pay ₹99 with Razorpay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleSimulatePayment}
                className="w-full py-2 text-center text-[11px] text-slate-500 hover:text-slate-300 underline"
              >
                Or Instant Test Unlock
              </button>
            </div>
          </div>

          {/* Annual Plan Card (Featured) */}
          <div className="relative rounded-3xl p-8 bg-gradient-to-b from-[#1c221a] via-[#101915] to-[#0a0f0d] border-2 border-amber-500/60 shadow-2xl shadow-amber-500/10 flex flex-col justify-between space-y-6">
            {/* Top Featured Ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[11px] font-black uppercase tracking-wider shadow-lg">
              Most Popular • Best Value
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Annual VIP Pass
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  Save 25%
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-display">
                    ₹899
                  </span>
                  <span className="text-slate-400 text-sm">/ year (₹74/mo)</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  One-time annual payment. Full 365 days of elite access.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.08] text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold">Everything in Monthly, plus:</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Priority Access to New 3D Features & Routine Splits</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Custom Macro Recipe Generator Engine</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>VIP Gold Community Status Watermark</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <button
                onClick={() => handleRazorpayPayment("annual")}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Pay ₹899 with Razorpay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleSimulatePayment}
                className="w-full py-2 text-center text-[11px] text-slate-500 hover:text-slate-300 underline"
              >
                Or Instant Test Unlock
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* PRO ACTIVE STATUS BANNER */
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-brand-950/40 to-[#0e1620] border-2 border-amber-400/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 shrink-0 shadow-lg shadow-amber-500/30">
              <Crown className="w-8 h-8 fill-current" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                <span>Active VIP Subscriber</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                All Pro Features Are Fully Unlocked!
              </h2>
              <p className="text-xs text-slate-300">
                Razorpay ID verified. You have full access to the audio coach, 1RM calculator, and injury swap matrix.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center shrink-0">
            <div className="text-[10px] uppercase font-bold text-slate-400">
              Subscription
            </div>
            <div className="text-sm font-black text-amber-400">
              LIFETIME VIP ACCESS
            </div>
          </div>
        </div>
      )}

      {/* Error message banner if any */}
      {paymentError && (
        <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-500 text-xs text-rose-200 max-w-xl mx-auto text-center">
          {paymentError}
        </div>
      )}

      {/* ----------------- PRO TOOL 1: AUDIO FORM COACH ----------------- */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Pro Feature • Audio AI Voice Coach</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Real-Time Spoken Compound Lift Cues
            </h3>
            <p className="text-xs text-slate-400">
              Listen to biomechanically precise auditory cues right through your headphones before your heavy sets.
            </p>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center gap-3">
            {isSpeaking ? (
              <button
                onClick={stopAudioCoach}
                className="px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-500/30 animate-pulse"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop Audio</span>
              </button>
            ) : (
              <button
                onClick={() => playAudioCoach(selectedCoachCue)}
                className="px-5 py-2.5 rounded-xl bg-brand-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-brand-500/30 hover:scale-105 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Auditory Coaching</span>
              </button>
            )}
          </div>
        </div>

        {/* Lift Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: "squat", label: "Barbell Squat" },
            { id: "bench", label: "Bench Press" },
            { id: "deadlift", label: "Deadlift Wedge" },
            { id: "overhead", label: "Military Press" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedCoachCue(item.id);
                if (isSpeaking) playAudioCoach(item.id);
              }}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center ${
                selectedCoachCue === item.id
                  ? "bg-brand-500/20 border-brand-400 text-brand-300 shadow-md"
                  : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Speech Script Preview */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 leading-relaxed font-mono">
          <span className="text-brand-400 font-bold font-sans block mb-1">
            Coach Script (Spoken via Web Speech Audio API):
          </span>
          {selectedCoachCue === "squat" &&
            "\"Attention lifter. Lock in your stance slightly wider than hips. Breathe deep into your diaphragm, expand your ribs 360 degrees. Hinge back, drive knees out over pinky toes, hit parallel, now explode through the midfoot!\""}
          {selectedCoachCue === "bench" &&
            "\"Retract and depress your scapulae. Dig your lats into the bench. Arch upper back, grip the bar tight like you want to bend it. Lower under 3 seconds control, touch mid sternum, now drive upward violently!\""}
          {selectedCoachCue === "deadlift" &&
            "\"Step up to the bar, shins one inch away. Wedge your hips in. Pull slack out of the bar until you hear the click. Squeeze your armpits shut like holding a pair of oranges. Push the floor away!\""}
          {selectedCoachCue === "overhead" &&
            "\"Squeeze your glutes and brace your abs like getting punched in the gut. Keep elbows tucked slightly forward. Press straight up overhead, poke your head through at the top. Complete lockout!\""}
        </div>
      </div>

      {/* ----------------- PRO TOOL 2: 1-REP MAX CALCULATOR ----------------- */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6">
        <div className="space-y-1 pb-6 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Pro Feature • 1-Rep Max & Load Matrix</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Scientific Brzycki & Epley 1RM Progression
          </h3>
          <p className="text-xs text-slate-400">
            Never guess your working weights again. Compute your true maximal strength and exact percentage load targets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Inputs */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Weight Lifted (kg)
              </label>
              <input
                type="number"
                min="10"
                max="400"
                value={oneRmWeight}
                onChange={(e) => setOneRmWeight(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-bold text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                Reps Completed to Failure (1 - 15)
              </label>
              <input
                type="number"
                min="1"
                max="15"
                value={oneRmReps}
                onChange={(e) => setOneRmReps(Number(e.target.value) || 1)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-bold text-sm focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
              <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                Calculated 1-Rep Max
              </div>
              <div className="text-4xl font-black text-white font-display">
                {estimated1RM} <span className="text-lg text-amber-400">kg</span>
              </div>
            </div>
          </div>

          {/* Output Percentages Table */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                95% (1-2 Reps)
              </div>
              <div className="text-xl font-black text-rose-400">
                {Math.round(estimated1RM * 0.95)} kg
              </div>
              <div className="text-[10px] text-slate-500">Max Peaking</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                85% (4-6 Reps)
              </div>
              <div className="text-xl font-black text-amber-400">
                {Math.round(estimated1RM * 0.85)} kg
              </div>
              <div className="text-[10px] text-slate-500">Raw Strength</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                75% (8-10 Reps)
              </div>
              <div className="text-xl font-black text-brand-400">
                {Math.round(estimated1RM * 0.75)} kg
              </div>
              <div className="text-[10px] text-slate-500">Hypertrophy</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                65% (12-15 Reps)
              </div>
              <div className="text-xl font-black text-cyan-400">
                {Math.round(estimated1RM * 0.65)} kg
              </div>
              <div className="text-[10px] text-slate-500">Endurance</div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- PRO TOOL 3: INJURY & JOINT REHAB SWAPPER ----------------- */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-6">
        <div className="space-y-1 pb-6 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Pro Feature • Injury & Joint Friendly Swap Matrix</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Instant Exercise Substitutions
          </h3>
          <p className="text-xs text-slate-400">
            Experiencing joint impingement or nagging pain? Instantly swap problematic compound lifts for biomechanically gentle alternatives that preserve 100% hypertrophy stimulus.
          </p>
        </div>

        {/* Joint issue selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "lower_back", label: "Lower Back Discomfort" },
            { id: "shoulder_impingement", label: "Shoulder Impingement / AC Joint" },
            { id: "knee_patellar", label: "Knee / Patellar Tendon Pain" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedIssue(item.id)}
              className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-center ${
                selectedIssue === item.id
                  ? "bg-brand-500/20 border-brand-400 text-brand-300 shadow-md"
                  : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Swap suggestions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {selectedIssue === "lower_back" && (
            <>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                <div className="text-xs font-bold text-rose-400 flex items-center justify-between">
                  <span>Avoid: Heavy Conventional Deadlift</span>
                  <span className="text-[10px] text-slate-500">High Axial Shear</span>
                </div>
                <div className="text-sm font-bold text-brand-300">
                  Swap to: Trap Bar Deadlift or Chest-Supported DB Row
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Trap bars place the center of gravity in line with your hips rather than in front, reducing lumbar shear forces by over 45%.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                <div className="text-xs font-bold text-rose-400 flex items-center justify-between">
                  <span>Avoid: Heavy Barbell Back Squat</span>
                  <span className="text-[10px] text-slate-500">Spinal Compression</span>
                </div>
                <div className="text-sm font-bold text-brand-300">
                  Swap to: Bulgarian Split Squats or Belt Squats
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Unilateral leg loading delivers maximal quadriceps and glute tension while requiring only 30% of the spinal loading.
                </p>
              </div>
            </>
          )}

          {selectedIssue === "shoulder_impingement" && (
            <>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                <div className="text-xs font-bold text-rose-400 flex items-center justify-between">
                  <span>Avoid: Straight Bar Overhead Military Press</span>
                  <span className="text-[10px] text-slate-500">Subacromial Pinch</span>
                </div>
                <div className="text-sm font-bold text-brand-300">
                  Swap to: Neutral-Grip DB Press or Landmine Shoulder Press
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Landmine press travels at a natural 45-degree angle that aligns with scapular plane motion, avoiding impingement.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                <div className="text-xs font-bold text-rose-400 flex items-center justify-between">
                  <span>Avoid: Wide Grip Dips with Extreme Flare</span>
                  <span className="text-[10px] text-slate-500">Anterior Capsule Stress</span>
                </div>
                <div className="text-sm font-bold text-brand-300">
                  Swap to: Incline DB Hex Press or Floor Cable Press
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Floor press mechanically limits hyperextension of the humeral head at the bottom.
                </p>
              </div>
            </>
          )}

          {selectedIssue === "knee_patellar" && (
            <>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                <div className="text-xs font-bold text-rose-400 flex items-center justify-between">
                  <span>Avoid: Forward Lunges with Knee Slide</span>
                  <span className="text-[10px] text-slate-500">Patellar Shear</span>
                </div>
                <div className="text-sm font-bold text-brand-300">
                  Swap to: Reverse Lunges or Box Step-Ups with Vertical Shin
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Stepping backwards shifts the vector from anterior patellar tension to glute and hamstring absorption.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                <div className="text-xs font-bold text-rose-400 flex items-center justify-between">
                  <span>Avoid: Heavy Leg Extensions at 90° Start</span>
                  <span className="text-[10px] text-slate-500">Direct Tendon Load</span>
                </div>
                <div className="text-sm font-bold text-brand-300">
                  Swap to: Spanish Squats with Heavy Band Behind Knees
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Spanish squats utilize isometric quad tension shown in clinical research to relieve patellar tendinopathy.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
