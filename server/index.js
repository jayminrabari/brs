const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://brs-z72z.vercel.app', // Your client URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (like cookies)
};

app.use(cors(corsOptions)); // Use CORS middleware with options

app.use(express.json());

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

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

// Start server
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
