import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getTestimonialById } from '../api/testimonialApi';
import { useTranslation, getLocalizedValue } from '../i18n';
import LanguageToggle from '../components/LanguageToggle';

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`material-symbols-outlined text-[24px] ${i <= rating ? 'text-amber-400' : 'text-primary/20'}`}
          style={{ fontVariationSettings: i <= rating ? "'FILL' 1" : "'FILL' 0" }}
        >star</span>
      ))}
    </div>
  );
}

export default function SuccessStoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await getTestimonialById(id);
        setStory(data);
      } catch (err) {
        console.error("Failed to load story:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!story || !story.published) {
    return (
      <div className="bg-surface min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Story Not Found</h2>
        <Link to="/success-stories" className="text-[#1DB887] font-bold hover:underline">Back to Success Stories</Link>
      </div>
    );
  }

  return (
    <div className="bg-surface font-ui text-on-surface min-h-screen flex flex-col">
      <title>{story.businessName} Success Story | LocalBoost</title>

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

      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Link to="/success-stories" className="inline-flex items-center text-white/60 hover:text-white text-sm font-bold mb-8 transition-colors">
              <span className="material-symbols-outlined text-[16px] mr-2">arrow_back</span> Back to Stories
            </Link>
            
            <h1 className="font-['Bricolage_Grotesque'] text-[48px] lg:text-[64px] leading-[1.1] font-extrabold mb-8">
              {story.businessName}
            </h1>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-white/10 overflow-hidden flex flex-shrink-0 items-center justify-center">
                {story.profileImage ? <img src={story.profileImage} alt={story.customerName} className="w-full h-full object-cover" /> : <span className="text-3xl font-bold">{story.customerName.charAt(0)}</span>}
              </div>
              <div>
                <p className="text-xl font-bold">{story.customerName}</p>
                <p className="text-white/60 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[16px]">location_on</span> {story.city || 'Local Business'}
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 inline-block">
              <p className="text-xs text-white/50 font-bold uppercase tracking-widest mb-2">Customer Rating</p>
              <StarRating rating={story.rating} />
            </div>
          </div>
          
          {story.resultTitle && getLocalizedValue(story.resultTitle, language) && (
            <div className="bg-white text-primary p-12 rounded-[32px] shadow-2xl relative">
              <span className="material-symbols-outlined absolute top-8 right-8 text-secondary/20 text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
              <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-4">Results Achieved</p>
              <h3 className="font-['Bricolage_Grotesque'] text-4xl font-bold mb-6">{getLocalizedValue(story.resultTitle, language)}</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed">{getLocalizedValue(story.resultDescription, language)}</p>
            </div>
          )}
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 -skew-x-12 translate-x-1/4 -z-10 blur-3xl"></div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-8">
          <div className="bg-surface-container-lowest p-12 rounded-[40px] shadow-[0_12px_40px_rgba(27,42,94,0.06)] border border-primary/5 -mt-32 relative z-20 mb-16">
            <span className="material-symbols-outlined absolute -top-8 left-12 text-[#1DB887] text-6xl bg-white rounded-full p-2 shadow-lg" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-primary mb-8 pt-4 leading-relaxed">
              "{getLocalizedValue(story.shortQuote, language)}"
            </h2>
            <div className="prose prose-lg text-on-surface-variant max-w-none prose-p:leading-relaxed">
              {getLocalizedValue(story.fullStory, language) ? (
                <p className="whitespace-pre-wrap">{getLocalizedValue(story.fullStory, language)}</p>
              ) : (
                <p>No full story provided yet for this testimonial.</p>
              )}
            </div>
          </div>

          {/* Service Link */}
          {story.serviceId && (
            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-primary/60 font-bold text-xs uppercase tracking-widest mb-2">Service Used</p>
                <h4 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-primary">{getLocalizedValue(story.serviceId.title, language)}</h4>
              </div>
              <Link to={`/service/${story.serviceId._id}`} className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:-translate-y-1 transition-transform whitespace-nowrap">
                View Service Details
              </Link>
            </div>
          )}
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
