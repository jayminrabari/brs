const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://brs-z72z.vercel.app/", // Allow your frontend URL
}));
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Import routes
const bookRoutes = require("../routes/bookRoutes");
const userRoutes = require("../routes/userRoutes");
const transactionRoutes = require("../routes/transactionRoutes");

// Use routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Export the app as a handler for Vercel
module.exports = async (req, res) => {
  await connectDB(); // Ensure DB connection on each request
  return app(req, res);
};
