const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Export the app for Vercel
module.exports = async (req, res) => {
  return app(req, res);
};
