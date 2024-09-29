import React from "react";

const TransactionList = ({ transactions, loading }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Book</th>
          <th scope="col">User</th>
          <th scope="col">Issue Date</th>
          <th scope="col">Return Date</th>
          <th scope="col">Status</th>
          <th scope="col">Rent Charged</th>
        </tr>
      </thead>
      <tbody>
        {!loading && transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <tr key={transaction._id}>
              <th scope="row">{index + 1}</th>
              <td>{transaction.book?.bookName || "N/A"}</td>
              <td>{transaction.user?.name || "Unknown User"}</td>
              <td>{transaction.issueDate ? new Date(transaction.issueDate).toLocaleDateString() : "Unknown"}</td>
              <td>{transaction.returnDate ? new Date(transaction.returnDate).toLocaleDateString() : "Not Returned"}</td>
              <td>{transaction.returnDate ? "Returned" : "Issued"}</td>
              <td>${transaction.rentCharged || 0}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">{loading ? "Loading..." : "No transactions found"}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TransactionList;
