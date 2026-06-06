import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation, getLocalizedValue } from '../i18n';
import LanguageToggle from '../components/LanguageToggle';
import { getServices } from '../api/serviceApi';
import { getHomepageTestimonials } from '../api/testimonialApi';


export default function LocalBoostHomepage() {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { t, language } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        const active = data.filter(s => s.isActive).slice(0, 6);
        setServices(active);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoadingServices(false);
      }
    };
    
    const fetchTestimonials = async () => {
      try {
        const data = await getHomepageTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      } finally {
        setLoadingTestimonials(false);
      }
    };

    fetchServices();
    fetchTestimonials();
  }, []);

  const getCardWidth = () => {
    if (scrollContainerRef.current && scrollContainerRef.current.children.length > 0) {
      return scrollContainerRef.current.children[0].offsetWidth + 32;
    }
    return 400; // fallback
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollPos = scrollContainerRef.current.scrollLeft;
      const index = Math.round(scrollPos / getCardWidth());
      setActiveIndex(index);
    }
  };

  const scrollToDot = (index) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: index * getCardWidth(), behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
        if (scrollContainerRef.current.scrollLeft >= maxScroll - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRight();
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="bg-surface font-ui text-on-surface">




      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <title>{t("homepage.title")}</title>

      <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&amp;family=Inter:wght@300;400;500;600;700&amp;family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&amp;display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />


      {/*  Top Navigation Shell  */}
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
      {/*  Hero Section  */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-surface">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/*  Left Content  */}
          <div className="lg:col-span-7">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
              {t("homepage.heroBadge")}
            </span>
            <h1 className="font-['Bricolage_Grotesque'] text-[60px] leading-[1.1] font-extrabold text-primary mb-8">
              {t("homepage.heroTitle")}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl mb-12 font-medium">
              {t("homepage.heroSubtitle")}
            </p>
            <div className="flex flex-wrap gap-12">
              <div>
                <p className="text-4xl font-bold text-primary font-mono">12k+</p>
                <p className="text-xs font-bold text-outline tracking-wider uppercase mt-1">{t("homepage.vendorsActive")}</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary font-mono">94%</p>
                <p className="text-xs font-bold text-outline tracking-wider uppercase mt-1">{t("homepage.growthRate")}</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary font-mono">24/7</p>
                <p className="text-xs font-bold text-outline tracking-wider uppercase mt-1">{t("homepage.expertSupport")}</p>
              </div>
            </div>
          </div>
          {/*  Right: Dashboard Mockup  */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-[24px] shadow-[0_12px_40px_rgba(27,42,94,0.10)] overflow-hidden border border-primary/5">
              {/*  Dashboard Header  */}
              <div className="p-6 bg-primary text-white flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center">
                    <span className="text-primary font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t("homepage.welcomeArjun")}</p>
                    <p className="text-[10px] opacity-70">{t("homepage.businessDashboard")}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-white/80">notifications</span>
              </div>
              {/*  Dashboard Content  */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-primary/5">
                    <span className="material-symbols-outlined text-secondary mb-2" data-icon="language">language</span>
                    <p className="text-xs font-bold text-primary">{t("homepage.websiteBuilder")}</p>
                    <p className="text-[10px] text-outline">{t("homepage.liveSyncing")}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-primary/5">
                    <span className="material-symbols-outlined text-secondary mb-2" data-icon="share">share</span>
                    <p className="text-xs font-bold text-primary">{t("homepage.socialMedia")}</p>
                    <p className="text-[10px] text-outline">{t("homepage.activeCampaigns")}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-primary/5">
                    <span className="material-symbols-outlined text-secondary mb-2" data-icon="print">print</span>
                    <p className="text-xs font-bold text-primary">{t("homepage.printMedia")}</p>
                    <p className="text-[10px] text-outline">{t("homepage.designReady")}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-primary/5">
                    <span className="material-symbols-outlined text-secondary mb-2" data-icon="description">description</span>
                    <p className="text-xs font-bold text-primary">{t("homepage.gstFiling")}</p>
                    <p className="text-[10px] text-outline">{t("homepage.upToDate")}</p>
                  </div>
                </div>
                {/*  Status Bar  */}
                <div className="bg-tertiary-fixed/20 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                    <p className="text-[11px] font-bold text-tertiary">{t("homepage.businessesAwaitingApproval")}</p>
                  </div>
                  <span className="material-symbols-outlined text-tertiary text-sm" data-icon="chevron_right">chevron_right</span>
                </div>
              </div>
            </div>
            {/*  Decoy element to break grid symmetry  */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>
      {/*  Stats Strip  */}
      <section className="bg-primary-container py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-white mb-2 font-mono">97%</h3>
              <p className="text-on-primary-container text-sm font-medium">{t("homepage.statsCustomerSuccess")}</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-white mb-2 font-mono">78%</h3>
              <p className="text-on-primary-container text-sm font-medium">{t("homepage.statsFasterSetup")}</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-white mb-2 font-mono">3.5x</h3>
              <p className="text-on-primary-container text-sm font-medium">{t("homepage.statsROI")}</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-white mb-2 font-mono">$4.2T</h3>
              <p className="text-on-primary-container text-sm font-medium">{t("homepage.statsMarket")}</p>
            </div>
          </div>
        </div>
      </section>
      {/*  Problem Section  */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-20">
            <p className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-4">{t("homepage.problemLabel")}</p>
            <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-5xl font-bold text-primary max-w-2xl">{t("homepage.problemTitle")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low p-10 rounded-[24px] hover:bg-white transition-colors duration-300">
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary" data-icon="cloud_off">cloud_off</span>
              </div>
              <h4 className="text-xl font-bold text-primary mb-4">{t("homepage.problemVisibilityTitle")}</h4>
              <p className="text-on-surface-variant leading-relaxed">{t("homepage.problemVisibilityDesc")}</p>
            </div>
            <div className="bg-surface-container-low p-10 rounded-[24px] hover:bg-white transition-colors duration-300">
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary" data-icon="construction">construction</span>
              </div>
              <h4 className="text-xl font-bold text-primary mb-4">{t("homepage.problemTechTitle")}</h4>
              <p className="text-on-surface-variant leading-relaxed">{t("homepage.problemTechDesc")}</p>
            </div>
            <div className="bg-surface-container-low p-10 rounded-[24px] hover:bg-white transition-colors duration-300">
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary" data-icon="payments">payments</span>
              </div>
              <h4 className="text-xl font-bold text-primary mb-4">{t("homepage.problemComplianceTitle")}</h4>
              <p className="text-on-surface-variant leading-relaxed">{t("homepage.problemComplianceDesc")}</p>
            </div>
            <div className="bg-surface-container-low p-10 rounded-[24px] hover:bg-white transition-colors duration-300">
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary" data-icon="campaign">campaign</span>
              </div>
              <h4 className="text-xl font-bold text-primary mb-4">{t("homepage.problemMarketingTitle")}</h4>
              <p className="text-on-surface-variant leading-relaxed">{t("homepage.problemMarketingDesc")}</p>
            </div>
          </div>
        </div>
      </section>
      {/*  Services Section  */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <p className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-4">{t("homepage.servicesLabel")}</p>
              <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-5xl font-bold text-primary">{t("homepage.servicesTitle")}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingServices ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-10 rounded-[32px] shadow-sm border border-primary/5 h-[340px] animate-pulse flex flex-col">
                  <div className="w-14 h-14 bg-slate-200 rounded-2xl mb-8 flex-shrink-0"></div>
                  <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-auto"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/4 mt-8"></div>
                </div>
              ))
            ) : services.length > 0 ? (
              services.map((service) => (
                <div key={service._id} className="bg-white p-10 rounded-[32px] shadow-sm border border-primary/5 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-3xl">{service.icon || 'storefront'}</span>
                  </div>
                  <h4 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-primary mb-4">{getLocalizedValue(service.title, language)}</h4>
                  <p className="font-ui text-on-surface-variant leading-relaxed mb-8 flex-grow">{getLocalizedValue(service.shortDescription, language)}</p>
                  <Link to={`/service/${service._id}`} className="flex items-center text-secondary font-bold cursor-pointer group mt-auto">
                    <span className="text-sm">{t("common.readMore")}</span>
                    <span className="material-symbols-outlined ml-2 group-hover:translate-x-2 transition-transform text-lg" data-icon="arrow_forward">arrow_forward</span>
                  </Link>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-on-surface-variant font-medium py-10">No services available right now.</p>
            )}
          </div>
          
          <div className="mt-16 flex justify-center">
            <Link to="/services" className="bg-[#1DB887] text-white px-10 py-5 rounded-[12px] font-bold text-lg hover:scale-105 transition-transform shadow-[0_8px_24px_rgba(29,184,135,0.30)] flex items-center gap-2">
              {t("common.viewAll")}
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
      {/*  How It Works (Vertical Timeline)  */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <p className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-4">{t("homepage.processLabel")}</p>
            <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-5xl font-bold text-primary">{t("homepage.processTitle")}</h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            {/*  Vertical Line  */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-primary/10 -translate-x-1/2"></div>
            <div className="space-y-32">
              {/*  Step 1  */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center">
                <div className="md:w-1/2 md:pr-24 text-left md:text-right order-2 md:order-1 mt-8 md:mt-0">
                  <h4 className="text-2xl font-bold text-primary mb-4">{t("homepage.step1Title")}</h4>
                  <p className="text-on-surface-variant">{t("homepage.step1Desc")}</p>
                </div>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-4 border-primary rounded-full flex items-center justify-center z-10 order-1">
                  <span className="text-primary font-bold text-xl">01</span>
                </div>
                <div className="md:w-1/2 md:pl-24 order-3"></div>
              </div>
              {/*  Step 2  */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center">
                <div className="md:w-1/2 md:pr-24 order-2 md:order-1 mt-8 md:mt-0"></div>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-4 border-secondary rounded-full flex items-center justify-center z-10 order-1">
                  <span className="text-secondary font-bold text-xl">02</span>
                </div>
                <div className="md:w-1/2 md:pl-24 text-left order-3">
                  <h4 className="text-2xl font-bold text-primary mb-4">{t("homepage.step2Title")}</h4>
                  <p className="text-on-surface-variant">{t("homepage.step2Desc")}</p>
                </div>
              </div>
              {/*  Step 3  */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center">
                <div className="md:w-1/2 md:pr-24 text-left md:text-right order-2 md:order-1 mt-8 md:mt-0">
                  <h4 className="text-2xl font-bold text-primary mb-4">{t("homepage.step3Title")}</h4>
                  <p className="text-on-surface-variant">{t("homepage.step3Desc")}</p>
                </div>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center z-10 order-1">
                  <span className="font-bold text-xl">03</span>
                </div>
                <div className="md:w-1/2 md:pl-24 order-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  Real Results (Carousel Section)  */}
      <section className="py-[128px] bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div className="max-w-xl">
              <p className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-4">{t("homepage.resultsLabel")}</p>
              <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-5xl font-bold text-primary mb-4">{t("homepage.resultsTitle")}</h2>
              <p className="text-on-surface-variant font-medium">{t("homepage.resultsSubtitle")}</p>
            </div>
            <div className="flex space-x-4 mt-8 md:mt-0">
              <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300" onClick={scrollLeft}><span className="material-symbols-outlined">arrow_back</span></button>
              <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300" onClick={scrollRight}><span className="material-symbols-outlined">arrow_forward</span></button>
            </div>
          </div>
          <div className="flex gap-8 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-12" id="results-carousel" ref={scrollContainerRef} onScroll={handleScroll} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {loadingTestimonials ? (
              <div className="w-full text-center text-primary/50 font-bold py-10 animate-pulse">Loading Success Stories...</div>
            ) : testimonials.length > 0 ? (
              testimonials.map((item) => (
                <div key={item._id} className="min-w-[400px] bg-white rounded-[32px] border border-primary/5 shadow-sm hover:-translate-y-2 transition-transform duration-300 snap-start flex flex-col h-full overflow-hidden">
                  <div className="p-8 space-y-6 flex-grow flex flex-col">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                        {item.profileImage ? <img alt={item.customerName} className="w-full h-full object-cover" src={item.profileImage} /> : <span className="text-xl font-bold text-primary">{item.customerName.charAt(0)}</span>}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-bold text-primary text-lg">{item.customerName}</p>
                        </div>
                        <p className="text-sm text-[#1DB887] font-bold">{item.businessName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className={`material-symbols-outlined text-[18px] ${i <= item.rating ? 'text-amber-400' : 'text-primary/10'}`} style={{ fontVariationSettings: i <= item.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                      ))}
                    </div>

                    <div className="bg-surface-container-low p-6 rounded-2xl relative flex-grow mt-4">
                      <span className="material-symbols-outlined absolute top-4 left-4 text-secondary/10 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                      <p className="italic text-base text-on-surface-variant leading-relaxed relative z-10 pt-4">"{getLocalizedValue(item.shortQuote, language)}"</p>
                      
                      {item.resultTitle && getLocalizedValue(item.resultTitle, language) && (
                        <div className="mt-6 inline-flex items-center bg-[#1DB887]/10 px-4 py-2 rounded-xl border border-[#1DB887]/20">
                          <span className="text-sm font-bold text-[#1DB887]">{getLocalizedValue(item.resultTitle, language)}</span>
                        </div>
                      )}
                    </div>

                    <Link to={`/success-stories/${item._id}`} className="mt-6 w-full bg-primary/5 hover:bg-primary text-primary hover:text-white px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2">
                      <span>Read Story</span>
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-primary/50 font-medium py-10">Success stories are being updated. Check back soon.</div>
            )}
          </div>
          {/*  Indicators  */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            {!loadingTestimonials && testimonials.map((_, i) => (
              <div
                key={i}
                onClick={() => scrollToDot(i)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${activeIndex === i ? 'w-8 bg-primary' : 'w-2 bg-primary/20'
                  }`}
              ></div>
            ))}
          </div>
        </div>
      </section>
      {/*  USP & Proof Section  */}
      <section className="py-32 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-secondary-fixed font-bold text-xs tracking-[0.2em] uppercase mb-6">{t("homepage.uspLabel")}</p>
            <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-5xl font-bold mb-10">{t("homepage.uspTitle")}</h2>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-primary text-xs" data-icon="check">check</span>
                </div>
                <p className="text-lg">{t("homepage.uspDashboard")}</p>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-primary text-xs" data-icon="check">check</span>
                </div>
                <p className="text-lg">{t("homepage.uspNoTech")}</p>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-primary text-xs" data-icon="check">check</span>
                </div>
                <p className="text-lg">{t("homepage.uspMarketing")}</p>
              </li>
              <li className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-primary text-xs" data-icon="check">check</span>
                </div>
                <p className="text-lg">{t("homepage.uspGST")}</p>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[40px] border border-white/10">
              <h4 className="text-2xl font-bold mb-8">{t("homepage.uspImpactTitle")}</h4>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-white/80">{t("homepage.uspAvgROI")}</span>
                    <span className="font-bold text-secondary-fixed">{t("homepage.uspROIValue")}</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary-fixed w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-white/80">{t("homepage.uspRevenueGrowth")}</span>
                    <span className="font-bold text-secondary-fixed">{t("homepage.uspRevenueValue")}</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary-fixed w-[60%]"></div>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full border-2 border-primary bg-slate-300">
                      <img className="w-full h-full rounded-full object-cover" data-alt="Portrait of a smiling mature small business owner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Dtj2nM0lz2ufWFhANqvV76-NUOv5W0o8HUISBoR3uJbush_QlRAKRp002hrcxmWu231aPVtWaRVqCe9QqyvuiosJlU5qljAPB6Bmke_CVXe-9Bm8X50zdPWBztZSX9z_ziqF1pG2Hx754Mr8wDFi9AWW1qrFiiJwPO5Rg9OkoyqidVHAgFRb7ae0SHVZiW0kYSzSbqKDp8fmWAmBSYrlnCjuP1XB53WW0JdGaZ4H76kgG4JV9yBU8086XWPIurtRbrOkpk9p1iI" />
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-primary bg-slate-300">
                      <img className="w-full h-full rounded-full object-cover" data-alt="Portrait of a young entrepreneur woman" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYut7ihiO_EJaZJoOHwdMyeFy3TpbH2nBzGgv0bBpzs4plJ4dztNFgsydxg6McyPHYdynj4j_ll_Htmnimx0DuXG-5eUZ2kM8r4HDGLTxFJWU4vr1n40zjS-FTMh_XL4Wnz0T7XKUHRmmAI9BQdb82Jlkd2oFxP7DhxcrP3p0BOqxTdW09SU8Msg8HSn4SnBPkNzpgbNUDpnQE4hnMHy2aaFZksAcCqn1agVUzVz5SMaIX8NJS0oRRDymS3q4-nQTDj71nsmuuOmw" />
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-primary bg-slate-300">
                      <img className="w-full h-full rounded-full object-cover" data-alt="Portrait of a friendly male professional" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4N9CN8Uh_XTNchJWMn3NWUkvXt_HlQnqMVtuyDOt-KbwVI5kBC1b1csXxkDYzmI7vmFhnnBdAIo5nQr-BZtxHl4J2jNiUVIJYuEKb0RC4Eqf1Rz9BnW918UghybszmUrNrCFSQN2xpa4DrekHFg6kQ04D6QCCcMvAHAATHn5zHksc0XdvzQ_tfFIPdiu7MvFpXLVQVT7pzz5xcERSBMMAuLQWumZ92bQlzsKxbbt4RzdgSpMaijMps-1T38aOVXMUWBCjgCBtvWw" />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-white/60 uppercase tracking-widest">{t("homepage.uspTrustedBy")}</p>
                </div>
              </div>
            </div>
            {/*  Abstract floating orb  */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/30 rounded-full blur-[80px] -z-10"></div>
          </div>
        </div>
      </section>
      {/*  CTA Section  */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-primary-container rounded-[48px] p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-['Bricolage_Grotesque'] text-4xl lg:text-6xl font-bold text-white mb-8">{t("homepage.ctaTitle")}</h2>
              <p className="text-on-primary-container text-xl max-w-2xl mx-auto mb-12">{t("homepage.ctaSubtitle")}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/business-setup" className="w-full sm:w-auto bg-[#1DB887] text-white px-10 py-5 rounded-[12px] font-bold text-lg hover:scale-105 transition-transform shadow-[0_8px_24px_rgba(29,184,135,0.30)]">{t("homepage.ctaButton")}</Link>
                <Link to="/business-setup" className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-10 py-5 rounded-[12px] font-bold text-lg hover:bg-white/5 transition-colors">{t("homepage.ctaTalk")}</Link>
              </div>
            </div>
            {/*  Background decorative shapes  */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1DB887]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          </div>
        </div>
      </section>
      {/*  Footer  */}
      <footer className="bg-slate-50 dark:bg-[#0F1A3D] w-full py-12 px-8 border-t border-[#1B2A5E]/10">
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
