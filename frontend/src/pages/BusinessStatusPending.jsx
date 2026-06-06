import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';
import LanguageToggle from '../components/LanguageToggle';

export default function BusinessStatusPending() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-surface-container-low font-ui text-on-surface min-h-screen asymmetric-gradient">
      {/* Screen Content */}
      
{/* Top Navigation Shell */}
<nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#1B2A5E]/80 backdrop-blur-md shadow-sm dark:shadow-none">
  <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
    <Link to="/" className="font-['Bricolage_Grotesque'] text-2xl font-extrabold text-[#1B2A5E] dark:text-white">LocalBoost</Link>
    
    {/* Desktop Menu */}
    <div className="hidden md:flex items-center space-x-8 font-ui text-sm font-medium tracking-tight">
      <Link to="/services" className={`${isActive('/services') ? 'text-[#1DB887]' : 'text-[#1B2A5E] dark:text-slate-300'} hover:text-[#1DB887] transition-colors`}>{t("navbar.services")}</Link>
      <Link to="/how-it-works" className={`${isActive('/how-it-works') ? 'text-[#1DB887]' : 'text-[#1B2A5E] dark:text-slate-300'} hover:text-[#1DB887] transition-colors`}>{t("navbar.howItWorks")}</Link>
      <Link to="/about" className={`${isActive('/about') ? 'text-[#1DB887]' : 'text-[#1B2A5E] dark:text-slate-300'} hover:text-[#1DB887] transition-colors`}>{t("navbar.about")}</Link>
    </div>
    
    <div className="hidden md:flex items-center space-x-4 font-ui text-sm">
      <LanguageToggle className="border-[#1B2A5E]/15 text-[#1B2A5E]" />
      <Link to="/sign-in" className="text-[#1B2A5E] dark:text-white font-medium hover:opacity-80 transition-all duration-200 active:scale-95">{t("common.signIn")}</Link>
      <Link to="/business-setup" className="bg-[#1B2A5E] text-white px-6 py-2.5 rounded-[10px] font-bold hover:opacity-90 transition-all duration-200 active:scale-95 shadow-lg">{t("common.getStarted")}</Link>
    </div>

    {/* Mobile Hamburger Toggle */}
    <div className="md:hidden flex items-center space-x-4">
      <LanguageToggle className="border-[#1B2A5E]/15 text-[#1B2A5E]" />
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#1B2A5E] dark:text-white focus:outline-none">
        <span className="material-symbols-outlined text-2xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
      </button>
    </div>
  </div>

  {/* Mobile Menu Dropdown */}
  {isMobileMenuOpen && (
    <div className="md:hidden bg-white dark:bg-[#1B2A5E] shadow-xl absolute top-full left-0 w-full border-t border-primary/5 py-4 px-8 flex flex-col space-y-4">
      <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className={`${isActive('/services') ? 'text-[#1DB887]' : 'text-[#1B2A5E] dark:text-slate-300'} font-medium`}>{t("navbar.services")}</Link>
      <Link to="/how-it-works" onClick={() => setIsMobileMenuOpen(false)} className={`${isActive('/how-it-works') ? 'text-[#1DB887]' : 'text-[#1B2A5E] dark:text-slate-300'} font-medium`}>{t("navbar.howItWorks")}</Link>
      <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`${isActive('/about') ? 'text-[#1DB887]' : 'text-[#1B2A5E] dark:text-slate-300'} font-medium`}>{t("navbar.about")}</Link>
      <hr className="border-primary/5" />
      <Link to="/sign-in" onClick={() => setIsMobileMenuOpen(false)} className="text-[#1B2A5E] dark:text-white font-medium">{t("common.signIn")}</Link>
      <Link to="/business-setup" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#1B2A5E] text-white px-6 py-3 rounded-[10px] font-bold text-center">{t("common.getStarted")}</Link>
    </div>
  )}
</nav>
{/* Main Content Canvas */}
<main className="pt-32 pb-24 px-6 flex flex-col items-center justify-center min-h-screen">
{/* Status Notification Banner */}
<div className="mb-12 text-center max-w-2xl">
<span className="font-ui text-[11px] font-bold tracking-[0.2em] text-secondary uppercase mb-4 block">{t("businessStatus.verificationDashboard")}</span>
<h1 className="font-display text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight">
                {t("businessStatus.reviewingTitle").split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
            </h1>
</div>
{/* Central Status Card (High-End Asymmetric Design) */}
<div className="relative w-full max-w-4xl">
{/* Background Decorative Element */}
<div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl -z-10"></div>
<div className="bg-surface-container-lowest rounded-[24px] shadow-[0_12px_40px_rgba(27,42,94,0.06)] overflow-hidden">
<div className="flex flex-col md:flex-row">
{/* Left Column: Status & Identity */}
<div className="p-10 md:w-2/5 bg-surface-container-low/50">
<div className="mb-8">
<div className="w-16 h-16 bg-tertiary-fixed rounded-full flex items-center justify-center shadow-lg shadow-tertiary-fixed-dim/30">
<span className="material-symbols-outlined text-tertiary text-3xl" data-icon="hourglass">hourglass</span>
</div>
</div>
<div className="space-y-4">
<h2 className="font-display text-2xl font-bold text-primary leading-tight">{t("businessStatus.underVerification")}</h2>
<p className="text-on-surface-variant leading-relaxed">{t("businessStatus.reviewingDocs")}</p>
</div>
{/* Progress Micro-Counter */}
<div className="mt-12 pt-8 border-t border-outline-variant/30">
<div className="flex items-center gap-3">
<span className="text-3xl font-display font-extrabold text-primary">75%</span>
<div className="text-xs font-ui uppercase tracking-widest text-on-surface-variant font-bold">{t("businessStatus.verificationComplete")}</div>
</div>
</div>
</div>
{/* Right Column: Timeline & Info */}
<div className="p-10 md:w-3/5">
<div className="space-y-10 relative">
{/* Timeline Line */}
<div className="absolute left-4 top-2 bottom-2 w-[2px] bg-surface-container-high -z-0"></div>
{/* Step 1: Done */}
<div className="relative flex gap-6 items-start">
<div className="z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center shadow-md">
<span className="material-symbols-outlined text-white text-sm" data-icon="check">check</span>
</div>
<div>
<h3 className="font-display text-lg font-bold text-primary">{t("businessStatus.accountCreated")}</h3>
<p className="text-sm text-on-surface-variant">{t("businessStatus.profileSecured")}</p>
</div>
</div>
{/* Step 2: Done */}
<div className="relative flex gap-6 items-start">
<div className="z-10 w-8 h-8 rounded-full bg-secondary flex items-center justify-center shadow-md">
<span className="material-symbols-outlined text-white text-sm" data-icon="check">check</span>
</div>
<div>
<h3 className="font-display text-lg font-bold text-primary">{t("businessStatus.serviceSelected")}</h3>
<p className="text-sm text-on-surface-variant">{t("businessStatus.selectedTier")}</p>
</div>
</div>
{/* Step 3: Active Pulse */}
<div className="relative flex gap-6 items-start">
<div className="z-10 w-8 h-8 rounded-full bg-tertiary flex items-center justify-center shadow-lg relative">
<div className="absolute inset-0 rounded-full bg-tertiary-fixed step-pulse -z-10"></div>
<span className="material-symbols-outlined text-white text-sm" data-icon="sync">sync</span>
</div>
<div>
<h3 className="font-display text-lg font-bold text-primary">{t("businessStatus.adminVerification")}</h3>
<p className="text-sm text-on-surface-variant font-medium">{t("businessStatus.ongoingCheck")}</p>
</div>
</div>
{/* Step 4: Waiting */}
<div className="relative flex gap-6 items-start">
<div className="z-10 w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center">
<div className="w-2 h-2 rounded-full bg-outline-variant"></div>
</div>
<div>
<h3 className="font-display text-lg font-bold text-outline">{t("businessStatus.goLive")}</h3>
<p className="text-sm text-on-surface-variant opacity-50">{t("businessStatus.publishingToNetwork")}</p>
</div>
</div>
</div>
{/* Info Box */}
<div className="mt-12 p-6 bg-primary-container rounded-2xl flex gap-4 items-center">
<div className="w-10 h-10 shrink-0 bg-white/10 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-secondary-fixed text-xl" data-icon="notifications_active">notifications_active</span>
</div>
<p className="text-on-primary-container text-sm leading-relaxed">
                                {t("businessStatus.notificationInfo")}
                            </p>
</div>
</div>
</div>
</div>
{/* Additional Support Link */}
<div className="mt-8 text-center">
<a className="text-sm font-medium text-primary hover:text-secondary transition-colors inline-flex items-center gap-2" href="#">
<span>{t("businessStatus.needHelpContact")}</span>
<span className="material-symbols-outlined text-base" data-icon="arrow_forward">arrow_forward</span>
</a>
</div>
</div>
{/* Featured Merchant Cards (Bento style teaser) */}
<div className="w-full max-w-7xl mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="col-span-1 md:col-span-1 p-8 bg-white rounded-2xl flex flex-col justify-between h-64 border border-outline-variant/10">
<div className="text-label text-[11px] font-bold tracking-widest text-on-surface-variant uppercase">{t("businessStatus.proTip")}</div>
<h4 className="font-display text-xl font-bold text-primary">{t("businessStatus.optimizeSEO")}</h4>
<a className="font-bold text-secondary text-sm flex items-center gap-1" href="#">{t("businessStatus.readGuide")} <span className="material-symbols-outlined text-sm" data-icon="open_in_new">open_in_new</span></a>
</div>
<div className="col-span-1 md:col-span-2 relative rounded-2xl overflow-hidden group">
<img alt="Local business owner" className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105" data-alt="vibrant modern office space with diverse group of professionals collaborating in a high-key sunlit environment with minimalist decor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeF-5AhounkjpGL91jKl-WCJbEp6Bj2160fQJMQoxASyqEmadZacGKr2P2b98m21CXIkvviebIqEq9OvuYFJLLpQrsekBm2spgfPFa9DRAbJqo_hNrMqFFYztZH2m8bjQh-3krhyTVYwE6Lum6L34Gl3VXlBMPgvB3leyg33fEkcxRIVNSh_P_Ya238VgLx6TsVHvUd1NNgqiD6iMLl3yr46d-E00bAT2CoJZkc7lQTbbdHTvwM7RdpwEVkNYjy_FrIDIrKT7cT1o"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
<h4 className="font-display text-2xl font-bold text-white mb-2">{t("businessStatus.joinCommunity")}</h4>
<p className="text-white/80 text-sm max-w-md">{t("businessStatus.growVisibility")}</p>
</div>
</div>
</div>
</main>
{/* Footer (Shell Implementation) */}
<footer className="bg-slate-50 dark:bg-[#0F1A3D] w-full py-12 px-8 border-t border-[#1B2A5E]/10">
<div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
<div className="flex flex-col items-center md:items-start">
<div className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#1B2A5E] dark:text-slate-400 mb-2">LocalBoost</div>
<p className="font-ui text-xs text-[#1B2A5E] dark:text-slate-400">{t("common.copyright")}</p>
</div>
<div className="flex flex-wrap justify-center gap-8">
<a className="font-ui text-xs text-[#1B2A5E] dark:text-slate-400 hover:text-[#1DB887] transition-colors cursor-pointer" href="#">{t("common.privacyPolicy")}</a>
<a className="font-ui text-xs text-[#1B2A5E] dark:text-slate-400 hover:text-[#1DB887] transition-colors cursor-pointer" href="#">{t("common.termsOfService")}</a>
<a className="font-ui text-xs text-[#1B2A5E] dark:text-slate-400 hover:text-[#1DB887] transition-colors cursor-pointer" href="#">{t("common.cookiePolicy")}</a>
<a className="font-ui text-xs text-[#1B2A5E] dark:text-slate-400 hover:text-[#1DB887] transition-colors cursor-pointer" href="#">{t("common.support")}</a>
</div>
</div>
</footer>

    </div>
  );
}
