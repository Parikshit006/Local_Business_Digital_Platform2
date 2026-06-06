import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServices } from '../../api/serviceApi';
import { createTestimonial, getTestimonialById, updateTestimonial, deleteTestimonial } from '../../api/testimonialApi';

export default function TestimonialForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  
  const [formData, setFormData] = useState({
    customerName: '',
    businessName: '',
    city: '',
    profileImage: '',
    serviceId: '',
    rating: 5,
    shortQuote: { en: '', mr: '' },
    fullStory: { en: '', mr: '' },
    resultTitle: { en: '', mr: '' },
    resultDescription: { en: '', mr: '' },
    published: false,
    showOnHomepage: true,
    featured: false,
    allowPublicView: true,
    displayOrder: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);

        if (isEdit) {
          const testimonial = await getTestimonialById(id);
          setFormData({
            customerName: testimonial.customerName || '',
            businessName: testimonial.businessName || '',
            city: testimonial.city || '',
            profileImage: testimonial.profileImage || '',
            serviceId: testimonial.serviceId?._id || testimonial.serviceId || '',
            rating: testimonial.rating || 5,
            shortQuote: testimonial.shortQuote || { en: '', mr: '' },
            fullStory: testimonial.fullStory || { en: '', mr: '' },
            resultTitle: testimonial.resultTitle || { en: '', mr: '' },
            resultDescription: testimonial.resultDescription || { en: '', mr: '' },
            published: testimonial.published || false,
            showOnHomepage: testimonial.showOnHomepage !== undefined ? testimonial.showOnHomepage : true,
            featured: testimonial.featured || false,
            allowPublicView: testimonial.allowPublicView !== undefined ? testimonial.allowPublicView : true,
            displayOrder: testimonial.displayOrder || 0
          });
        }
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSave = async (publishNow = false) => {
    try {
      const payload = { ...formData, published: publishNow || formData.published };
      const token = localStorage.getItem('token');
      
      if (isEdit) {
        await updateTestimonial(id, payload, token);
      } else {
        await createTestimonial(payload, token);
      }
      navigate('/admin/commandcentre/testimonials');
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save testimonial. See console.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const token = localStorage.getItem('token');
      await deleteTestimonial(id, token);
      navigate('/admin/commandcentre/testimonials');
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete.");
    }
  };

  if (loading) return <div className="p-8">Loading form...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <button onClick={() => navigate(-1)} className="text-[#1DB887] text-sm font-bold flex items-center mb-2 hover:underline">
            <span className="material-symbols-outlined text-[16px] mr-1">arrow_back</span>
            Back to Testimonials
          </button>
          <h2 className="font-['Bricolage_Grotesque'] text-2xl font-black text-primary tracking-tight">
            {isEdit ? 'Edit Testimonial' : 'Create New Testimonial'}
          </h2>
        </div>
      </div>

      <div className="space-y-8">
        {/* SECTION 1: Customer Info */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5">
          <h3 className="text-lg font-bold text-primary mb-6 border-b pb-2">1. Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-primary mb-2">Customer Name</label>
              <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="w-full border rounded-lg p-3" placeholder="e.g. Rahul Sharma" />
            </div>
            <div>
              <label className="block text-sm font-bold text-primary mb-2">Business Name</label>
              <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full border rounded-lg p-3" placeholder="e.g. Sharma Bakery" />
            </div>
            <div>
              <label className="block text-sm font-bold text-primary mb-2">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border rounded-lg p-3" placeholder="e.g. Mumbai" />
            </div>
            <div>
              <label className="block text-sm font-bold text-primary mb-2">Profile Image URL</label>
              <input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} className="w-full border rounded-lg p-3" placeholder="https://..." />
            </div>
          </div>
        </div>

        {/* SECTION 2: Service Association */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5">
          <h3 className="text-lg font-bold text-primary mb-6 border-b pb-2">2. Service Association</h3>
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Service Provided</label>
            <select name="serviceId" value={formData.serviceId} onChange={handleChange} className="w-full border rounded-lg p-3">
              <option value="">-- Select a Service --</option>
              {services.map(s => (
                <option key={s._id} value={s._id}>{s.title} ({s.category})</option>
              ))}
            </select>
          </div>
        </div>

        {/* SECTION 3: Review Info */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5">
          <h3 className="text-lg font-bold text-primary mb-6 border-b pb-2">3. Review Information</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-primary mb-2">Rating (1-5)</label>
              <input type="number" min="1" max="5" name="rating" value={formData.rating} onChange={handleChange} className="w-full border rounded-lg p-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-sm font-bold text-primary">Short Quote (EN)</label>
                  <span className="text-xs text-primary/50">{formData.shortQuote.en.length} / 150</span>
                </div>
                <textarea name="shortQuote.en" value={formData.shortQuote.en} onChange={handleChange} maxLength="150" rows="2" className="w-full border rounded-lg p-3" placeholder="A brief, impactful quote..."></textarea>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-sm font-bold text-primary">Short Quote (MR)</label>
                  <span className="text-xs text-primary/50">{formData.shortQuote.mr.length} / 150</span>
                </div>
                <textarea name="shortQuote.mr" value={formData.shortQuote.mr} onChange={handleChange} maxLength="150" rows="2" className="w-full border rounded-lg p-3" placeholder="संक्षिप्त आणि प्रभावी विधान..."></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Success Story */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5">
          <h3 className="text-lg font-bold text-primary mb-6 border-b pb-2">4. Success Story</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-primary mb-2">Full Story (EN)</label>
              <textarea name="fullStory.en" value={formData.fullStory.en} onChange={handleChange} rows="6" className="w-full border rounded-lg p-3" placeholder="Write the full case study or success story here..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-primary mb-2">Full Story (MR)</label>
              <textarea name="fullStory.mr" value={formData.fullStory.mr} onChange={handleChange} rows="6" className="w-full border rounded-lg p-3" placeholder="संपूर्ण यशोगाथा येथे लिहा..."></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 5: Results */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5">
          <h3 className="text-lg font-bold text-primary mb-6 border-b pb-2">5. Results</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Result Title (EN)</label>
                <input type="text" name="resultTitle.en" value={formData.resultTitle.en} onChange={handleChange} className="w-full border rounded-lg p-3" placeholder="e.g. 65% More Customer Inquiries" />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Result Title (MR)</label>
                <input type="text" name="resultTitle.mr" value={formData.resultTitle.mr} onChange={handleChange} className="w-full border rounded-lg p-3" placeholder="उदा. ६५% अधिक चौकशी" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Result Description (EN)</label>
                <textarea name="resultDescription.en" value={formData.resultDescription.en} onChange={handleChange} rows="3" className="w-full border rounded-lg p-3" placeholder="Describe the specific metrics or outcomes achieved..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Result Description (MR)</label>
                <textarea name="resultDescription.mr" value={formData.resultDescription.mr} onChange={handleChange} rows="3" className="w-full border rounded-lg p-3" placeholder="मिळालेले परिणाम सांगा..."></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: Publishing Controls */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5">
          <h3 className="text-lg font-bold text-primary mb-6 border-b pb-2">6. Publishing Controls</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="w-5 h-5 rounded text-[#1DB887] focus:ring-[#1DB887]" />
              <span className="font-bold text-primary">Published (Live)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="showOnHomepage" checked={formData.showOnHomepage} onChange={handleChange} className="w-5 h-5 rounded text-[#1DB887] focus:ring-[#1DB887]" />
              <span className="font-bold text-primary">Show on Homepage Carousel</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 rounded text-[#1DB887] focus:ring-[#1DB887]" />
              <span className="font-bold text-primary">Featured Story (Prioritized sorting)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" name="allowPublicView" checked={formData.allowPublicView} onChange={handleChange} className="w-5 h-5 rounded text-[#1DB887] focus:ring-[#1DB887]" />
              <span className="font-bold text-primary">Allow Public View (Success Stories Listing)</span>
            </label>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-primary mb-2">Display Order (Lower numbers appear first)</label>
              <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} className="w-32 border rounded-lg p-2" />
            </div>
          </div>
        </div>

        {/* SECTION 7: Actions */}
        <div className="flex items-center justify-end gap-4 pb-12">
          {isEdit && (
            <button onClick={handleDelete} className="px-6 py-3 border border-red-500 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors mr-auto">
              Delete Testimonial
            </button>
          )}
          <button onClick={() => handleSave(false)} className="px-6 py-3 border border-primary/20 text-primary font-bold rounded-xl hover:bg-surface-container transition-colors">
            {formData.published ? 'Save Changes' : 'Save as Draft'}
          </button>
          <button onClick={() => handleSave(true)} className="px-8 py-3 bg-[#1DB887] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
            {formData.published ? 'Save & Update Live' : 'Publish Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
