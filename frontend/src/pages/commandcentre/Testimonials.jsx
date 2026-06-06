import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTestimonials, updateTestimonial, deleteTestimonial } from '../../api/testimonialApi';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`material-symbols-outlined text-[16px] ${i <= rating ? 'text-amber-400' : 'text-primary/10'}`}
          style={{ fontVariationSettings: i <= rating ? "'FILL' 1" : "'FILL' 0" }}
        >star</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All'); // All, Published, Draft, Homepage Visible, Featured
  const navigate = useNavigate();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (testimonial) => {
    try {
      const token = localStorage.getItem('token');
      const updated = await updateTestimonial(testimonial._id, { published: !testimonial.published }, token);
      setTestimonials(prev => prev.map(t => t._id === updated._id ? updated : t));
    } catch (err) {
      console.error("Toggle status failed:", err);
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const token = localStorage.getItem('token');
      await deleteTestimonial(id, token);
      setTestimonials(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete.");
    }
  };

  const filteredTestimonials = testimonials.filter(t => {
    if (filter === 'Published') return t.published;
    if (filter === 'Draft') return !t.published;
    if (filter === 'Homepage Visible') return t.showOnHomepage;
    if (filter === 'Featured') return t.featured;
    return true; // All
  });

  return (
    <div className="p-8 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-['Bricolage_Grotesque'] text-2xl font-black text-primary tracking-tight">Testimonials Manager</h2>
          <p className="text-sm text-primary/50 mt-1">Curate and manage client social proof across platforms.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/admin/commandcentre/testimonials/create')} className="flex items-center gap-2 px-5 py-2.5 bg-[#1DB887] hover:bg-[#18a67a] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#1DB887]/20 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create New
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {[
          { label: 'Total Reviews', value: testimonials.length, icon: 'format_quote', color: 'text-blue-600 bg-blue-50' },
          { label: 'Published', value: testimonials.filter((t) => t.published).length, icon: 'check_circle', color: 'text-[#1DB887] bg-[#1DB887]/10' },
          { label: 'Drafts', value: testimonials.filter((t) => !t.published).length, icon: 'visibility_off', color: 'text-orange-500 bg-orange-50' },
        ].map((s) => (
          <div key={s.label} className="bg-surface-container-lowest rounded-[20px] p-5 border border-primary/5 shadow-[0_8px_30px_rgba(27,42,94,0.06)] flex items-center gap-4">
            <div className={`p-3 rounded-xl ${s.color}`}>
              <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-black text-primary/40">{s.label}</p>
              <p className="font-mono text-2xl font-black text-primary mt-0.5">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['All', 'Published', 'Draft', 'Homepage Visible', 'Featured'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${filter === f ? 'bg-primary text-white' : 'bg-surface-container-low text-primary/60 hover:bg-primary/10'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Testimonial Cards Grid */}
      {loading ? (
        <div className="py-10 text-center text-primary/50 font-bold">Loading Testimonials...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTestimonials.map((t) => (
            <div
              key={t._id}
              className={`bg-surface-container-lowest rounded-[20px] p-7 border shadow-[0_12px_40px_rgba(27,42,94,0.08)] transition-all duration-200 hover:shadow-[0_20px_50px_rgba(27,42,94,0.13)] ${t.published ? 'border-[#1DB887]/20 border-l-[4px] border-l-[#1DB887]' : 'border-primary/5 border-l-[4px] border-l-orange-400'}`}
            >
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {t.featured && <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[9px] font-bold uppercase">Featured</span>}
                {t.showOnHomepage && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[9px] font-bold uppercase">Homepage</span>}
                {t.serviceId && <span className="px-2 py-0.5 bg-surface-container text-primary rounded text-[9px] font-bold uppercase truncate max-w-[120px]">{t.serviceId.title}</span>}
              </div>

              {/* Author */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full object-cover ring-2 ring-surface-container bg-slate-200 overflow-hidden flex items-center justify-center">
                    {t.profileImage ? <img src={t.profileImage} alt={t.customerName} className="w-full h-full object-cover" /> : <span className="text-primary font-bold">{t.customerName.charAt(0)}</span>}
                  </div>
                  <div>
                    <h4 className="font-['Bricolage_Grotesque'] font-bold text-primary text-sm line-clamp-1">{t.customerName}</h4>
                    <p className="text-[11px] text-[#1DB887] font-bold line-clamp-1">{t.businessName}</p>
                  </div>
                </div>
                <StarRating rating={t.rating} />
              </div>

              {/* Quote */}
              <p className="text-sm text-primary/60 leading-relaxed italic mb-6 line-clamp-3">"{t.shortQuote}"</p>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-5 border-t border-primary/5">
                <button
                  onClick={() => toggleStatus(t)}
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors ${t.published ? 'bg-[#1DB887]/10 text-[#1DB887] hover:bg-[#1DB887]/20' : 'bg-orange-100 text-orange-600 hover:bg-orange-200'}`}
                >
                  {t.published ? '● Published' : '○ Draft'}
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={() => navigate(`/admin/commandcentre/testimonials/edit/${t._id}`)} className="p-1.5 hover:bg-surface-container rounded-lg transition-colors" title="Edit">
                    <span className="material-symbols-outlined text-[16px] text-primary/50 hover:text-primary">edit</span>
                  </button>
                  <button onClick={() => handleDelete(t._id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group" title="Delete">
                    <span className="material-symbols-outlined text-[16px] text-primary/30 group-hover:text-red-500">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add Slot */}
          <div onClick={() => navigate('/admin/commandcentre/testimonials/create')} className="bg-surface-container/50 border-2 border-dashed border-primary/10 rounded-[20px] flex flex-col items-center justify-center p-10 text-center hover:border-[#1DB887]/30 hover:bg-[#1DB887]/5 transition-all cursor-pointer group min-h-[250px]">
            <span className="material-symbols-outlined text-4xl text-primary/20 mb-3 group-hover:text-[#1DB887]/50 transition-colors">post_add</span>
            <p className="text-sm font-semibold text-primary/30 group-hover:text-primary/50 transition-colors">Add a new testimonial</p>
          </div>
        </div>
      )}
    </div>
  );
}
