const mongoose = require('mongoose');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');

mongoose.connect('mongodb://127.0.0.1:27017/localboost').then(async () => {
  console.log("Connected to MongoDB.");

  const service = new Service({
    title: { en: "Test Localized Service", mr: "चाचणी सेवा" },
    shortDescription: { en: "English short desc", mr: "मराठी छोटी माहिती" },
    longDescription: { en: "English long desc", mr: "मराठी सविस्तर माहिती" },
    category: "Testing",
    features: [
      { en: "Feature 1", mr: "वैशिष्ट्य १" },
      { en: "Feature 2", mr: "वैशिष्ट्य २" }
    ],
    price: 999,
    duration: "monthly",
    isActive: true,
  });
  
  await service.save();
  console.log("Service created:", service._id);

  const testimonial = new Testimonial({
    customerName: "Ramesh Pawar",
    businessName: "Pawar Kirana",
    serviceId: service._id,
    rating: 5,
    shortQuote: { en: "Great service!", mr: "उत्कृष्ट सेवा!" },
    fullStory: { en: "They did an amazing job.", mr: "त्यांनी खूप छान काम केले." },
    resultTitle: { en: "100% Growth", mr: "१००% वाढ" },
    resultDescription: { en: "Sales doubled", mr: "विक्री दुप्पट झाली" },
    published: true,
    showOnHomepage: true,
    featured: true,
  });

  await testimonial.save();
  console.log("Testimonial created:", testimonial._id);

  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
