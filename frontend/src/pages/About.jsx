import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';
import LanguageToggle from '../components/LanguageToggle';

export default function About() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-surface font-ui text-on-surface min-h-screen flex flex-col">
      <title>About LocalBoost</title>

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
            Who We Are
          </span>
          <h1 className="font-['Bricolage_Grotesque'] text-[48px] lg:text-[64px] leading-[1.1] font-extrabold text-primary mb-6">
            Empowering Local Business
          </h1>
        </div>
      </section>

      {/* SECTION 2 & 3: Mission and Vision */}
      <section className="py-16 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-primary/5 p-12 rounded-[32px] border border-primary/10">
            <h2 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-primary mb-4">Our Mission</h2>
            <p className="text-xl text-primary/70 font-medium leading-relaxed">
              Helping Local Businesses Thrive Digitally by removing technical barriers and providing accessible, expert-led digital solutions.
            </p>
          </div>
          <div className="bg-[#1DB887]/5 p-12 rounded-[32px] border border-[#1DB887]/10">
            <h2 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-primary mb-4">Our Vision</h2>
            <p className="text-xl text-primary/70 font-medium leading-relaxed">
              Digital Transformation For Every Local Business, creating a landscape where small shops can compete on a global scale.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: What We Offer */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-5xl font-bold text-primary mb-16 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Website Creation', icon: 'web', desc: 'Custom, responsive websites designed to convert visitors into loyal customers.' },
              { title: 'Branding', icon: 'palette', desc: 'Professional logo design and brand identity kits to make your business memorable.' },
              { title: 'Marketing', icon: 'campaign', desc: 'Targeted Google and Meta ad campaigns engineered for maximum local ROI.' },
              { title: 'Compliance', icon: 'gavel', desc: 'Hassle-free GST registration and business compliance guidance.' },
              { title: 'Automation', icon: 'smart_toy', desc: 'Inventory management and WhatsApp Business setups to save you hours every week.' }
            ].map((service) => (
              <div key={service.title} className="bg-white p-8 rounded-3xl border border-primary/5 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <span className="material-symbols-outlined text-4xl text-[#1DB887] mb-6 group-hover:scale-110 transition-transform">{service.icon}</span>
                <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Why LocalBoost */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-5xl font-bold mb-16">Why LocalBoost?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">speed</span>
              </div>
              <h4 className="text-2xl font-bold mb-4">Lightning Fast</h4>
              <p className="text-white/70 leading-relaxed">We bypass traditional agency bottlenecks. Your digital assets go live in days, not months.</p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">support_agent</span>
              </div>
              <h4 className="text-2xl font-bold mb-4">Dedicated Support</h4>
              <p className="text-white/70 leading-relaxed">Our experts manage the backend. Whenever you need an update, we are just a message away.</p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">insights</span>
              </div>
              <h4 className="text-2xl font-bold mb-4">Data-Driven</h4>
              <p className="text-white/70 leading-relaxed">Every decision is backed by analytics. Track your growth natively within the LocalBoost Command Centre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-5xl font-bold text-primary mb-8">Ready to Elevate Your Business?</h2>
          <Link to="/business-setup" className="inline-block bg-[#1DB887] text-white px-10 py-5 rounded-[12px] font-bold text-lg hover:scale-105 transition-transform shadow-[0_8px_24px_rgba(29,184,135,0.30)]">
            Get Started Today
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
