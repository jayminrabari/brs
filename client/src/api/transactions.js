import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL; 

// Issue Book
const issueBook = async (transactionData) => {
  const response = await axios.post(`${apiUrl}/api/transactions/issue`, transactionData);
  return response.data;
};

// Return Book
const returnBook = async (transactionData) => {
  const response = await axios.post(`${apiUrl}/api/transactions/return`, transactionData);
  return response.data;
};

// Transactions Checked
const checkTransaction = async (bookName, email) => {
  const response = await axios.get(`${apiUrl}/api/transactions/check?bookName=${bookName}&email=${email}`);
  return response.data;
};

// Search Filter
const fetchTransactions = async (filters) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
  
    const response = await axios.get(`${apiUrl}/api/transactions/search?${params.toString()}`);
    return response.data;
};

export default {
  issueBook,
  returnBook,
  checkTransaction,
  fetchTransactions,
};
