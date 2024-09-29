import React, { useEffect, useState } from "react";
import booksApi from "../../api/books"; 
import BookCard from "./BookCard";
import AddBookModal from "./AddBookModal";
import BookTransactionModal from "./BookTransactionModal"; 
import SearchFilter from "./SearchFilter";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isIssue, setIsIssue] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [minRent, setMinRent] = useState(0);
  const [maxRent, setMaxRent] = useState(100);

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await booksApi.fetchAllBooks(); 
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Handle book search and filter
  const handleSearchAndFilter = async () => {
    try {
      const filteredBooks = await booksApi.searchBooks(category, searchTerm, minRent, maxRent); 
      setBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div>
      <h1>Books</h1>
      <button className="btn btn-primary mb-4" onClick={() => setShowAddBookModal(true)}>
        Add New Book
      </button>
      <SearchFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        minRent={minRent}
        setMinRent={setMinRent}
        maxRent={maxRent}
        setMaxRent={setMaxRent}
        category={category}
        setCategory={setCategory}
        handleSearchAndFilter={handleSearchAndFilter}
      />
      <div className="row">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard 
              key={book._id}
              book={book}
              setSelectedBook={setSelectedBook}
              setShowTransactionModal={setShowTransactionModal}
              setIsIssue={setIsIssue}
            />
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
      <AddBookModal 
        show={showAddBookModal} 
        onClose={() => setShowAddBookModal(false)} 
      />
      <BookTransactionModal 
        show={showTransactionModal} 
        onClose={() => setShowTransactionModal(false)} 
        selectedBook={selectedBook} 
        isIssue={isIssue} 
      />
    </div>
  );
};

export default BooksPage;
