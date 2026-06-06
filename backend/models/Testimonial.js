const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      trim: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    shortQuote: {
      en: { type: String, required: true, maxlength: 150 },
      mr: { type: String, maxlength: 150 }
    },
    fullStory: {
      en: { type: String },
      mr: { type: String }
    },
    resultTitle: {
      en: { type: String },
      mr: { type: String }
    },
    resultDescription: {
      en: { type: String },
      mr: { type: String }
    },
    published: {
      type: Boolean,
      default: false,
    },
    showOnHomepage: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    allowPublicView: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
