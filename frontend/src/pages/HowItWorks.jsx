import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';
import LanguageToggle from '../components/LanguageToggle';

export default function HowItWorks() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-surface font-ui text-on-surface min-h-screen flex flex-col">
      <title>How LocalBoost Works</title>

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

      {/* SECTION 1: Hero */}
      <section className="relative pt-40 pb-24 bg-surface overflow-hidden">
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
            The Journey
          </span>
          <h1 className="font-['Bricolage_Grotesque'] text-[48px] lg:text-[64px] leading-[1.1] font-extrabold text-primary mb-6">
            How LocalBoost Works
          </h1>
          <p className="text-xl text-on-surface-variant font-medium">
            A simple process to bring your business online and help it grow. We handle the complexity so you can focus on running your business.
          </p>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-[#1DB887]/5 blur-3xl -z-10 rounded-full"></div>
      </section>

      {/* SECTION 2: Timeline */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-5xl mx-auto px-8">
          <div className="space-y-16">
            {[
              { step: '01', title: 'Business Registration', desc: 'Sign up securely on our platform and provide basic details about your local business.' },
              { step: '02', title: 'Verification Process', desc: 'We securely verify your business identity to establish trust and unlock core features.' },
              { step: '03', title: 'Choose Services', desc: 'Browse our specialized marketplace to select the digital services your business needs right now.' },
              { step: '04', title: 'Digital Setup', desc: 'Our experts handle all technical implementation, from website building to social media structuring.' },
              { step: '05', title: 'Launch & Growth', desc: 'Go live with your new digital presence and use our dashboard to track growth and metrics.' }
            ].map((item, index) => (
              <div key={item.step} className="flex flex-col md:flex-row gap-8 items-start relative">
                {/* Timeline connector line */}
                {index !== 4 && <div className="hidden md:block absolute left-10 top-20 bottom-[-64px] w-0.5 bg-primary/10"></div>}
                
                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-white font-['Bricolage_Grotesque'] text-2xl font-black shadow-lg flex-shrink-0 z-10">
                  {item.step}
                </div>
                <div className="pt-2">
                  <h3 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Benefits */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-5xl font-bold mb-6">Why Follow The Process?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10 text-center">
              <span className="material-symbols-outlined text-5xl text-[#1DB887] mb-6">rocket_launch</span>
              <h4 className="font-['Bricolage_Grotesque'] text-2xl font-bold mb-4">Faster Online Presence</h4>
              <p className="text-white/70 leading-relaxed">Skip the technical hurdles. Our structured flow ensures your business is visible to customers in record time.</p>
            </div>
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10 text-center">
              <span className="material-symbols-outlined text-5xl text-[#1DB887] mb-6">campaign</span>
              <h4 className="font-['Bricolage_Grotesque'] text-2xl font-bold mb-4">Digital Marketing Support</h4>
              <p className="text-white/70 leading-relaxed">Integrated tools and expert services to continuously engage your audience and drive foot traffic.</p>
            </div>
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10 text-center">
              <span className="material-symbols-outlined text-5xl text-[#1DB887] mb-6">monitoring</span>
              <h4 className="font-['Bricolage_Grotesque'] text-2xl font-bold mb-4">Business Growth Tracking</h4>
              <p className="text-white/70 leading-relaxed">Real-time metrics and a unified dashboard to measure the ROI of your newly acquired digital assets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CTA */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-5xl font-bold text-primary mb-8">Ready to Start Your Journey?</h2>
          <Link to="/business-setup" className="inline-block bg-[#1DB887] text-white px-10 py-5 rounded-[12px] font-bold text-lg hover:scale-105 transition-transform shadow-[0_8px_24px_rgba(29,184,135,0.30)]">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-[#0F1A3D] w-full py-12 px-8 border-t border-[#1B2A5E]/10 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <span className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#1B2A5E] dark:text-slate-400">LocalBoost</span>
            <p className="font-ui text-xs text-[#1B2A5E] dark:text-slate-400">{t("common.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
