import React, { useState } from "react";
import transactionsApi from "../../api/transactions"; 

const BookTransactionModal = ({ show, onClose, selectedBook, isIssue }) => {
  const [userEmail, setUserEmail] = useState("");
  const [transactionDate, setTransactionDate] = useState("");

  // Handle issuing or returning book
  const handleTransaction = async () => {
    try {
      const checkResponse = await transactionsApi.checkTransaction(selectedBook.uniqueIdentifier, userEmail); 

      if (isIssue) {
        if (checkResponse.issued && !checkResponse.returned) {
          alert("This book is already issued to you. Please return it before reissuing.");
          return;
        }
      } else {
        if (!checkResponse.issued) {
          alert("This book is not issued to this user.");
          return;
        }

        if (checkResponse.returned) {
          alert("This book has already been returned.");
          return;
        }
      }

      const transactionData = {
        bookName: selectedBook.uniqueIdentifier,
        email: userEmail,
        [isIssue ? "issueDate" : "returnDate"]: transactionDate || new Date().toISOString(),
      };

      if (isIssue) {
        await transactionsApi.issueBook(transactionData); 
      } else {
        await transactionsApi.returnBook(transactionData); 
      }

      alert(`Book ${isIssue ? "issued" : "returned"} successfully!`);
      onClose();
    } catch (error) {
      console.error(`Error during ${isIssue ? "issuing" : "returning"} book:`, error);
      
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // backend error message
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  if (!show) return null;

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isIssue ? "Issue Book" : "Return Book"}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              type="email"
              placeholder="User Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="date"
              className="form-control mb-2"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
            />
            <p>{isIssue ? "Issuing:" : "Returning:"} {selectedBook?.bookName}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-success" onClick={handleTransaction}>
              {isIssue ? "Issue" : "Return"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTransactionModal;
