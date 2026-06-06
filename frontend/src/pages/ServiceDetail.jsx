import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getServiceById, getServices } from '../api/serviceApi';
import { useTranslation, getLocalizedValue } from '../i18n';
import formatCurrency from '../utils/formatCurrency';
import { formatDuration } from '../utils/formatters';
import LanguageToggle from '../components/LanguageToggle';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const serviceData = await getServiceById(id);
        setService(serviceData);

        if (serviceData && serviceData.category) {
          const allServices = await getServices();
          const related = allServices.filter(s => s.isActive && s.category === serviceData.category && s._id !== id).slice(0, 3);
          setRelatedServices(related);
        }
      } catch (err) {
        console.error("Failed to fetch service detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-primary font-bold tracking-widest uppercase text-sm animate-pulse">Loading Service...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="bg-surface min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-primary/40 text-5xl">error</span>
        </div>
        <h2 className="text-3xl font-bold text-primary mb-4">Service Not Found</h2>
        <p className="text-on-surface-variant max-w-md mx-auto mb-8">We couldn't find the service you're looking for. It may have been removed or the link might be broken.</p>
        <Link to="/services" className="bg-[#1DB887] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:opacity-90 transition-all">Explore All Services</Link>
      </div>
    );
  }

  return (
    <div className="bg-surface font-ui text-on-surface min-h-screen flex flex-col">
      <title>{getLocalizedValue(service.title, language)} | LocalBoost</title>

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
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-widest rounded-full mb-6">
              <span className="material-symbols-outlined text-[16px]">{service.icon || 'star'}</span>
              {service.category || 'Service'}
            </div>
            <h1 className="font-['Bricolage_Grotesque'] text-[48px] lg:text-[64px] leading-[1.1] font-extrabold text-primary mb-8">
              {getLocalizedValue(service.title, language)}
            </h1>
            <p className="text-xl text-on-surface-variant font-medium leading-relaxed">
              {getLocalizedValue(service.shortDescription, language)}
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10"></div>
      </section>

      {/* MAIN CONTENT DIVIDER */}
      <div className="max-w-7xl mx-auto px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-16 py-16 border-t border-primary/10">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-2/3 space-y-16">
            
            {/* SECTION 2: Service Overview */}
            <section>
              <h2 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-primary mb-6">Service Overview</h2>
              <div className="prose prose-lg text-on-surface-variant prose-headings:text-primary max-w-none">
                {getLocalizedValue(service.longDescription, language) ? (
                  <p className="leading-relaxed whitespace-pre-wrap">{getLocalizedValue(service.longDescription, language)}</p>
                ) : (
                  <p className="leading-relaxed">This service provides comprehensive digital solutions tailored for your business. Let our experts handle the heavy lifting so you can focus on what you do best.</p>
                )}
              </div>
            </section>

            {/* SECTION 3: Features */}
            {service.features && service.features.length > 0 && (
              <section>
                <h2 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-primary mb-6">What's Included</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-8 h-8 rounded-full bg-[#1DB887]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[#1DB887] text-[18px] font-bold">check</span>
                      </div>
                      <p className="font-medium text-on-surface-variant">{getLocalizedValue(feature, language)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION 5: Process Timeline */}
            <section className="bg-surface-container-low p-10 rounded-[32px] border border-primary/5">
              <div className="mb-10">
                <p className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-2">How it works</p>
                <h2 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-primary">Our Process</h2>
              </div>
              
              <div className="space-y-12 relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/10"></div>
                
                <div className="relative flex items-start">
                  <div className="absolute left-8 -translate-x-1/2 w-8 h-8 bg-white border-2 border-secondary rounded-full flex items-center justify-center z-10">
                    <span className="text-secondary font-bold text-xs">1</span>
                  </div>
                  <div className="pl-16">
                    <h4 className="text-xl font-bold text-primary mb-2">Consultation</h4>
                    <p className="text-on-surface-variant leading-relaxed">We learn about your business goals and current challenges to tailor the service specifically for you.</p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="absolute left-8 -translate-x-1/2 w-8 h-8 bg-white border-2 border-[#1DB887] rounded-full flex items-center justify-center z-10">
                    <span className="text-[#1DB887] font-bold text-xs">2</span>
                  </div>
                  <div className="pl-16">
                    <h4 className="text-xl font-bold text-primary mb-2">Setup</h4>
                    <p className="text-on-surface-variant leading-relaxed">Our experts begin the implementation process, keeping you updated every step of the way.</p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="absolute left-8 -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center z-10">
                    <span className="text-white font-bold text-xs">3</span>
                  </div>
                  <div className="pl-16">
                    <h4 className="text-xl font-bold text-primary mb-2">Launch</h4>
                    <p className="text-on-surface-variant leading-relaxed">We deploy the solution and provide you with all necessary tools to track your new growth.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT CONTENT (SIDEBAR) */}
          <div className="w-full lg:w-1/3">
            {/* SECTION 4: Pricing Card (Sticky) */}
            <div className="sticky top-32">
              <div className="bg-white rounded-[32px] p-8 shadow-[0_12px_40px_rgba(27,42,94,0.06)] border border-primary/5">
                <div className="mb-8">
                  {service.showPricePublicly !== false ? (
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-5xl font-black text-primary font-mono">{formatCurrency(service.price, service.currency)}</span>
                      <span className="text-on-surface-variant font-medium pb-2">/ {formatDuration(service.duration)}</span>
                    </div>
                  ) : (
                    <span className="text-3xl font-black text-primary">Custom Pricing</span>
                  )}
                  <p className="text-sm text-on-surface-variant">Includes all premium features for {service.category}</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-primary/5">
                    <span className="text-on-surface-variant">Category</span>
                    <span className="font-bold text-primary">{service.category || 'General'}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-primary/5">
                    <span className="text-on-surface-variant">Setup Time</span>
                    <span className="font-bold text-primary">~ 72 Hours</span>
                  </div>
                  {service.offerFreeTrial && (
                    <div className="flex justify-between items-center py-3 border-b border-primary/5">
                      <span className="text-on-surface-variant">Free Trial</span>
                      <span className="font-bold text-[#1DB887]">{service.trialDays} Days</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <Link to="/business-setup" className="w-full block text-center bg-primary text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    Get Started Now
                  </Link>
                  <Link to="/business-setup" className="w-full block text-center bg-primary/5 text-primary hover:bg-primary/10 px-6 py-4 rounded-xl font-bold transition-all">
                    Book Consultation
                  </Link>
                </div>
                <p className="text-xs text-center text-on-surface-variant mt-4">No credit card required for consultation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6: Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-24 bg-surface-container-low border-t border-primary/5">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-primary mb-12">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((relService) => (
                <div key={relService._id} className="bg-white p-8 rounded-[32px] shadow-sm border border-primary/5 hover:shadow-xl transition-all duration-300 flex flex-col group">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-2xl">{relService.icon || 'storefront'}</span>
                  </div>
                  <h4 className="font-['Bricolage_Grotesque'] text-xl font-bold text-primary mb-3">{getLocalizedValue(relService.title, language)}</h4>
                  <p className="font-ui text-sm text-on-surface-variant leading-relaxed mb-6 flex-grow">{getLocalizedValue(relService.shortDescription, language)}</p>
                  <Link to={`/service/${relService._id}`} className="text-secondary font-bold text-sm hover:underline flex items-center gap-1 mt-auto">
                    View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7: Final CTA */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-primary-container rounded-[48px] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-5xl font-bold text-white mb-8">Let's Build Your Digital Presence</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/business-setup" className="w-full sm:w-auto bg-[#1DB887] text-white px-10 py-5 rounded-[12px] font-bold text-lg hover:scale-105 transition-transform shadow-[0_8px_24px_rgba(29,184,135,0.30)]">Get Started</Link>
                <Link to="/business-setup" className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-10 py-5 rounded-[12px] font-bold text-lg hover:bg-white/5 transition-colors">Contact Team</Link>
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
          <div className="flex flex-wrap justify-center gap-8 font-ui text-xs text-[#1B2A5E] dark:text-slate-400">
            <a className="hover:text-[#1DB887] transition-colors cursor-pointer" href="#">{t("common.privacyPolicy")}</a>
            <a className="hover:text-[#1DB887] transition-colors cursor-pointer" href="#">{t("common.termsOfService")}</a>
            <a className="hover:text-[#1DB887] transition-colors cursor-pointer" href="#">{t("common.cookiePolicy")}</a>
            <a className="hover:text-[#1DB887] transition-colors cursor-pointer" href="#">{t("common.support")}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
