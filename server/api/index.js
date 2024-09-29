const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const bookRoutes = require("../routes/bookRoutes");
const userRoutes = require("../routes/userRoutes");
const transactionRoutes = require("../routes/transactionRoutes");

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Connection
const connectDB = async () => {
  for (let i = 0; i < 5; i++) {
    try {
      await mongoose.connect(process.env.MONGO_URI); // Remove the deprecated options
      console.log("MongoDB Connected");
      return; // Exit if connected successfully
    } catch (error) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, error.message);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
    }
  }
  throw new Error("Failed to connect to MongoDB after multiple attempts");
};


// Export the app for Vercel
module.exports = async (req, res) => {
  try {
    await connectDB(); // Ensure DB connection on each invocation
    return app(req, res); // Use the Express app to handle requests
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
