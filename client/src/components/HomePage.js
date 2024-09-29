import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center">
      <h1>Welcome to the Book Rental System</h1>
      <p>Manage your books and transactions with ease.</p>
      <div className="d-flex flex-column flex-md-row justify-content-center">
        <Link to="/books" className="btn btn-primary mx-2 mb-2 mb-md-0">View Books</Link>
        <Link to="/users" className="btn btn-secondary mx-2 mb-2 mb-md-0">View Users</Link>
        <Link to="/transactions" className="btn btn-success mx-2 mb-2 mb-md-0">View Transactions</Link>
      </div>
    </div>
  );
};

export default HomePage;
