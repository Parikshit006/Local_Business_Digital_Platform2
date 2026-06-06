require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("./models/Service");
const Testimonial = require("./models/Testimonial");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/localboost";

async function runMigration() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected. Starting migration...");

    // 1. Migrate Services
    console.log("Migrating Services...");
    const services = await Service.find({});
    let servicesUpdated = 0;

    for (const service of services) {
      let needsSave = false;

      // Helper to check if a field is a string and needs converting
      const convertToStringObject = (fieldVal) => {
        if (typeof fieldVal === 'string') {
          return { en: fieldVal };
        }
        return fieldVal; // already an object or undefined
      };

      if (typeof service.title === 'string') {
        service.title = { en: service.title };
        needsSave = true;
      }
      if (typeof service.shortDescription === 'string') {
        service.shortDescription = { en: service.shortDescription };
        needsSave = true;
      }
      if (typeof service.longDescription === 'string') {
        service.longDescription = { en: service.longDescription };
        needsSave = true;
      }

      // Features array migration
      if (service.features && service.features.length > 0) {
        let featuresChanged = false;
        const newFeatures = service.features.map(f => {
          if (typeof f === 'string') {
            featuresChanged = true;
            return { en: f };
          }
          return f;
        });

        if (featuresChanged) {
          service.features = newFeatures;
          needsSave = true;
        }
      }

      if (needsSave) {
        // We might need to bypass validation if other fields are messy, but this should work.
        await Service.updateOne({ _id: service._id }, {
          $set: {
            title: service.title,
            shortDescription: service.shortDescription,
            longDescription: service.longDescription,
            features: service.features
          }
        });
        servicesUpdated++;
      }
    }
    console.log(`Successfully migrated ${servicesUpdated} Services.`);

    // 2. Migrate Testimonials
    console.log("Migrating Testimonials...");
    const testimonials = await Testimonial.find({});
    let testimonialsUpdated = 0;

    for (const testimonial of testimonials) {
      let needsSave = false;

      if (typeof testimonial.shortQuote === 'string') {
        testimonial.shortQuote = { en: testimonial.shortQuote };
        needsSave = true;
      }
      if (testimonial.fullStory && typeof testimonial.fullStory === 'string') {
        testimonial.fullStory = { en: testimonial.fullStory };
        needsSave = true;
      }
      if (testimonial.resultTitle && typeof testimonial.resultTitle === 'string') {
        testimonial.resultTitle = { en: testimonial.resultTitle };
        needsSave = true;
      }
      if (testimonial.resultDescription && typeof testimonial.resultDescription === 'string') {
        testimonial.resultDescription = { en: testimonial.resultDescription };
        needsSave = true;
      }

      if (needsSave) {
        await Testimonial.updateOne({ _id: testimonial._id }, {
          $set: {
            shortQuote: testimonial.shortQuote,
            fullStory: testimonial.fullStory,
            resultTitle: testimonial.resultTitle,
            resultDescription: testimonial.resultDescription
          }
        });
        testimonialsUpdated++;
      }
    }
    console.log(`Successfully migrated ${testimonialsUpdated} Testimonials.`);

    console.log("Migration complete.");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

runMigration();
