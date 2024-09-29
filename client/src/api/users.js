import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL; 

// Fetch Users
const fetchUsers = async () => {
  const response = await axios.get(`${apiUrl}/api/users/all`);
  return response.data;
};

export default {
  fetchUsers,
};
