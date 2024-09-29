import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL; 

// Create Book
const createBook = async (newBook) => {
  const response = await axios.post(`${apiUrl}/api/books`, newBook);
  return response.data;
};

// Fetch Book
const fetchAllBooks = async () => {
  const response = await axios.get(`${apiUrl}/api/books/all`);
  return response.data;
};

// Search Book
const searchBooks = async (category, searchTerm, minRent, maxRent) => {
  const url = `${apiUrl}/api/books/category/${category || "undefined"}/term/${searchTerm || "undefined"}/rent/${minRent || "undefined"}/${maxRent || "undefined"}`;
  const response = await axios.get(url);
  return response.data;
};

export default {
  fetchAllBooks,
  searchBooks,
  createBook,
};
