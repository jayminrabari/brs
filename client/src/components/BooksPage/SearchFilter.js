import React from "react";

const SearchFilter = ({ searchTerm, setSearchTerm, minRent, setMinRent, maxRent, setMaxRent, category, setCategory, handleSearchAndFilter }) => {
  return (
    <div className="row mb-4">
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Search by book name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="col">
        <input
          type="number"
          className="form-control"
          placeholder="Min Rent"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
        />
      </div>
      <div className="col">
        <input
          type="number"
          className="form-control"
          placeholder="Max Rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
        />
      </div>
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="col">
        <button className="btn btn-primary" onClick={handleSearchAndFilter}>
          Search & Filter
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
