import React from "react";

const BookCard = ({ book, setSelectedBook, setShowTransactionModal, setIsIssue }) => (
  <div className="col-12 col-md-6 col-lg-4 mb-4">
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{book.bookName}</h5>
        <p className="card-text">Category: {book.category}</p>
        <p className="card-text">Rent Per Day: ${book.rentPerDay}</p>
        <div className="mt-auto">
          <button
            className="btn btn-success me-2"
            onClick={() => {
              setSelectedBook(book);
              setIsIssue(true);
              setShowTransactionModal(true);
            }}
          >
            Issue Book
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              setSelectedBook(book);
              setIsIssue(false);
              setShowTransactionModal(true);
            }}
          >
            Return Book
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default BookCard;
