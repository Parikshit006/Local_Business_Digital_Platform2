const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true, trim: true },
      mr: { type: String, trim: true }
    },

    shortDescription: {
      en: { type: String, required: true },
      mr: { type: String }
    },

    longDescription: {
      en: { type: String, required: true },
      mr: { type: String }
    },

    price: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      enum: ["INR", "USD", "EUR", "GBP", "AED"],
      default: "INR",
    },

    duration: {
      type: String,
      required: true,
      enum: ["hourly", "daily", "weekly", "monthly", "one-time"],
    },

    features: {
      type: [{
        en: { type: String, required: true },
        mr: { type: String }
      }],
      required: true,
      validate: [(arr) => arr.length > 0, "At least one feature required"],
    },

    category: {
      type: String,
      default: "general",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);