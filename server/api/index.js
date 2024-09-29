const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = [
  'https://brs-z72z.vercel.app', // Your frontend URL
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));


const bookRoutes = require("../routes/bookRoutes");
const userRoutes = require("../routes/userRoutes");
const transactionRoutes = require("../routes/transactionRoutes");

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
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
