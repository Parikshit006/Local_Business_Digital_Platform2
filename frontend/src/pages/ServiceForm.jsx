import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createService, getServiceById, updateService } from "../api/serviceApi";
import { useTranslation } from "../i18n";

export default function ServiceForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode (if we implement it later)
  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    title: { en: "", mr: "" },
    shortDescription: { en: "", mr: "" },
    longDescription: { en: "", mr: "" },
    category: "",
    featuresEn: "",
    featuresMr: "",
    
    // Icons
    icon: "storefront",
    
    // Pricing
    price: "999.00",
    currency: "INR",
    duration: "monthly",
    
    // Advanced
    offerFreeTrial: true,
    trialDays: 14,
    discount: "",
    
    // Status
    isActive: true,
    showPricePublicly: true,
    isFeatured: false,
  });

  const [loading, setLoading] = useState(false);

  const iconsList = [
    "language", "storefront", "campaign", "security", "brush",
    "trending_up", "monitoring", "mail", "chat", "code"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value
        }
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const setFormToggle = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Fetch service data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchService = async () => {
        try {
          const data = await getServiceById(id);
          if (data) {
              setForm({
              title: data.title || { en: "", mr: "" },
              shortDescription: data.shortDescription || { en: "", mr: "" },
              longDescription: data.longDescription || { en: "", mr: "" },
              category: data.category || "",
              featuresEn: Array.isArray(data.features) ? data.features.map(f => f.en).filter(Boolean).join(", ") : "",
              featuresMr: Array.isArray(data.features) ? data.features.map(f => f.mr).filter(Boolean).join(", ") : "",
              icon: data.icon || "storefront",
              price: data.price || "999.00",
              currency: data.currency || "INR",
              duration: data.duration || "monthly",
              offerFreeTrial: data.offerFreeTrial ?? true,
              trialDays: data.trialDays || 14,
              discount: data.discount || "",
              isActive: data.isActive ?? true,
              showPricePublicly: data.showPricePublicly ?? true,
              isFeatured: data.isFeatured ?? false,
            });
          }
        } catch (err) {
          console.error("Error fetching service:", err);
        }
      };
      fetchService();
    }
  }, [id, isEditMode]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const enFeatures = form.featuresEn.split(",").map(f => f.trim()).filter(f => f);
      const mrFeatures = form.featuresMr.split(",").map(f => f.trim()).filter(f => f);
      const combinedFeatures = enFeatures.map((f, i) => ({ en: f, mr: mrFeatures[i] || "" }));

      const submissionData = {
        ...form,
        features: combinedFeatures,
      };

      if (isEditMode) {
        await updateService(id, submissionData, token);
      } else {
        await createService(submissionData, token);
      }
      
      navigate("/admin/services");
    } catch (err) {
      console.error(err);
      alert("Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-ui antialiased flex flex-col min-h-screen">
      {/* TopNavBar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="flex justify-between items-center px-6 py-2 h-16 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-6 flex-1">
            <button 
              type="button"
              onClick={() => navigate("/admin/services")}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to Dashboard
            </button>
            <div className="relative w-96 hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" 
                placeholder="Search resources..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer active:opacity-70">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer active:opacity-70">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors cursor-pointer active:opacity-70">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 p-8 overflow-y-auto w-full max-w-7xl mx-auto">
        <form onSubmit={handleSave}>
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                {isEditMode ? t("serviceForm.editService") : t("serviceForm.createService")}
              </h1>
              <p className="text-sm text-slate-500 mt-1">Create a new service offering or update an existing one.</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => navigate("/admin/services")}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-[#1DB887] border border-transparent rounded-lg shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DB887] transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                {loading ? t("common.loading") : t("common.save")}
              </button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Wider) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Card 1: Basic Info */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-lg font-semibold text-slate-800 font-display flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500">info</span>
                    Basic Information
                  </h3>
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="service-name">Title (EN)</label>
                      <input 
                        id="service-name"
                        name="title.en"
                        value={form.title.en}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-lg border-slate-300 shadow-sm px-3 py-2 border focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none" 
                        placeholder="Premium SEO" 
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="service-name-mr">Title (MR)</label>
                      <input 
                        id="service-name-mr"
                        name="title.mr"
                        value={form.title.mr}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-slate-300 shadow-sm px-3 py-2 border focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none" 
                        placeholder="प्रीमियम एसइओ" 
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="short-desc">Short Desc (EN)</label>
                      <input 
                        id="short-desc"
                        name="shortDescription.en"
                        value={form.shortDescription.en}
                        onChange={handleChange}
                        required
                        className="block w-full rounded-lg border-slate-300 shadow-sm px-3 py-2 border focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none" 
                        placeholder="Brief summary..." 
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="short-desc-mr">Short Desc (MR)</label>
                      <input 
                        id="short-desc-mr"
                        name="shortDescription.mr"
                        value={form.shortDescription.mr}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-slate-300 shadow-sm px-3 py-2 border focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none" 
                        placeholder="थोडक्यात माहिती..." 
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="detailed-desc">Long Desc (EN)</label>
                      <textarea 
                        id="detailed-desc"
                        name="longDescription.en"
                        value={form.longDescription.en}
                        onChange={handleChange}
                        className="block w-full border border-slate-300 rounded-lg py-3 px-3 text-slate-900 placeholder:text-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y outline-none" 
                        placeholder="Comprehensive details..." 
                        rows="4"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="detailed-desc-mr">Long Desc (MR)</label>
                      <textarea 
                        id="detailed-desc-mr"
                        name="longDescription.mr"
                        value={form.longDescription.mr}
                        onChange={handleChange}
                        className="block w-full border border-slate-300 rounded-lg py-3 px-3 text-slate-900 placeholder:text-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y outline-none" 
                        placeholder="सविस्तर माहिती..." 
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Category & Tags */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-lg font-semibold text-slate-800 font-display flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500">category</span>
                    Category &amp; Tags
                  </h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="category">{t("serviceForm.category")}</label>
                    <select 
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="block w-full border px-3 py-2 rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none" 
                    >
                      <option value="" disabled>Select a category</option>
                      <option value="website">Website</option>
                      <option value="marketing">Marketing</option>
                      <option value="compliance">Compliance</option>
                      <option value="branding">Branding</option>
                      <option value="seo">SEO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="tagsEn">Features (EN, comma separated)</label>
                    <input 
                      id="tagsEn"
                      name="featuresEn"
                      value={form.featuresEn}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none mb-4" 
                      placeholder="seo, local, optimization" 
                      type="text"
                    />
                    <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="tagsMr">Features (MR, comma separated)</label>
                    <input 
                      id="tagsMr"
                      name="featuresMr"
                      value={form.featuresMr}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none" 
                      placeholder="एसइओ, स्थानिक, ऑप्टिमायझेशन" 
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* Card 3: Media & Icons */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-lg font-semibold text-slate-800 font-display flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500">imagesmode</span>
                    Media Assets
                  </h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Thumbnail Upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Service Thumbnail</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="space-y-1 text-center">
                        <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-blue-500 transition-colors mb-2">cloud_upload</span>
                        <div className="flex text-sm text-slate-600 justify-center">
                          <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500" htmlFor="file-upload">
                            <span>Upload a file</span>
                            <input className="sr-only" id="file-upload" name="file-upload" type="file" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                        <p className="text-xs text-slate-400 mt-2">Recommended size: 800x600px</p>
                      </div>
                    </div>
                  </div>
                  {/* Icon Selector */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Service Icon</label>
                    <div className="border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                          <span className="material-symbols-outlined text-2xl text-blue-600">{form.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
                            </div>
                            <input className="block w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" placeholder="Search icons..." type="text"/>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-2 max-h-32 overflow-y-auto p-1">
                          {iconsList.map(ic => (
                            <button 
                                key={ic}
                                onClick={() => setForm({...form, icon: ic})}
                                className={`p-2 border rounded flex items-center justify-center cursor-pointer ${form.icon === ic ? "border-blue-500 ring-1 ring-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50 hover:border-blue-300"}`} 
                                type="button"
                            >
                                <span className={`material-symbols-outlined ${form.icon === ic ? "text-blue-600" : "text-slate-600"}`}>{ic}</span>
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (Narrower) */}
            <div className="space-y-6">
              
              {/* Card 4: Pricing & Billing */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-lg font-semibold text-slate-800 font-display flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500">payments</span>
                    Pricing Details
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="price">{t("serviceForm.price")}</label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-slate-500 sm:text-sm">{form.currency === 'INR' ? '₹' : form.currency === 'EUR' ? '€' : form.currency === 'GBP' ? '£' : form.currency === 'AED' ? 'د.إ' : '$'}</span>
                        </div>
                        <input 
                          id="price"
                          name="price"
                          value={form.price}
                          onChange={handleChange}
                          className="focus:ring-blue-500 border border-slate-300 focus:border-blue-500 block w-full pl-9 pr-3 py-2 outline-none sm:text-sm rounded-lg" 
                          placeholder="0.00" 
                          type="number" 
                        />
                      </div>
                    </div>
                    <div className="w-1/3">
                      <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="currency">Currency</label>
                      <select 
                        id="currency"
                        name="currency"
                        value={form.currency}
                        onChange={handleChange}
                        className="block w-full border px-3 py-2 rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none"
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="AED">AED (د.إ)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="duration">Service Duration</label>
                    <select 
                      id="duration" 
                      name="duration" 
                      value={form.duration}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="one-time">One Time</option>
                    </select>
                  </div>

                  <hr className="border-slate-200" />
                  
                  {/* Advanced Settings */}
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3 uppercase tracking-wider text-xs">Advanced Options</h4>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Offer Free Trial</label>
                        <p className="text-xs text-slate-500">Allow users to try before buying.</p>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setFormToggle('offerFreeTrial')}
                        className={`${form.offerFreeTrial ? 'bg-blue-600' : 'bg-slate-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                      >
                        <span className={`${form.offerFreeTrial ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                      </button>
                    </div>
                    
                    <div className={`mb-4 transition-opacity ${form.offerFreeTrial ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                      <div className="flex items-center gap-2">
                        <input 
                          name="trialDays" 
                          value={form.trialDays}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 px-3 border outline-none block w-20 sm:text-sm border-slate-300 rounded-md py-1.5" 
                          type="number" 
                        />
                        <span className="text-sm text-slate-600">Trial Days</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="discount">Promotional Discount (%)</label>
                      <div className="relative rounded-lg shadow-sm">
                        <input 
                          id="discount" 
                          name="discount" 
                          value={form.discount}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block px-3 border outline-none w-full pr-8 py-2 sm:text-sm border-slate-300 rounded-lg" 
                          placeholder="0" 
                          type="number" 
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-slate-500 sm:text-sm">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Visibility & Status */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-lg font-semibold text-slate-800 font-display flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-500">visibility</span>
                    Visibility &amp; Status
                  </h3>
                </div>
                <div className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Active Status</label>
                      <p className="text-xs text-slate-500">Service is available for purchase.</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setFormToggle('isActive')}
                      className={`${form.isActive ? 'bg-blue-600' : 'bg-slate-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                    >
                      <span className={`${form.isActive ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Show Price Publicly</label>
                      <p className="text-xs text-slate-500">Display price on storefront.</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setFormToggle('showPricePublicly')}
                      className={`${form.showPricePublicly ? 'bg-blue-600' : 'bg-slate-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                    >
                      <span className={`${form.showPricePublicly ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Featured / Popular</label>
                      <p className="text-xs text-slate-500">Highlight this service.</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setFormToggle('isFeatured')}
                      className={`${form.isFeatured ? 'bg-blue-600' : 'bg-slate-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                    >
                      <span className={`${form.isFeatured ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-4">
            <button 
              type="button"
              className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-transparent hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 cursor-pointer"
            >
              Save as Draft
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#1DB887] hover:opacity-90 border border-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DB887] transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
              {loading ? t("common.loading") : t("common.submit")}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
