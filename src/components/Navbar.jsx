import React, { useState } from "react";
import {
  Dumbbell,
  Sparkles,
  Calendar,
  UserCheck,
  BookOpen,
  Crown,
  Menu,
  X,
  Zap,
} from "lucide-react";

export default function Navbar({ activeTab, setActiveTab, isPro }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "Home", icon: Zap },
    { id: "quiz", label: "7-Step Quiz", icon: Sparkles },
    { id: "plan", label: "Weekly Plan", icon: Calendar },
    { id: "profile", label: "Body Analysis", icon: UserCheck },
    { id: "diet", label: "Diet Knowledge", icon: BookOpen },
    { id: "pro", label: "Pro Planner", icon: Crown, proBadge: true },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-500 via-teal-500 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-all duration-300 transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0d1117] rounded-[14px] flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-brand-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-brand-300 transition-colors">
                  Aura<span className="text-gradient-emerald">Pulse</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/30">
                  3D AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Precision Fitness & Nutrition Hub
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 bg-[#0d1117]/80 p-1.5 rounded-2xl border border-white/[0.06]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 relative ${
                    isActive
                      ? "bg-gradient-to-r from-brand-500/20 to-cyan-500/20 text-brand-300 border border-brand-500/40 shadow-sm"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? "text-brand-400 animate-pulse"
                        : "text-slate-400"
                    }`}
                  />
                  <span>{item.label}</span>
                  {item.proBadge && (
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                        isPro
                          ? "bg-amber-400 text-black animate-pulse"
                          : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      }`}
                    >
                      {isPro ? "PRO VIP" : "₹99"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {isPro ? (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold">
                <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>PRO ACTIVE LIFETIME</span>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick("pro")}
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-black font-extrabold text-xs shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:-translate-y-0.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Unlock Pro (₹99)</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick("quiz")}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transform hover:-translate-y-0.5 transition-all"
            >
              <span>Quick Plan</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            {isPro && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                PRO
              </span>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e16]/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? "bg-brand-500/15 text-brand-300 border border-brand-500/30"
                    : "text-slate-300 hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-brand-400" : "text-slate-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.proBadge && (
                  <span className="text-xs px-2 py-0.5 rounded bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black">
                    {isPro ? "PRO" : "₹99"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
