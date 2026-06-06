import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../i18n";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-surface text-on-background font-ui selection:bg-secondary-container selection:text-on-secondary-container">

      {/* SIDEBAR */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 border-r border-[#1B2A5E]/10 flex flex-col p-6 space-y-4 z-40">

        <div className="mb-8 px-2">
          <h1 className="font-['Bricolage_Grotesque'] font-bold text-[#1B2A5E] text-2xl tracking-tighter">
            LocalBoost
          </h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
            {t("userDashboard.businessPortal")}
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          <div className="flex items-center gap-3 bg-white text-[#1DB887] font-bold rounded-lg shadow-sm px-4 py-3">
            <span className="material-symbols-outlined">storefront</span>
            {t("userDashboard.sidebarServices")}
          </div>

          <div className="flex items-center gap-3 text-slate-600 hover:bg-slate-100 px-4 py-3 rounded-lg">
            <span className="material-symbols-outlined">business_center</span>
            {t("userDashboard.sidebarMyBusiness")}
          </div>

          <div className="flex items-center gap-3 text-slate-600 hover:bg-slate-100 px-4 py-3 rounded-lg">
            <span className="material-symbols-outlined">analytics</span>
            {t("userDashboard.sidebarAnalytics")}
          </div>

          <div className="flex items-center gap-3 text-slate-600 hover:bg-slate-100 px-4 py-3 rounded-lg">
            <span className="material-symbols-outlined">settings</span>
            {t("userDashboard.sidebarSettings")}
          </div>
        </nav>

        {/* LOGOUT */}
        <div className="pt-6 border-t border-[#1B2A5E]/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-slate-600 hover:text-red-500 px-4 py-3 rounded-lg w-full"
          >
            <span className="material-symbols-outlined">logout</span>
            {t("common.logout")}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="ml-64 min-h-screen">

        {/* HEADER */}
        <header className="sticky top-0 w-full z-30 bg-white/80 backdrop-blur-md px-10 py-6 flex justify-between items-center">

          <h2 className="font-['Bricolage_Grotesque'] text-2xl font-extrabold text-[#1B2A5E]">
            {t("userDashboard.browseServices")}
          </h2>

          <div className="flex items-center gap-6">

            {/* SEARCH */}
            <div className="relative w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2">
                search
              </span>
              <input
                className="w-full bg-surface-container-low border-none rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/40 text-sm"
                placeholder={t("userDashboard.searchServices")}
              />
            </div>

            {/* USER */}
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <span className="font-medium text-[#1B2A5E]">
                {user?.name || "User"}
              </span>
            </div>

          </div>
        </header>

        <div className="px-10 py-8 max-w-7xl mx-auto">

          {/* HERO */}
          <section className="mb-12 relative overflow-hidden rounded-[20px] bg-primary-container p-12 text-white">
            <p className="text-sm uppercase tracking-widest mb-3">
              {t("userDashboard.dashboardOverview")}
            </p>

            <h3 className="text-5xl font-bold mb-4">
              {t("userDashboard.goodMorning", { name: user?.name || "User" })}
            </h3>

            <p className="text-sm">
              {t("userDashboard.exploreOpportunities")}
            </p>
          </section>

          {/* SERVICES GRID (DUMMY DATA KEPT) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {[
              {
                title: t("homepage.serviceWebsiteTitle"),
                desc: t("userDashboard.serviceWebsiteDesc"),
              },
              {
                title: t("homepage.serviceSocialTitle"),
                desc: t("userDashboard.serviceSocialDesc"),
              },
              {
                title: t("homepage.servicePrintTitle"),
                desc: t("userDashboard.servicePrintDesc"),
              },
              {
                title: t("homepage.serviceGSTTitle"),
                desc: t("userDashboard.serviceGSTDesc"),
              },
              {
                title: t("homepage.serviceInventoryTitle"),
                desc: t("userDashboard.serviceInventoryDesc"),
              },
              {
                title: t("homepage.serviceAdTitle"),
                desc: t("userDashboard.serviceAdDesc"),
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-surface-container-lowest rounded-[16px] p-8 shadow hover:-translate-y-1 transition"
              >
                <h5 className="text-xl font-bold text-[#1B2A5E] mb-3">
                  {s.title}
                </h5>
                <p className="text-slate-500 text-sm mb-6">{s.desc}</p>

                <button className="text-[#1DB887] font-bold text-sm">
                  {t("userDashboard.readMoreArrow")}
                </button>
              </div>
            ))}

          </section>

        </div>

        {/* FOOTER */}
        <footer className="bg-slate-50 border-t py-8 text-center text-sm text-slate-500">
          {t("common.copyright")}
        </footer>

      </main>
    </div>
  );
}
