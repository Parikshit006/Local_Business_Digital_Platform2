
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/mongodb");   
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const businessRoutes = require("./routes/businessRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();  // ✅ clean call

// Routes
app.use("/auth", authRoutes);
app.use("/services" , serviceRoutes);
app.use("/business" , businessRoutes);
app.use("/testimonials", testimonialRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running");
});