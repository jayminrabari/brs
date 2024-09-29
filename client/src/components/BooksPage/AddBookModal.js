import React, { useState } from "react";
import booksApi from "../../api/books"; 

const AddBookModal = ({ show, onClose }) => {
  const [newBook, setNewBook] = useState({
    bookName: "",
    category: "",
    rentPerDay: "",
  });

  const handleAddBook = async () => {
    try {
      await booksApi.createBook(newBook); 
      alert("Book added successfully!");
      onClose(); 
      setNewBook({ bookName: "", category: "", rentPerDay: "" }); 
    } catch (error) {
      console.error("Error adding book:", error);
      alert("An error occurred while adding the book. Please try again.");
    }
  };

  if (!show) return null;

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Book</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              placeholder="Book Name"
              value={newBook.bookName}
              onChange={(e) => setNewBook({ ...newBook, bookName: e.target.value })}
              className="form-control mb-2"
            />
            <input
              type="text"
              placeholder="Category"
              value={newBook.category}
              onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
              className="form-control mb-2"
            />
            <input
              type="number"
              placeholder="Rent Per Day"
              value={newBook.rentPerDay}
              onChange={(e) => setNewBook({ ...newBook, rentPerDay: e.target.value })}
              className="form-control mb-2"
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleAddBook}>
              Add Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
