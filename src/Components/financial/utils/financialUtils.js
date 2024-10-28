// Date formatting utilities
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const calculateDaysUntil = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Financial calculations
export const calculateTotalCosts = (financialInfo) => {
  return (
    financialInfo.tuitionFees +
    financialInfo.accommodation +
    financialInfo.mealPlan
  );
};

export const calculatePercentage = (amount, total) => {
  return ((amount / total) * 100).toFixed(1);
};

// Constants
export const PAYMENT_STATUSES = {
  PAID: "Paid",
  PENDING: "Pending",
  OVERDUE: "Overdue",
  UPCOMING: "Upcoming",
};

export const PAYMENT_TYPES = {
  DEBIT: "debit",
  CREDIT: "credit",
};

export const CHART_COLORS = {
  primary: "#3b82f6",
  secondary: "#10b981",
  accent: "#f59e0b",
  danger: "#ef4444",
  neutral: "#6b7280",
};

export const TIME_PERIODS = {
  MONTHLY: "monthly",
  QUARTERLY: "quarterly",
  YEARLY: "yearly",
};

// Validation utilities
export const validatePaymentAmount = (amount, balance) => {
  if (amount <= 0) return false;
  if (amount > balance) return false;
  return true;
};

export const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return end > start;
};

// Data processing utilities
export const groupTransactionsByMonth = (transactions) => {
  return transactions.reduce((grouped, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }

    grouped[monthYear].push(transaction);
    return grouped;
  }, {});
};

export const calculateMonthlyStats = (transactions) => {
  const groupedTransactions = groupTransactionsByMonth(transactions);

  return Object.entries(groupedTransactions).map(
    ([monthYear, transactions]) => {
      const totalDebits = transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const totalCredits = transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        monthYear,
        totalDebits,
        totalCredits,
        netAmount: totalCredits - totalDebits,
        transactionCount: transactions.length,
      };
    }
  );
};

// Format currency with appropriate symbol
export const formatCurrency = (amount, currency = "ZAR") => {
  const currencyFormatter = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return currencyFormatter.format(amount);
};
