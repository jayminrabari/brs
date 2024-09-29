import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import BooksPage from "./components/BooksPage/BooksPage";
import UsersPage from "./components/UsersPage";
import TransactionsPage from "./components/TransactionsPage/TransactionsPage";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
