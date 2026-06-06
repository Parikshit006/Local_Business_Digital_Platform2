import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getServices } from '../api/serviceApi';
import { useTranslation, getLocalizedValue } from '../i18n';
import formatCurrency from '../utils/formatCurrency';
import { formatDuration } from '../utils/formatters';
import LanguageToggle from '../components/LanguageToggle';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { t, language } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        const active = data.filter(s => s.isActive);
        setServices(active);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = ['All', ...new Set(services.map(s => s.category).filter(Boolean))];

  const filteredServices = services.filter(service => {
    const titleMatch = getLocalizedValue(service.title, language).toLowerCase().includes(searchTerm.toLowerCase());
    const desc = getLocalizedValue(service.shortDescription, language);
    const descMatch = desc && desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || descMatch;
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-surface font-ui text-on-surface min-h-screen flex flex-col">
      <title>Services | LocalBoost</title>

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
      <section className="relative pt-32 pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="font-['Bricolage_Grotesque'] text-[48px] lg:text-[60px] leading-[1.1] font-extrabold text-primary mb-6">
            Explore Our Services
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 font-medium">
            Discover digital solutions designed to help local businesses grow faster and operate smarter.
          </p>
          
          <div className="max-w-xl mx-auto relative mb-6">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-[16px] bg-white border border-primary/10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1DB887] focus:border-transparent text-primary transition-all font-medium text-lg"
            />
          </div>
          {!loading && (
            <p className="text-sm font-bold text-secondary tracking-widest uppercase">
              {filteredServices.length} Services Available
            </p>
          )}
        </div>
      </section>

      {/* SECTION 2: Category Filters */}
      <section className="py-6 border-y border-primary/5 bg-white sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 pt-2 items-center justify-start md:justify-center">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${selectedCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-primary/5 hover:text-primary'}`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Services Grid */}
      <section className="py-20 bg-surface-container-low flex-grow">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-10 rounded-[32px] shadow-sm border border-primary/5 h-[380px] animate-pulse flex flex-col">
                  <div className="w-14 h-14 bg-slate-200 rounded-2xl mb-6"></div>
                  <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-auto"></div>
                  <div className="h-10 bg-slate-200 rounded w-full mt-6"></div>
                </div>
              ))
            ) : filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div key={service._id} className="bg-white p-10 rounded-[32px] shadow-sm border border-primary/5 hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
                  <div className="absolute top-6 right-6 px-3 py-1 bg-secondary/10 text-secondary font-bold text-[10px] uppercase tracking-widest rounded-full">
                    {service.category || 'Service'}
                  </div>
                  
                  <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/10 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl">{service.icon || 'storefront'}</span>
                  </div>
                  
                  <h4 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-primary mb-3">{getLocalizedValue(service.title, language)}</h4>
                  <p className="font-ui text-on-surface-variant leading-relaxed mb-6 flex-grow">{getLocalizedValue(service.shortDescription, language)}</p>
                  
                  <div className="border-t border-primary/5 pt-6 mt-auto">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        {service.showPricePublicly !== false ? (
                          <>
                            <span className="text-3xl font-black text-primary font-mono">{formatCurrency(service.price, service.currency)}</span>
                            <span className="text-xs text-on-surface-variant ml-1 font-medium">/ {formatDuration(service.duration)}</span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-primary">Custom Pricing</span>
                        )}
                      </div>
                    </div>
                    <Link to={`/service/${service._id}`} className="w-full bg-primary/5 hover:bg-primary text-primary hover:text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2">
                      <span>{t("common.readMore")}</span>
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-primary/40 text-5xl">search_off</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">No services found</h3>
                <p className="text-on-surface-variant">Try adjusting your search or category filter to find what you're looking for.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="mt-6 text-secondary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 4: Why Choose LocalBoost */}
      <section className="py-24 bg-white border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-4">The LocalBoost Advantage</p>
            <h2 className="font-['Bricolage_Grotesque'] text-4xl font-bold text-primary">Why Choose LocalBoost</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-2 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
              </div>
              <h4 className="font-bold text-lg text-primary mb-2">Fast Setup</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">Go from offline to online in under 72 hours with our automated setup engines.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-2 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">support_agent</span>
              </div>
              <h4 className="font-bold text-lg text-primary mb-2">Expert Support</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">24/7 dedicated support team to help you navigate your digital transformation.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-2 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">savings</span>
              </div>
              <h4 className="font-bold text-lg text-primary mb-2">Affordable Pricing</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">Enterprise-grade solutions priced specifically for local business budgets.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:-translate-y-2 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">monitoring</span>
              </div>
              <h4 className="font-bold text-lg text-primary mb-2">Scalable Solutions</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">Tools that grow with you, from your first online sale to a full digital empire.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Call To Action */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-primary-container rounded-[48px] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-5xl font-bold text-white mb-8">Ready To Grow Your Business?</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/business-setup" className="w-full sm:w-auto bg-[#1DB887] text-white px-10 py-5 rounded-[12px] font-bold text-lg hover:scale-105 transition-transform shadow-[0_8px_24px_rgba(29,184,135,0.30)]">Get Started</Link>
                <Link to="/business-setup" className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-10 py-5 rounded-[12px] font-bold text-lg hover:bg-white/5 transition-colors">Contact Us</Link>
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
