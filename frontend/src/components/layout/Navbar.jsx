import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../../i18n';

export default function Navbar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const pageTitles = {
    '/admin/commandcentre': { title: t("commandcentre.businessManagementTitle"), subtitle: t("commandcentre.businessManagementSubtitle") },
    '/admin/commandcentre/businesses': { title: t("commandcentre.businessManagementTitle"), subtitle: t("commandcentre.businessManagementSubtitle") },
    '/admin/commandcentre/testimonials': { title: t("commandcentre.testimonialsTitle"), subtitle: t("commandcentre.testimonialsSubtitle") },
    '/admin/commandcentre/emailing': { title: t("commandcentre.emailingTitle"), subtitle: t("commandcentre.emailingSubtitle") },
    '/admin/commandcentre/emailing/create-template': { title: t("commandcentre.templateEditorTitle"), subtitle: t("commandcentre.templateEditorSubtitle") },
    '/admin/commandcentre/settings': { title: t("commandcentre.settingsTitle"), subtitle: t("commandcentre.settingsSubtitle") },
  };

  const page = pageTitles[pathname] || { title: t("commandcentre.defaultTitle"), subtitle: t("commandcentre.defaultSubtitle") };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-10 py-6 border-b border-surface-container shadow-sm">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-primary tracking-tight">{page.title}</h1>
          <p className="text-[11px] font-bold text-[#1DB887] uppercase tracking-[0.2em] mt-1">{page.subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-primary/10">
            <div className="w-10 h-10 rounded-xl bg-[#1DB887] flex items-center justify-center font-['Bricolage_Grotesque'] font-black text-white text-sm">A</div>
            <div>
              <p className="text-sm font-bold text-primary">{t("commandcentre.adminUser")}</p>
              <p className="text-[11px] text-primary/40">{t("commandcentre.superAdmin")}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
