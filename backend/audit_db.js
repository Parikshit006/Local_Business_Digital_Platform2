const mongoose = require('mongoose');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');

async function runAudit() {
  await mongoose.connect('mongodb://127.0.0.1:27017/localboost');
  console.log("Connected to MongoDB for Audit...");

  const report = {
    services: { total: 0, valid: 0, invalid: [], issues: [] },
    testimonials: { total: 0, valid: 0, invalid: [], issues: [] }
  };

  // Check Services
  const services = await Service.find({});
  report.services.total = services.length;
  
  services.forEach(s => {
    const issues = [];
    if (!s.title || !s.title.en) issues.push("Missing title.en");
    if (!s.shortDescription || !s.shortDescription.en) issues.push("Missing shortDescription.en");
    if (s.features && Array.isArray(s.features)) {
      s.features.forEach((f, i) => {
        if (!f.en && typeof f !== 'string') issues.push(`Feature ${i} missing en`);
        if (typeof f === 'string') issues.push(`Feature ${i} is still a flat string`);
      });
    }
    
    if (issues.length > 0) {
      report.services.invalid.push({ id: s._id, title: s.title, issues });
    } else {
      report.services.valid++;
    }
  });

  // Check Testimonials
  const testimonials = await Testimonial.find({});
  report.testimonials.total = testimonials.length;

  testimonials.forEach(t => {
    const issues = [];
    if (!t.shortQuote || !t.shortQuote.en) issues.push("Missing shortQuote.en");
    if (t.fullStory && typeof t.fullStory === 'string') issues.push("fullStory is a string, not an object");
    if (t.resultTitle && typeof t.resultTitle === 'string') issues.push("resultTitle is a string, not an object");
    
    if (issues.length > 0) {
      report.testimonials.invalid.push({ id: t._id, customerName: t.customerName, issues });
    } else {
      report.testimonials.valid++;
    }
  });

  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

runAudit().catch(err => {
  console.error("Audit failed", err);
  process.exit(1);
});
