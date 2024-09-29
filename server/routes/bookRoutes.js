const express = require('express');
const { getBooks, getBooksByName, getBooksByRentRange, addBook, getBooksByCategoryAndTermAndRent } = require('../controllers/bookController');

const router = express.Router();

router.get('/all', getBooks); // Get all books
router.get('/rent/:min/:max', getBooksByRentRange); // Get books by rent
router.post('/', addBook); // Add new book
router.get('/search/:term', getBooksByName); // Search by book name
router.get('/category/:category/term/:term/rent/:min/:max', getBooksByCategoryAndTermAndRent); 
// Get books by category, term, and rent

module.exports = router;
