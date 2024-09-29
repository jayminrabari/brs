const Book = require("../models/bookModel");
const mongoose = require("mongoose");

// Get books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get book by name
const getBookByName = async (req, res) => {
  try {
    const books = await Book.find({
      bookName: new RegExp(req.params.name, "i"),
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get books by range
const getBooksByRentRange = async (req, res) => {
  const { min, max } = req.params;
  try {
    const books = await Book.find({
      rentPerDay: { $gte: min, $lte: max },
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new book
const addBook = async (req, res) => {
  const { bookName, category, rentPerDay } = req.body;
  const uniqueIdentifier = `book-${new mongoose.Types.ObjectId()}`;
  const newBook = new Book({
    bookName,
    category,
    rentPerDay,
    uniqueIdentifier,
  });
  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get books by name
const getBooksByName = async (req, res) => {
  const { term } = req.params;
  try {
    const books = await Book.find({ bookName: new RegExp(term, "i") });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get books by category, name, and rent per day range (opt)
const getBooksByCategoryAndTermAndRent = async (req, res) => {
  const { category, term, min, max } = req.params;
  const query = {};

  if (category && category !== "undefined") query.category = category;
  if (term && term !== "undefined") query.bookName = new RegExp(term, "i");
  if (min !== "undefined" || max !== "undefined") {
    query.rentPerDay = {};
    if (min !== "undefined") query.rentPerDay.$gte = min;
    if (max !== "undefined") query.rentPerDay.$lte = max;
  }

  try {
    const books = await Book.find(query);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBooksByRentRange,
  addBook,
  getBooksByName,
  getBooksByCategoryAndTermAndRent,
};
