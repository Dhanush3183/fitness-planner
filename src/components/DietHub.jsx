import React, { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  Filter,
  Flame,
  Dumbbell,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  Check,
  Apple,
  X,
} from "lucide-react";
import { dietCategories, dietArticles } from "../data/dietData";

export default function DietHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedArticleId, setExpandedArticleId] = useState(null);

  // Quick interactive protein calculator tool inside Diet Page
  const [calcWeight, setCalcWeight] = useState(70);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return dietArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" || article.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.shortDesc.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.practicalFoods.some((f) => f.toLowerCase().includes(q)) ||
        article.keyRule.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id) => {
    setExpandedArticleId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="text-center sm:text-left space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Evidence-Based Nutrition Compendium</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
          Master <span className="text-gradient-emerald">Diet & Fueling</span>{" "}
          Knowledge
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl">
          No bro-science or marketing gimmicks. Every protocol below is vetted
          against peer-reviewed sports nutrition literature to maximize
          hypertrophy, accelerate fat loss, and boost hormonal health.
        </p>
      </div>

      {/* Interactive Quick Protein & Leucine Dial */}
      <div className="p-6 rounded-3xl glass-panel-glow border border-brand-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-brand-300">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Dial • Instant Personalized Target</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Calculate Your Daily Anabolic Protein & Leucine Target
          </h3>
          <p className="text-xs text-slate-400">
            Slide your bodyweight to preview your optimal daily protein and single-meal leucine bolus.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
          <div className="flex items-center gap-2 bg-white/[0.04] px-4 py-2 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 font-bold">Weight:</span>
            <input
              type="number"
              min="40"
              max="160"
              value={calcWeight}
              onChange={(e) => setCalcWeight(Number(e.target.value) || 70)}
              className="w-16 bg-transparent text-white font-extrabold text-sm text-center focus:outline-none border-b border-brand-500"
            />
            <span className="text-xs text-slate-400 font-bold">kg</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">
                Daily Protein
              </div>
              <div className="text-base font-black text-brand-400">
                {Math.round(calcWeight * 2.1)}g
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">
                Per Meal
              </div>
              <div className="text-base font-black text-cyan-300">
                {Math.round((calcWeight * 2.1) / 4)}g
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">
                Leucine Bolus
              </div>
              <div className="text-base font-black text-amber-300">
                ~3.2g
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Category Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords: 'creatine', 'deficit', 'whey', 'plant protein', 'sodium', 'leucine'..."
            className="w-full pl-12 pr-10 py-4 rounded-2xl glass-panel border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-all text-sm font-medium shadow-xl"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {dietCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? "bg-brand-500 text-slate-950 border-brand-400 shadow-md shadow-brand-500/25 scale-105"
                    : "glass-panel text-slate-400 hover:text-slate-200 border-white/[0.06] hover:bg-white/[0.04]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Results Count Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-white">{filteredArticles.length}</strong>{" "}
            verified scientific nutrition protocols
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-brand-400 hover:underline"
            >
              Clear search filter
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => {
          const isExpanded = expandedArticleId === article.id;

          return (
            <div
              key={article.id}
              className={`glass-panel rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                isExpanded
                  ? "border-brand-500/50 shadow-2xl shadow-brand-500/10 md:col-span-2"
                  : "border-white/10 hover:border-slate-500"
              }`}
            >
              {/* Card Body */}
              <div className="p-6 sm:p-8 space-y-4">
                {/* Badges & Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-[10px] font-bold uppercase tracking-wider">
                      {article.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {article.level}
                    </span>
                  </div>

                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                {/* Title & Short Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal leading-relaxed">
                    {article.shortDesc}
                  </p>
                </div>

                {/* Key Scientific Axiom Highlight */}
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-brand-500/20 text-brand-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">
                      Core Nutritional Axiom
                    </div>
                    <div className="text-xs font-semibold text-slate-200">
                      {article.keyRule}
                    </div>
                  </div>
                </div>

                {/* Macros Focus Badge */}
                <div className="inline-block px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold">
                  {article.macrosFocus}
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="pt-6 border-t border-white/[0.08] space-y-6 animate-fadeIn">
                    {/* Science Summary */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-brand-400" />
                        <span>Physiological Mechanism</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                        {article.summary}
                      </p>
                    </div>

                    {/* Practical Foods / Implementations */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Apple className="w-4 h-4 text-emerald-400" />
                        <span>Optimal Whole Food & Nutrient Sources</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {article.practicalFoods.map((food, fIdx) => (
                          <div
                            key={fIdx}
                            className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-slate-200 flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                            <span>{food}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timing Strategy */}
                    <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-3">
                      <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white font-semibold">
                          Nutrient Timing Protocol:{" "}
                        </strong>
                        {article.timingAdvice}
                      </div>
                    </div>

                    {/* Critical Pitfall Alert */}
                    <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/20 text-xs text-rose-200 flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-rose-100 font-semibold">
                          Common Pitfall:{" "}
                        </strong>
                        {article.pitfall}
                      </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-100 font-semibold">
                          Elite Coach Pro-Tip:{" "}
                        </strong>
                        {article.proTip}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Expand Button */}
              <div className="p-4 sm:px-8 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => toggleExpand(article.id)}
                  className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors"
                >
                  <span>
                    {isExpanded ? "Collapse Guide" : "Read Full Deep-Science Guide"}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
