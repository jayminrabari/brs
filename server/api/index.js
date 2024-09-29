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
  if (mongoose.connection.readyState === 0) { // Only connect if not already connected
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
      throw new Error("Database connection failed");
    }
  }
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
