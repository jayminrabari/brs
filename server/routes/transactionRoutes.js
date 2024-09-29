const express = require('express');
const {
    issueBook,
    returnBook,
    getTransactionsByBook,
    getTotalRentByBook, 
    getBooksIssuedToUser,
    getTransactionsByDateRange,
    getAllTransactions,
    checkBookStatus,
    getTransactions,
    
} = require('../controllers/transactionController');

const router = express.Router();

router.post('/issue', issueBook); // Issue book
router.post('/return', returnBook); // Return book
router.get('/book/:bookName', getTransactionsByBook); // Transactions by book
router.get('/total-rent/:bookName', getTotalRentByBook); // rent by book (temp opt)
router.get('/date-range', getTransactionsByDateRange); // transactions by date
router.get('/all', getAllTransactions); // All transaction (pep)
router.get('/check', checkBookStatus); // StaTus ChecK (main)
router.get('/user/name/:userName', getBooksIssuedToUser); // Book issued to user (opt)
router.get('/search', getTransactions); // Combined search route (main)

module.exports = router;
