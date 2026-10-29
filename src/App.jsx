import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Questionnaire from "./components/Questionnaire";
import WeeklyPlan from "./components/WeeklyPlan";
import ProfileAnalysis from "./components/ProfileAnalysis";
import DietHub from "./components/DietHub";
import ProPlanner from "./components/ProPlanner";
import Footer from "./components/Footer";
import { generateWeeklyPlan } from "./utils/planGenerator";

export default function App() {
  const [activeTab, setActiveTab] = useState("hero");

  // Load Pro status from localStorage
  const [isPro, setIsPro] = useState(() => {
    try {
      return localStorage.getItem("aurapulse_is_pro") === "true";
    } catch (e) {
      return false;
    }
  });

  // Load Saved Questionnaire Answers
  const [quizAnswers, setQuizAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem("aurapulse_quiz_answers");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      1: "muscle_gain",
      2: "intermediate",
      3: "commercial_gym",
      4: "4_days",
      5: "45_mins",
      6: "upper_lower",
      7: "high_protein_nonveg",
    };
  });

  // Load Generated Weekly Plan
  const [currentPlan, setCurrentPlan] = useState(() => {
    try {
      const saved = localStorage.getItem("aurapulse_generated_plan");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Default initial plan
    return generateWeeklyPlan({
      1: "muscle_gain",
      2: "intermediate",
      3: "commercial_gym",
      4: "4_days",
      5: "45_mins",
      6: "upper_lower",
      7: "high_protein_nonveg",
    });
  });

  const handleUnlockPro = () => {
    setIsPro(true);
    try {
      localStorage.setItem("aurapulse_is_pro", "true");
    } catch (e) {}
  };

  const handlePlanGenerated = (answers) => {
    setQuizAnswers(answers);
    const newPlan = generateWeeklyPlan(answers);
    setCurrentPlan(newPlan);

    try {
      localStorage.setItem("aurapulse_quiz_answers", JSON.stringify(answers));
      localStorage.setItem("aurapulse_generated_plan", JSON.stringify(newPlan));
    } catch (e) {}

    setActiveTab("plan");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-black">
      {/* Top Fixed Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isPro={isPro}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === "hero" && (
          <Hero
            onStartQuiz={() => handleTabChange("quiz")}
            onExploreDiet={() => handleTabChange("diet")}
            onOpenProfile={() => handleTabChange("profile")}
            onOpenPro={() => handleTabChange("pro")}
            isPro={isPro}
          />
        )}

        {activeTab === "quiz" && (
          <Questionnaire
            existingAnswers={quizAnswers}
            onPlanGenerated={handlePlanGenerated}
          />
        )}

        {activeTab === "plan" && (
          <WeeklyPlan
            plan={currentPlan}
            onRetakeQuiz={() => handleTabChange("quiz")}
            onOpenPro={() => handleTabChange("pro")}
            isPro={isPro}
          />
        )}

        {activeTab === "profile" && (
          <ProfileAnalysis
            onGoToDiet={() => handleTabChange("diet")}
            onGoToPlan={() => handleTabChange("plan")}
          />
        )}

        {activeTab === "diet" && <DietHub />}

        {activeTab === "pro" && (
          <ProPlanner isPro={isPro} onUnlockPro={handleUnlockPro} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavClick={handleTabChange} isPro={isPro} />
    </div>
  );
}
