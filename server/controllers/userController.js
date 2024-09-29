const User = require('../models/userModel');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new user
const addUser = async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  addUser,
};
