import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getServices,
  createService,
  deleteService,
} from "../api/serviceApi";
import { useTranslation } from "../i18n";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { tab } = useParams();

  const activeTab = tab || "overview";

  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
  
  // -- NEW USER MANAGEMENT STATE --
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [userSearch, setUserSearch] = useState("");
  const [userFilter, setUserFilter] = useState("all"); // all, pending, approved, active

  const DUMMY_USERS = [
    {
      id: 1,
      businessName: "Green Leaf Cafe",
      ownerName: "Elena Rodriguez",
      email: "elena@greenleaf.com",
      phone: "+91 98765 43210",
      category: "Organic Food",
      status: "approved",
      active: true,
      plan: "Growth",
      lastActive: "2 hours ago",
      services: ["Website Builder", "Digital Marketing"],
      features: {
        analytics: true,
        scheduler: true,
        chat: true,
        emailCampaign: false
      },
      showPricing: true,
      notes: "High potential for loyalty module upsell.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4Is56u9NAQGK9pNlgL5eCaAPXDfQY7r6uSwtYQaiHhBYnyoFWACLL0PLU8BHOdrjVhb0TdjG_ODw6JmLU2RUTVysMxu8sdeQL1nq-HhFQEvChUHYUBeoalRqALtiS-RD7s2vOUCSuA5gHkIFUmoQOZu3lsLSvFsWKie3P6M3Gx1-tuJluThY_RxuXmULmOlauKt8Mn2ey-T1WNW3-3YHZYkcQRoJmNJi-QoZYziogxYuwdaPCbbBAthCgxglzE9xFSVxCT7s2Eqc"
    },
    {
      id: 2,
      businessName: "City Tech Solutions",
      ownerName: "Marcus Chen",
      email: "marcus@citytech.in",
      phone: "+91 91234 56789",
      category: "IT Services",
      status: "pending",
      active: true,
      plan: "Basic",
      lastActive: "14 mins ago",
      services: ["Standard Sync"],
      features: {
        analytics: true,
        scheduler: false,
        chat: false,
        emailCampaign: false
      },
      showPricing: false,
      notes: "Awaiting documents for final approval.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6Fu8vt93HVMj0ZXJjAMQqeQj82yIjsuWwytnURFaPE-VW__skJTtrd25K6GYmjY9ctep34grmb8c9LG0dzuNwUGzm6c9jTauvjh2GurrgVoU-7lfi_5aSI49cClahGAgbhdvVzTDQ8sTbfbY7Wc8jQqXP4dI6C8afRZ6vn3yndglHB2NLRaKSqqZypF2Bl6hyym5U5hq7__2-bl0vP_4tU5opxZnX0IMRCMxmw8D2hn41j2EIPxXdmBCu11cd7-AgiKswqkdlMSo"
    },
    {
      id: 3,
      businessName: "Urban Paws Grooming",
      ownerName: "Sarah Jenkins",
      email: "sarah@urbanpaws.com",
      phone: "+91 99887 76655",
      category: "Pet Care",
      status: "approved",
      active: false,
      plan: "Premium",
      lastActive: "3 days ago",
      services: ["Growth Bundle", "Social Media"],
      features: {
        analytics: true,
        scheduler: true,
        chat: true,
        emailCampaign: true
      },
      showPricing: true,
      notes: "Account disabled temporarily per owner request.",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUzGdMAiOeshY0pRx5ADCMCcGL-3xdLmYCiNPaPtTLe9K92Y21M15KfY5kV8yAijarLBcUtY1_7WUXxHnbqlEubIxzIXD_pYT9u9Vutjnkb7oVAhlrbt-wYSdh04cFPlI7jmWfBbwEh-l_L8jTzKDMCiMlO8l1yvuUSV1JPO-xyULrmLWo2cfdPAYk9s_voI_N8zSCA7_-_xD2IQIShm6DWlEmxpcOP5OqKceg2uyMCiXx2Dh_JsbtCwNM7haI1Hcf6Q_AYbyUa08"
    }
  ];

  const selectedBusiness = DUMMY_USERS.find(u => u.id === selectedUserId) || DUMMY_USERS[0];

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    price: "",
    duration: "monthly",
    features: "",
    category: "",
    isActive: true,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    if (activeTab === "services") fetchServices();
  }, [activeTab]);

  const fetchServices = async () => {
    const data = await getServices();
    setServices(data);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await deleteService(id, token);
    fetchServices();
  };

  const handleCreate = async () => {
    const token = localStorage.getItem("token");

    await createService(
      {
        ...form,
        features: form.features.split(","),
      },
      token
    );

    setShowForm(false);
    fetchServices();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const tabs = [
    { id: "overview", label: t("admin.overview"), icon: "dashboard" },
    { id: "verification", label: t("admin.verifyBusinesses"), icon: "verified_user" },
    { id: "services", label: t("admin.manageServices"), icon: "list_alt" },
    { id: "users", label: t("admin.users"), icon: "group" },
  ];

  const currentTabLabel = tabs.find(t => t.id === activeTab)?.label || "Dashboard";

  return (
    <div className="bg-surface font-ui text-on-background antialiased min-h-screen">
      {/* SideNavBar (Admin Control) */}
      <aside className="h-screen w-72 fixed left-0 top-0 bg-[#0F1A3D] text-white shadow-2xl flex flex-col py-10 px-6 z-50">
        <div className="mb-12">
          <span className="font-['Bricolage_Grotesque'] font-black text-[#1DB887] text-2xl tracking-tighter">LocalBoost</span>
          <div className="mt-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border border-white/10 overflow-hidden">
                 {user?.name ? (
                     <div className="font-bold text-lg text-white">{user.name.charAt(0).toUpperCase()}</div>
                 ) : (
                    <img 
                      alt="Admin Avatar" 
                      className="rounded-full w-full h-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1reNdQIg-JytzY4WUmSnOo7iGAjol5cODZ9Z_C5bGeIWCuB5C4m7Ptsr2taLwmK8go272DO0HvnZKRV9ZUB94CGrcwIJWnxTKeJsbXSwRJFAD0aZLmszU8OMpFUU_V5wYMEp0PZrriNCT46MVP38eMBthg4DX_8QMPDeW7LR4MtVIIa1WGxZDfZIY9IqKoOkop_xLb-OkL2t3BUNy09FLvDgpiffDMRpwJ9f_lGrIL6pbxzGcSUldA6CLANQ2C5564Q9ZNSK6Ak0"
                    />
                 )}
            </div>
            <div>
              <p className="font-['Bricolage_Grotesque'] text-sm font-bold tracking-widest uppercase">{user?.name || "Admin Control"}</p>
              <p className="text-xs text-slate-400">System Oversight</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => navigate(`/admin/${t.id}`)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === t.id
                  ? "text-white bg-[#1DB887]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined" data-icon={t.icon}>{t.icon}</span>
              <span className="font-ui text-sm font-medium uppercase tracking-widest">{t.label}</span>
            </button>
          ))}

          {/* COMMAND CENTRE LINK */}
          <button
              onClick={() => navigate("/admin/commandcentre")}
              className="mt-4 w-full flex items-center gap-3 px-4 py-3 rounded-xl text-yellow-500 hover:text-yellow-400 hover:bg-white/5 transition-all duration-300"
            >
            <span className="material-symbols-outlined">rocket_launch</span>
            <span className="font-ui text-sm font-medium uppercase tracking-widest">{t("admin.commandCentre")}</span>
          </button>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-white/5">
          <button onClick={handleLogout} className="flex items-center gap-3 text-slate-400 hover:text-white px-4 py-3 w-full hover:bg-white/5 transition-all duration-300">
            <span className="material-symbols-outlined" data-icon="logout">logout</span>
            <span className="font-ui text-sm font-medium uppercase tracking-widest">{t("common.logout")}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-72 min-h-screen flex flex-col">
        {/* Top Header Panel */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 px-10 py-6 flex justify-between items-center shadow-sm">
          <div>
            <p className="font-ui text-[11px] font-bold text-[#1DB887] uppercase tracking-[0.12em] mb-1">Administrative Terminal</p>
            <h1 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-primary tracking-tight">{currentTabLabel}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-lg gap-2 border border-outline/5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-sm font-semibold text-primary font-mono">4 Pending</span>
            </div>
            <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-lg gap-2 border border-outline/5">
              <span className="w-2 h-2 rounded-full bg-[#1DB887]"></span>
              <span className="text-sm font-semibold text-primary font-mono">12 Approved</span>
            </div>
            <button className="ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:opacity-90 transition-all">
              <span className="material-symbols-outlined" data-icon="search">search</span>
            </button>
          </div>
        </header>

        {/* Content Canvas */}
        <section className="p-10 space-y-10 flex-1">
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/*  Top Metrics Row  */}
              <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-primary/5 hover:border-[#1DB887]/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1DB887]/10 flex items-center justify-center text-[#1DB887] group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">storefront</span>
                    </div>
                    <span className="text-[10px] font-black text-[#1DB887] bg-[#1DB887]/5 px-2 py-1 rounded-full">+12%</span>
                  </div>
                  <h3 className="font-['Bricolage_Grotesque'] text-secondary/60 text-[10px] font-black uppercase tracking-[0.2em]">{t("admin.totalBusinesses")}</h3>
                  <p className="text-3xl font-black text-primary mt-1 font-mono">120</p>
                </div>
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-primary/5 hover:border-[#1DB887]/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">verified_user</span>
                    </div>
                    <span className="text-[10px] font-black text-amber-500 bg-amber-500/5 px-2 py-1 rounded-full">4 Urgently</span>
                  </div>
                  <h3 className="font-['Bricolage_Grotesque'] text-secondary/60 text-[10px] font-black uppercase tracking-[0.2em]">{t("admin.pendingVerification")}</h3>
                  <p className="text-3xl font-black text-primary mt-1 font-mono">6</p>
                </div>
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-primary/5 hover:border-[#1DB887]/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">list_alt</span>
                    </div>
                    <span className="text-[10px] font-black text-blue-500 bg-blue-500/5 px-2 py-1 rounded-full">Active</span>
                  </div>
                  <h3 className="font-['Bricolage_Grotesque'] text-secondary/60 text-[10px] font-black uppercase tracking-[0.2em]">{t("admin.activeServices")}</h3>
                  <p className="text-3xl font-black text-primary mt-1 font-mono">24</p>
                </div>
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-primary/5 hover:border-[#1DB887]/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <span className="text-[10px] font-black text-purple-500 bg-purple-500/5 px-2 py-1 rounded-full">842 Total</span>
                  </div>
                  <h3 className="font-['Bricolage_Grotesque'] text-secondary/60 text-[10px] font-black uppercase tracking-[0.2em]">{t("admin.emailsSentToday")}</h3>
                  <p className="text-3xl font-black text-primary mt-1 font-mono">156</p>
                </div>
              </div>

              {/*  Quick Actions & Business Funnel  */}
              <div className="grid grid-cols-3 gap-8">
                {/*  Business Funnel (Pipeline)  */}
                <div className="col-span-2 bg-white rounded-[32px] p-8 border border-primary/5 shadow-sm">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-primary">Business Lifecycle Pipeline</h3>
                    <span className="text-xs font-bold text-[#1DB887] bg-[#1DB887]/5 px-3 py-1 rounded-full">Real-time Stream</span>
                  </div>
                  <div className="flex justify-between items-center relative">
                    {/*  Connecting line  */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-0"></div>
                    
                    {[
                      { label: 'Signed Up', count: 120, icon: 'person_add', color: 'slate' },
                      { label: 'Pending', count: 6, icon: 'hourglass_empty', color: 'amber' },
                      { label: 'Approved', count: 98, icon: 'task_alt', color: 'emerald' },
                      { label: 'Active', count: 84, icon: 'rocket_launch', color: 'blue' }
                    ].map((step, i) => (
                      <div key={i} className="relative z-10 flex flex-col items-center group">
                        <div className={`w-14 h-14 rounded-2xl bg-white border-4 border-slate-50 flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                          <span className={`material-symbols-outlined text-${step.color === 'emerald' ? '[#1DB887]' : step.color + '-500'}`}>{step.icon}</span>
                        </div>
                        <p className="text-[11px] font-black text-primary/40 uppercase tracking-widest mb-1">{step.label}</p>
                        <p className="font-mono font-black text-primary">{step.count}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/*  Quick Actions Panel  */}
                <div className="bg-[#0F1A3D] rounded-[32px] p-8 text-white">
                  <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold mb-6">{t("admin.quickPilot")}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => navigate('/admin/service/new')} className="flex flex-col items-center bg-white/5 hover:bg-[#1DB887] p-4 rounded-2xl transition-all group">
                      <span className="material-symbols-outlined mb-2 group-hover:scale-110 transition-transform">add_circle</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{t("admin.addService")}</span>
                    </button>
                    <button onClick={() => navigate('/admin/verification')} className="flex flex-col items-center bg-white/5 hover:bg-[#1DB887] p-4 rounded-2xl transition-all group">
                      <span className="material-symbols-outlined mb-2 group-hover:scale-110 transition-transform">verified</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{t("admin.approveBiz")}</span>
                    </button>
                    <button onClick={() => navigate('/admin/commandcentre')} className="flex flex-col items-center bg-white/5 hover:bg-[#1DB887] p-4 rounded-2xl transition-all group">
                      <span className="material-symbols-outlined mb-2 group-hover:scale-110 transition-transform">send</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{t("admin.sendEmail")}</span>
                    </button>
                    <button onClick={() => navigate('/')} className="flex flex-col items-center bg-white/5 hover:bg-[#1DB887] p-4 rounded-2xl transition-all group">
                      <span className="material-symbols-outlined mb-2 group-hover:scale-110 transition-transform">home</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">{t("admin.sitePreview")}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/*  Deep Data Grids  */}
              <div className="grid grid-cols-12 gap-8">
                {/*  Activity Feed  */}
                <div className="col-span-12 lg:col-span-5 bg-white rounded-[32px] p-8 border border-primary/5 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-primary">System Activity</h3>
                    <button className="text-[10px] font-bold text-primary/40 uppercase tracking-widest hover:text-[#1DB887]">View All</button>
                  </div>
                  <div className="space-y-6">
                    {[
                      { action: 'New Business Signed Up', entity: 'Sharma Chai Stall', time: '2 mins ago', icon: 'person_add', color: '#1DB887' },
                      { action: 'Service Purchased', entity: 'Website Builder', time: '14 mins ago', icon: 'shopping_cart', color: '#3B82F6' },
                      { action: 'Verification Approved', entity: 'Priya\'s Pickles', time: '1 hour ago', icon: 'check_circle', color: '#10B981' },
                      { action: 'Email Campaign Sent', entity: 'Onboarding Series', time: '3 hours ago', icon: 'mail', color: '#8B5CF6' },
                      { action: 'Profile Updated', entity: 'Anita\'s Tiffin', time: 'Yesterday', icon: 'edit', color: '#F59E0B' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 group cursor-default">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#1DB887] transition-all">
                          <span className="material-symbols-outlined text-sm">{item.icon}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-primary">{item.action}</p>
                          <p className="text-[11px] text-on-surface-variant font-medium">{item.entity}</p>
                        </div>
                        <span className="text-[10px] font-bold text-primary/30 uppercase">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/*  Performance & Insights  */}
                <div className="col-span-12 lg:col-span-7 space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    {/*  Top Services  */}
                    <div className="bg-white rounded-[32px] p-8 border border-primary/5 shadow-sm">
                      <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-primary mb-6">Hot Services</h3>
                      <div className="space-y-4">
                        {[
                          { name: 'Website Builder', use: 85, color: '#1DB887' },
                          { name: 'Digital Marketing', use: 62, color: '#3B82F6' },
                          { name: 'GST Setup', use: 44, color: '#F59E0B' }
                        ].map((s, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold">
                              <span>{s.name}</span>
                              <span className="text-primary/40">{s.use}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${s.use}%`, backgroundColor: s.color }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/*  Maintenance Alerts  */}
                    <div className="bg-orange-50 rounded-[32px] p-8 border border-orange-100 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="material-symbols-outlined text-orange-600" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-orange-900/60">System Alert</span>
                        </div>
                        <h4 className="font-['Bricolage_Grotesque'] text-lg font-bold text-orange-900 mb-2">2 Failed Actions</h4>
                        <p className="text-xs text-orange-800/80 leading-relaxed font-medium">Domain connection failed for 'Sunita Sarees' and 'Peak Builders'.</p>
                      </div>
                      <button className="mt-6 w-full py-2 bg-orange-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 transition-colors">Resolve Now</button>
                    </div>
                  </div>

                  {/*  Insights Card  */}
                  <div className="bg-[#1DB887] p-8 rounded-[32px] relative overflow-hidden text-white shadow-xl shadow-[#1DB887]/20">
                    <div className="relative z-10 flex justify-between items-center">
                      <div className="max-w-md">
                        <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-3">Performance Insight</p>
                        <h3 className="font-['Bricolage_Grotesque'] text-2xl font-bold leading-tight mb-4">Verification speed is up by 24% this week.</h3>
                        <p className="text-white/80 text-sm font-medium">Your current onboarding friction is at an all-time low. Businesses are reaching "Active" status 1.2 days faster.</p>
                      </div>
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                      </div>
                    </div>
                    {/*  Decorative pulse  */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "verification" && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              {/* Verification Header & Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-primary/5 flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                     <span className="material-symbols-outlined">pending_actions</span>
                   </div>
                   <div>
                     <p className="font-['Bricolage_Grotesque'] text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">Awaiting Review</p>
                     <p className="text-2xl font-black text-primary font-mono">
                       {DUMMY_USERS.filter(u => u.status === 'pending').length} Businesses
                     </p>
                   </div>
                </div>
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-primary/5 flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                     <span className="material-symbols-outlined">description</span>
                   </div>
                   <div>
                     <p className="font-['Bricolage_Grotesque'] text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">Docs Uploaded</p>
                     <p className="text-2xl font-black text-primary font-['Bricolage_Grotesque']">100% Complete</p>
                   </div>
                </div>
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-primary/5 flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-[#1DB887]/10 flex items-center justify-center text-[#1DB887]">
                     <span className="material-symbols-outlined">verified</span>
                   </div>
                   <div>
                     <p className="font-['Bricolage_Grotesque'] text-[10px] font-black text-primary/30 uppercase tracking-[0.2em]">Avg. Review Time</p>
                     <p className="text-2xl font-black text-primary font-['Bricolage_Grotesque']">4.2 Hours</p>
                   </div>
                </div>
              </div>

              {/* Pending Queue */}
              <div className="bg-white rounded-[32px] border border-primary/5 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-primary/5 flex justify-between items-center bg-slate-50/30">
                  <h3 className="font-['Bricolage_Grotesque'] text-xl font-bold text-primary">Verification Queue</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-1.5 bg-white border border-primary/10 rounded-xl text-xs font-bold text-primary/60 hover:bg-slate-50">Bulk Approve</button>
                    <button className="px-4 py-1.5 bg-white border border-primary/10 rounded-xl text-xs font-bold text-primary/60 hover:bg-slate-50">Sort: Oldest First</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-8 py-5 text-[11px] font-black text-primary/40 uppercase tracking-widest">Business</th>
                        <th className="px-8 py-5 text-[11px] font-black text-primary/40 uppercase tracking-widest">Owner</th>
                        <th className="px-8 py-5 text-[11px] font-black text-primary/40 uppercase tracking-widest">Submission Date</th>
                        <th className="px-8 py-5 text-[11px] font-black text-primary/40 uppercase tracking-widest">Trust Score</th>
                        <th className="px-8 py-5 text-[11px] font-black text-primary/40 uppercase tracking-widest text-right">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5">
                      {DUMMY_USERS.filter(u => u.status === 'pending').map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <img src={u.avatar} className="w-10 h-10 rounded-xl object-cover" alt="" />
                              <div>
                                <p className="text-sm font-bold text-primary">{u.businessName}</p>
                                <p className="text-[10px] text-primary/40 font-medium">{u.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-sm font-bold text-primary">{u.ownerName}</p>
                            <p className="text-[10px] text-primary/40">{u.email}</p>
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-sm font-bold text-primary">April 12, 2024</p>
                            <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Pending docs</span>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-2">
                               <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                 <div className="bg-[#1DB887] h-full" style={{ width: '85%' }}></div>
                               </div>
                               <span className="text-[10px] font-black text-primary/40">85%</span>
                             </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <div className="flex justify-end gap-2">
                               <button 
                                 onClick={() => navigate(`/admin/users`)}
                                 className="px-4 py-2 bg-slate-100 text-primary rounded-xl text-xs font-bold hover:bg-slate-200 transition-all"
                                >
                                 View Docs
                               </button>
                               <button className="px-4 py-2 bg-[#1DB887] text-white rounded-xl text-xs font-bold hover:scale-105 shadow-lg shadow-[#1DB887]/20 transition-all">
                                 Approve
                               </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
             <div className="bg-surface-container-lowest rounded-[20px] shadow-[0_12px_40px_rgba(27,42,94,0.10)] overflow-hidden border border-primary/5">
               <div className="p-8 border-b border-surface-container flex justify-between items-center">
                 <h2 className="font-['Bricolage_Grotesque'] text-xl font-bold text-primary">Service Catalogue</h2>
                 <button
                   onClick={() => navigate('/admin/service/new')}
                   className="bg-[#1DB887] text-white px-6 py-2 rounded-lg text-sm font-bold shadow hover:scale-105 active:scale-95 transition-all"
                 >
                   + Add Service
                 </button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-surface-container-low">
                       <th className="px-8 py-5 text-[11px] font-black text-primary/50 uppercase tracking-widest">Title</th>
                       <th className="px-8 py-5 text-[11px] font-black text-primary/50 uppercase tracking-widest">Category</th>
                       <th className="px-8 py-5 text-[11px] font-black text-primary/50 uppercase tracking-widest">Price</th>
                       <th className="px-8 py-5 text-[11px] font-black text-primary/50 uppercase tracking-widest">Status</th>
                       <th className="px-8 py-5 text-[11px] font-black text-primary/50 uppercase tracking-widest text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-surface-container-low">
                     {services.map((s) => (
                       <tr key={s._id} className="hover:bg-surface transition-colors">
                         <td
                           className="px-8 py-6 font-bold text-primary cursor-pointer hover:text-[#1DB887] transition-colors"
                           onClick={() => navigate(`/admin/service/edit/${s._id}`)}
                         >
                           {s.title}
                         </td>
                         <td className="px-8 py-6 text-on-surface-variant font-medium">{s.category}</td>
                         <td className="px-8 py-6 text-primary font-bold">₹{s.price}</td>
                         <td className="px-8 py-6">
                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${s.isActive ? "bg-secondary-container text-secondary" : "bg-error-container text-error"}`}>
                             {s.isActive ? "Active" : "Inactive"}
                           </span>
                         </td>
                         <td className="px-8 py-6 text-right">
                           <div className="flex justify-end gap-2">
                             <button
                               onClick={() => navigate(`/admin/service/edit/${s._id}`)}
                               className="bg-[#1DB887]/10 text-[#1DB887] border border-[#1DB887]/20 px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#1DB887] hover:text-white transition-all shadow-sm"
                             >
                               Edit
                             </button>
                             <button
                               onClick={() => handleDelete(s._id)}
                               className="bg-white border border-error/20 text-error px-4 py-2 rounded-lg text-xs font-bold hover:bg-error-container/20 transition-all"
                             >
                               Delete
                             </button>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
          )}

          {activeTab === "users" && (
            <div className="flex gap-8 h-[calc(100vh-230px)] animate-in slide-in-from-bottom-4 duration-500">
              {/*  LEFT PANEL: Users List  */}
              <div className="w-[400px] flex flex-col bg-white rounded-[32px] border border-primary/5 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-primary/5 space-y-4">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 text-xl">search</span>
                    <input 
                      type="text" 
                      placeholder="Search business or owner..." 
                      className="w-full pl-12 pr-4 py-3 bg-surface rounded-2xl text-sm font-medium border border-transparent focus:border-[#1DB887] outline-none transition-all"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                    {["all", "pending", "approved"].map((f) => (
                      <button 
                        key={f}
                        onClick={() => setUserFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${userFilter === f ? "bg-[#1DB887] text-white shadow-lg shadow-[#1DB887]/20" : "bg-slate-50 text-primary/40 hover:bg-slate-100"}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                  {DUMMY_USERS.filter(u => 
                    (userFilter === "all" || u.status === userFilter) &&
                    (u.businessName.toLowerCase().includes(userSearch.toLowerCase()) || u.ownerName.toLowerCase().includes(userSearch.toLowerCase()))
                  ).map((u) => (
                    <div 
                      key={u.id}
                      onClick={() => setSelectedUserId(u.id)}
                      className={`p-4 rounded-[24px] cursor-pointer transition-all duration-300 border ${selectedUserId === u.id ? "bg-[#1DB887]/5 border-[#1DB887]/20 shadow-sm" : "border-transparent hover:bg-slate-50"}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <img src={u.avatar} className="w-10 h-10 rounded-xl object-cover" alt="" />
                          <div>
                            <p className="font-bold text-primary text-sm line-clamp-1">{u.businessName}</p>
                            <p className="text-[10px] text-primary/40 font-medium">{u.category}</p>
                          </div>
                        </div>
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${u.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {u.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] pt-3 border-t border-primary/5">
                        <span className="font-bold text-primary/60">{u.ownerName}</span>
                        <span className="text-primary/30 uppercase">{u.plan} Plan</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/*  RIGHT PANEL: User Details  */}
              <div className="flex-1 bg-white rounded-[32px] border border-primary/5 shadow-sm overflow-hidden flex flex-col">
                <div className="p-8 border-b border-primary/5 flex justify-between items-center bg-surface/30">
                  <div className="flex items-center gap-6">
                    <img src={selectedBusiness.avatar} className="w-20 h-20 rounded-[28px] object-cover ring-4 ring-white shadow-xl" alt="" />
                    <div>
                      <h2 className="font-['Bricolage_Grotesque'] text-3xl font-bold text-primary tracking-tight">{selectedBusiness.businessName}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-bold text-[#1DB887]">{selectedBusiness.category}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                        <span className="text-xs font-medium text-primary/40">Registered {selectedBusiness.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-lg shadow-primary/10">Send Direct Email</button>
                    <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-error hover:bg-error/10 transition-all border border-transparent hover:border-error/20">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                  {/*  Grid Sections  */}
                  <div className="grid grid-cols-2 gap-8">
                    {/*  Section 1: Status & Safety  */}
                    <div className="space-y-6">
                      <div className="bg-slate-50/50 p-6 rounded-[28px] border border-primary/5">
                        <h4 className="text-[11px] font-black text-primary/30 uppercase tracking-[0.2em] mb-6">Status & Accountability</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-primary/5">
                            <div>
                              <p className="text-sm font-bold text-primary">Verification Status</p>
                              <p className="text-[10px] text-primary/40 font-medium capitalize">{selectedBusiness.status}</p>
                            </div>
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                              <button className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${selectedBusiness.status === 'approved' ? 'bg-[#1DB887] text-white shadow-sm' : 'text-primary/40'}`}>Approved</button>
                              <button className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${selectedBusiness.status === 'pending' ? 'bg-amber-500 text-white shadow-sm' : 'text-primary/40'}`}>Pending</button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-primary/5">
                            <div>
                              <p className="text-sm font-bold text-primary">Account Access</p>
                              <p className="text-[10px] text-primary/40 font-medium">{selectedBusiness.active ? 'User can log in' : 'Access Restricted'}</p>
                            </div>
                            <button className={`w-12 h-6 rounded-full relative transition-all ${selectedBusiness.active ? 'bg-[#1DB887]' : 'bg-slate-200'}`}>
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${selectedBusiness.active ? 'right-1' : 'left-1'}`}></div>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50/50 p-6 rounded-[28px] border border-primary/5">
                        <h4 className="text-[11px] font-black text-primary/30 uppercase tracking-[0.2em] mb-6">Module Permissions</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Analytics', key: 'analytics' },
                            { label: 'Scheduler', key: 'scheduler' },
                            { label: 'Chat Support', key: 'chat' },
                            { label: 'Email Campaigns', key: 'emailCampaign' }
                          ].map(feat => (
                            <div key={feat.key} className="flex items-center justify-between p-3 bg-white rounded-xl border border-primary/5">
                              <span className="text-[11px] font-bold text-primary/60">{feat.label}</span>
                              <button className={`w-10 h-5 rounded-full relative transition-all ${selectedBusiness.features[feat.key] ? 'bg-[#1DB887]' : 'bg-slate-200'}`}>
                                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${selectedBusiness.features[feat.key] ? 'right-0.5' : 'left-0.5'}`}></div>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/*  Section 2: Contact & Admin Notes  */}
                    <div className="space-y-6">
                      <div className="bg-surface p-6 rounded-[28px] border border-primary/5 h-full flex flex-col">
                        <h4 className="text-[11px] font-black text-primary/30 uppercase tracking-[0.2em] mb-6">Internal Audit / Notes</h4>
                        <textarea 
                          placeholder="Write administrative notes about this business..."
                          className="flex-1 w-full bg-white/50 p-4 rounded-2xl text-xs font-medium border border-primary/5 focus:border-[#1DB887] outline-none transition-all resize-none mb-4"
                          defaultValue={selectedBusiness.notes}
                        ></textarea>
                        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                          <p className="text-[10px] font-black text-blue-900/40 uppercase tracking-widest mb-2">Recent System Action</p>
                          <p className="text-[11px] font-bold text-blue-900 leading-relaxed">Profile synchronized with Google Business Profile on April 14, 2024.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*  Section 3: Service Configuration  */}
                  <div className="bg-slate-50/50 p-8 rounded-[32px] border border-primary/5">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h4 className="text-[11px] font-black text-primary/30 uppercase tracking-[0.2em]">Service Entitlements</h4>
                        <p className="text-lg font-['Bricolage_Grotesque'] font-bold text-primary mt-1">Configure user's active toolkit</p>
                      </div>
                      <div className="px-4 py-2 bg-white rounded-xl border border-primary/5 flex items-center gap-3">
                        <span className="text-[10px] font-black text-primary/40 uppercase">Pricing Visible</span>
                        <button className={`w-10 h-5 rounded-full relative transition-all ${selectedBusiness.showPricing ? 'bg-[#1DB887]' : 'bg-slate-200'}`}>
                          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${selectedBusiness.showPricing ? 'right-0.5' : 'left-0.5'}`}></div>
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      {['Website Builder', 'Digital Marketing', 'Social Media', 'Apparel Printing', 'Storefront Sync', 'GST Registration', 'Standard SEO', 'Brand Identity'].map(service => (
                        <div key={service} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-primary/5 hover:border-[#1DB887]/20 transition-all cursor-pointer group">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedBusiness.services.includes(service) ? 'bg-[#1DB887] border-[#1DB887]' : 'border-slate-200 bg-slate-50'}`}>
                            {selectedBusiness.services.includes(service) && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                          </div>
                          <span className="text-xs font-bold text-primary/60 group-hover:text-primary">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-surface/30 border-t border-primary/5 flex justify-end gap-3">
                   <button className="px-8 py-3 bg-white border border-primary/10 text-primary rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all">Cancel Changes</button>
                   <button className="px-8 py-3 bg-[#1DB887] text-white rounded-2xl text-sm font-bold hover:scale-105 transition-all shadow-xl shadow-[#1DB887]/20">Update Business Profile</button>
                </div>
              </div>
            </div>
          )}

        </section>

        {/* Footer Shell */}
        <footer className="mt-auto py-12 px-10 border-t border-primary/5 bg-surface-container-low">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-full">
            <div className="mb-4 md:mb-0">
              <span className="font-['Bricolage_Grotesque'] text-lg font-bold text-primary">LocalBoost</span>
              <p className="font-ui text-xs text-on-surface-variant mt-1">© 2024 LocalBoost. System Administration Dashboard.</p>
            </div>
            <div className="flex gap-8">
              <a className="font-ui text-xs text-on-surface-variant hover:text-[#1DB887] transition-colors" href="#!">Privacy Policy</a>
              <a className="font-ui text-xs text-on-surface-variant hover:text-[#1DB887] transition-colors" href="#!">Terms of Service</a>
              <a className="font-ui text-xs text-on-surface-variant hover:text-[#1DB887] transition-colors" href="#!">System Status</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
