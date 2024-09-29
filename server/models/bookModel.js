const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  uniqueIdentifier: {
    type: String,
    required: true,
    unique: true,
  },
  category: String,
  rentPerDay: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
