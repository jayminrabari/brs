import React from "react";

const TransactionFilters = ({ filters, setFilters, fetchTransactions }) => {
  return (
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control mb-2" 
          placeholder="Search by User Name"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />
        <input
          type="text"
          className="form-control" 
          placeholder="Search by Book Name"
          value={filters.bookName}
          onChange={(e) => setFilters({ ...filters, bookName: e.target.value })}
        />
      </div>
      <div className="col-md-6">
        <input
          type="date"
          className="form-control mb-2" 
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />
        <input
          type="date"
          className="form-control" 
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
        <button
          className="btn btn-secondary mt-2" 
          onClick={() => {
            setFilters({ bookName: "", userName: "", startDate: "", endDate: "" });
            fetchTransactions();
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default TransactionFilters;
