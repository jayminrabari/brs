const Transaction = require("../models/transactionModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

// Issue Book
const issueBook = async (req, res) => {
  const { bookName, email, issueDate, duration } = req.body;
  try {
    const book = await Book.findOne({ uniqueIdentifier: bookName });
    const user = await User.findOne({ email });

    if (!book) return res.status(404).json({ message: "Book not found" });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the book is currently issued
    const existingTransaction = await Transaction.findOne({
      book: book._id,
      returnDate: null,
    }).populate('user');

    // If the book is currently issued and has not been returned, prevent issuing
    if (existingTransaction) {
      return res.status(400).json({
        message: `Book is currently issued to ${existingTransaction.user.email}. Please wait for the return.`,
      });
    }

    // Parse issue date
    const issueDateParsed = issueDate ? new Date(issueDate) : new Date();

    // Create new transaction
    const transaction = new Transaction({
      book: book._id,
      user: user._id,
      issueDate: issueDateParsed,
      returnDate: null,
      duration,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Return Book
const returnBook = async (req, res) => {
  const { bookName, email, returnDate } = req.body;

  try {
    const book = await Book.findOne({ uniqueIdentifier: bookName });
    const user = await User.findOne({ email });

    if (!book) return res.status(404).json({ message: "Book not found" });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find the active transaction for this book and user
    const transaction = await Transaction.findOne({
      book: book._id,
      user: user._id,
      returnDate: null, // Ensure we're looking for a transaction that has not been returned
    });

    // Check if the transaction exists and has not been returned
    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found or book already returned",
      });
    }

    // Parse return date
    const returnDateParsed = returnDate ? new Date(returnDate) : new Date();
    transaction.returnDate = returnDateParsed;

    // Calculate rent charged
    const issueDate = new Date(transaction.issueDate);
    const daysRented =
      Math.ceil((returnDateParsed - issueDate) / (1000 * 60 * 60 * 24)) + 1;
    const rentCharged = Math.max(1, daysRented) * book.rentPerDay;
    transaction.rentCharged = rentCharged;

    await transaction.save();

    res.status(200).json({
      message: "Book returned successfully",
      transaction,
    });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({
      message: "Error returning book",
      error: error.message,
    });
  }
};

// Check status
const checkBookStatus = async (req, res) => {
  const { bookName, email } = req.query;

  try {
    const book = await Book.findOne({ uniqueIdentifier: bookName });
    const user = await User.findOne({ email });

    if (!book) return res.status(404).json({ message: "Book not found" });
    if (!user) return res.status(404).json({ message: "User not found" });

    const transaction = await Transaction.findOne({
      book: book._id,
      user: user._id,
    }).sort({ createdAt: -1 });

    // Determine if the book is issued and/or returned
    const issued = transaction && !transaction.returnDate;
    const returned = transaction && transaction.returnDate;

    res.status(200).json({ issued, returned });
  } catch (error) {
    res.status(500).json({ message: "Error checking transaction status", error: error.message });
  }
};

// Get transactions
const getTransactionsByBook = async (req, res) => {
  const { bookName } = req.params;
  try {
    const book = await Book.findOne({ bookName });
    if (!book) return res.status(404).json({ message: "Book not found" });

    const transactions = await Transaction.find({ book: book._id })
      .populate("user", "name email")
      .populate("book");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get rent
const getTotalRentByBook = async (req, res) => {
  const { bookName } = req.params;
  try {
    const book = await Book.findOne({ bookName });
    if (!book) return res.status(404).json({ message: "Book not found" });

    const totalRent = await Transaction.aggregate([
      { $match: { book: book._id, rentCharged: { $exists: true } } },
      { $group: { _id: null, total: { $sum: "$rentCharged" } } },
    ]);
    res.status(200).json(totalRent.length ? totalRent[0].total : 0);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get book issued to user
const getBooksIssuedToUser = async (req, res) => {
  const { userName, bookName } = req.query; // Adjust to accept query params
  try {
    const user = await User.findOne({
      name: { $regex: new RegExp(userName, "i") },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const query = { user: user._id };

    if (bookName) {
      const book = await Book.findOne({ uniqueIdentifier: bookName });
      if (book) {
        query.book = book._id;
      } else {
        return res.status(404).json({ message: "Book not found" });
      }
    }

    const transactions = await Transaction.find(query)
      .populate("book")
      .populate("user");

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transactions by range
const getTransactionsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const transactions = await Transaction.find({
      issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).populate("book user", "bookName name email");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all transaction
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("book", "bookName category")
      .populate("user", "name email");

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Combined Filter
const getTransactions = async (req, res) => {
  const { userName, bookName, startDate, endDate } = req.query;

  try {
    const query = {};

    // Check for userName
    if (userName) {
      const user = await User.findOne({
        name: { $regex: new RegExp(userName, "i") },
      });
      if (!user) return res.status(404).json({ message: "User not found" });
      query.user = user._id; // Add user ID to query
    }

    // Check for bookName
    if (bookName) {
      const book = await Book.findOne({ bookName });
      if (!book) return res.status(404).json({ message: "Book not found" });
      query.book = book._id; // Add book ID to query
    }

    // Check for date range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Validate dates
      if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({ message: "Invalid date format" });
      }

      query.issueDate = { $gte: start, $lte: end };
    }

    // Find transactions based on the constructed query
    const transactions = await Transaction.find(query)
      .populate("book user", "bookName name email");

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  issueBook,
  returnBook,
  getTransactionsByBook,
  getTotalRentByBook,
  getBooksIssuedToUser,
  getTransactionsByDateRange,
  getAllTransactions,
  checkBookStatus,
  getTransactions
};
