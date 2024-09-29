import React, { useEffect, useState, useCallback } from "react";
import transactionsApi from "../../api/transactions"; 
import TransactionFilters from "./TransactionFilters";
import TransactionList from "./TransactionList";
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    bookName: "",
    userName: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalRent, setTotalRent] = useState(0);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await transactionsApi.fetchTransactions(filters); 
      setTransactions(data);
      calculateTotalRent(data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions. Please try again.");
    }

    setLoading(false);
  }, [filters]);

  const calculateTotalRent = (transactions) => {
    const rent = transactions.reduce((sum, transaction) => {
      return sum + (transaction.rentCharged || 0);
    }, 0);
    setTotalRent(rent);
  };

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <div>
      <h1>Transactions</h1>
      <TransactionFilters filters={filters} setFilters={setFilters} fetchTransactions={loadTransactions} />
      <LoadingIndicator loading={loading} />
      <ErrorMessage error={error} />
      <div className="mb-3">
        <strong>Total Rent: </strong>${totalRent.toFixed(2)}
      </div>
      <TransactionList transactions={transactions} loading={loading} />
    </div>
  );
};

export default TransactionsPage;
