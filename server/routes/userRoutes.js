const express = require('express');
const { getUsers, addUser } = require('../controllers/userController');

const router = express.Router();

router.get('/all', getUsers); // Get all 
router.post('/', addUser); // Add new

module.exports = router;
