const Testimonial = require("../models/Testimonial");

// Admin: Get all testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().populate("serviceId").sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
};

// Admin: Get a single testimonial
exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id).populate("serviceId");
    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch testimonial" });
  }
};

// Admin: Create a testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    const saved = await newTestimonial.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to create testimonial" });
  }
};

// Admin: Update a testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update testimonial" });
  }
};

// Admin: Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json({ message: "Testimonial deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
};

// Public: Get all public success stories
exports.getPublicTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      published: true,
      allowPublicView: true
    }).populate("serviceId").sort({ featured: -1, createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch public testimonials" });
  }
};

// Public: Get homepage testimonials
exports.getHomepageTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      published: true,
      showOnHomepage: true
    }).sort({ featured: -1, displayOrder: 1, createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch homepage testimonials" });
  }
};
