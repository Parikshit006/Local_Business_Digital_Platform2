import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getPublicTestimonials } from '../api/testimonialApi';
import { useTranslation, getLocalizedValue } from '../i18n';
import LanguageToggle from '../components/LanguageToggle';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`material-symbols-outlined text-[16px] ${i <= rating ? 'text-amber-400' : 'text-primary/20'}`}
          style={{ fontVariationSettings: i <= rating ? "'FILL' 1" : "'FILL' 0" }}
        >star</span>
      ))}
    </div>
  );
}

export default function SuccessStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getPublicTestimonials();
        setStories(data);
      } catch (err) {
        console.error("Failed to load stories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="bg-surface font-ui text-on-surface min-h-screen flex flex-col">
      <title>Success Stories | LocalBoost</title>

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

      {/* SECTION 1: Hero Section */}
      <section className="relative pt-40 pb-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-4">Real Results</p>
          <h1 className="font-['Bricolage_Grotesque'] text-[48px] lg:text-[60px] leading-[1.1] font-extrabold text-primary mb-6">
            Success Stories
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto font-medium">
            Discover how local businesses like yours are transforming their operations and accelerating growth with LocalBoost.
          </p>
        </div>
      </section>

      {/* SECTION 2: Stories Grid */}
      <section className="py-12 bg-surface-container-low flex-grow">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-primary/5 h-[400px] animate-pulse flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                    <div>
                      <div className="w-24 h-4 bg-slate-200 rounded mb-2"></div>
                      <div className="w-16 h-3 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                  <div className="h-20 bg-slate-200 rounded w-full mb-auto"></div>
                  <div className="h-10 bg-slate-200 rounded w-full mt-6"></div>
                </div>
              ))
            ) : stories.length > 0 ? (
              stories.map((story) => (
                <div key={story._id} className="bg-white p-8 rounded-[32px] shadow-sm border border-primary/5 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                  {story.featured && (
                    <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 font-bold text-[10px] uppercase tracking-widest rounded-full mb-6 self-start">
                      Featured Story
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                      {story.profileImage ? <img src={story.profileImage} alt={story.customerName} className="w-full h-full object-cover" /> : <span className="text-primary font-bold text-lg">{story.customerName.charAt(0)}</span>}
                    </div>
                    <div>
                      <h4 className="font-['Bricolage_Grotesque'] text-lg font-bold text-primary">{story.customerName}</h4>
                      <p className="font-ui text-sm text-[#1DB887] font-bold">{story.businessName}</p>
                    </div>
                  </div>
                  
                  <StarRating rating={story.rating} />
                  
                  {story.resultTitle && getLocalizedValue(story.resultTitle, language) && (
                    <h5 className="font-['Bricolage_Grotesque'] text-xl font-bold text-primary mt-6 mb-3">{getLocalizedValue(story.resultTitle, language)}</h5>
                  )}
                  
                  <p className="font-ui text-on-surface-variant leading-relaxed mb-8 flex-grow italic">"{getLocalizedValue(story.shortQuote, language)}"</p>
                  
                  <Link to={`/success-stories/${story._id}`} className="w-full bg-primary/5 hover:bg-primary text-primary hover:text-white px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 mt-auto">
                    <span>Read Full Story</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-primary/40 text-5xl">auto_stories</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">No Success Stories Yet</h3>
                <p className="text-on-surface-variant">Check back later for inspiring customer journeys.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: CTA */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-primary-container rounded-[48px] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-5xl font-bold text-white mb-8">Ready to Write Your Own Success Story?</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/business-setup" className="w-full sm:w-auto bg-[#1DB887] text-white px-10 py-5 rounded-[12px] font-bold text-lg hover:scale-105 transition-transform shadow-[0_8px_24px_rgba(29,184,135,0.30)]">Get Started</Link>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1DB887]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          </div>
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
