import React, { useState } from "react";
import { Search, Download, FileText, Filter } from "lucide-react";

function TransactionHistoryTab({ financialInfo, formatAmount }) {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filterTransactions = () => {
    let filtered = [...financialInfo.transactions];

    // Filter by period
    if (selectedPeriod !== "all") {
      const today = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 6);

      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return selectedPeriod === "current"
          ? transactionDate >= sixMonthsAgo
          : transactionDate < sixMonthsAgo;
      });
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((transaction) =>
        selectedType === "debit"
          ? transaction.amount < 0
          : transaction.amount > 0
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort transactions
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  };

  const getTotalsByType = () => {
    const totals = financialInfo.transactions.reduce(
      (acc, transaction) => {
        if (transaction.amount < 0) {
          acc.debits += Math.abs(transaction.amount);
        } else {
          acc.credits += transaction.amount;
        }
        return acc;
      },
      { debits: 0, credits: 0 }
    );

    return totals;
  };

  const handleDownloadStatement = () => {
    // Implement statement download logic
    console.log("Downloading statement...");
  };

  const totals = getTotalsByType();

  return (
    <div className="transaction-history-tab">
      {/* Summary Cards */}
      <div className="transaction-summary">
        <div className="summary-card">
          <h4>Total Payments</h4>
          <p className="amount debit">{formatAmount(totals.debits)}</p>
          <span className="period-label">This Period</span>
        </div>
        <div className="summary-card">
          <h4>Total Credits</h4>
          <p className="amount credit">{formatAmount(totals.credits)}</p>
          <span className="period-label">This Period</span>
        </div>
        <div className="summary-card">
          <h4>Net Balance</h4>
          <p className="amount">
            {formatAmount(totals.credits - totals.debits)}
          </p>
          <span className="period-label">This Period</span>
        </div>
      </div>

      {/* Controls Section */}
      <div className="controls">
        <div className="registration-search-filters">
          <div className="registration-search-bar">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-select"
          >
            <option value="all">All Time</option>
            <option value="current">Last 6 Months</option>
            <option value="previous">Older than 6 Months</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="type-select"
          >
            <option value="all">All Types</option>
            <option value="debit">Payments</option>
            <option value="credit">Credits</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">All Categories</option>
            <option value="tuition">Tuition</option>
            <option value="housing">Housing</option>
            <option value="meals">Meal Plan</option>
            <option value="fees">Fees</option>
          </select>
        </div>

        <div className="action-buttons">
          <button
            className="sort-button"
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          >
            {sortOrder === "desc" ? "Newest First" : "Oldest First"}
          </button>
          <button className="download-button" onClick={handleDownloadStatement}>
            <Download size={16} />
            Download Statement
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Reference</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterTransactions().map((transaction, index) => (
              <tr
                key={index}
                className={transaction.amount < 0 ? "debit" : "credit"}
              >
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.description}</td>
                <td>{`REF-${Math.random().toString(36).substr(2, 9)}`}</td>
                <td className="amount">
                  {formatAmount(Math.abs(transaction.amount))}
                </td>
                <td>
                  <span
                    className={`status ${
                      transaction.amount < 0 ? "paid" : "received"
                    }`}
                  >
                    {transaction.amount < 0 ? "Paid" : "Received"}
                  </span>
                </td>
                <td>
                  <button className="action-button">
                    <FileText size={14} />
                    Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionHistoryTab;
