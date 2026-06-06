const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");
// const authMiddleware = require("../middleware/authMiddleware"); // Optional based on current setup

// Public Endpoints
router.get("/public", testimonialController.getPublicTestimonials);
router.get("/homepage", testimonialController.getHomepageTestimonials);

// Admin / Standard Endpoints
router.get("/", testimonialController.getTestimonials);
router.get("/:id", testimonialController.getTestimonialById);
router.post("/", testimonialController.createTestimonial);
router.put("/:id", testimonialController.updateTestimonial);
router.delete("/:id", testimonialController.deleteTestimonial);

module.exports = router;
