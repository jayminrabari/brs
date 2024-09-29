const express = require("express");
const app = express();

app.get("/api/test", (req, res) => {
  res.send("API is working!");
});

module.exports = async (req, res) => {
  return app(req, res);
};
