// Payment status enums
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
};

// Payment method types
export const PAYMENT_METHODS = {
  CARD: "card",
  EFT: "eft",
  EWALLET: "ewallet",
};

// Bank list for EFT
export const BANK_LIST = [
  { id: "fnb", name: "FNB", code: "250655" },
  { id: "standard", name: "Standard Bank", code: "051001" },
  { id: "absa", name: "ABSA", code: "632005" },
  { id: "nedbank", name: "Nedbank", code: "198765" },
  { id: "capitec", name: "Capitec", code: "470010" },
];

// Simulate payment processing
export const processPayment = async (paymentDetails) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate success rate (90% success)
  const isSuccess = Math.random() < 0.9;

  if (!isSuccess) {
    throw new Error("Payment failed. Please try again.");
  }

  return {
    transactionId: `TXN-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`,
    status: PAYMENT_STATUS.COMPLETED,
    timestamp: new Date().toISOString(),
    ...paymentDetails,
  };
};

// Local storage helpers
export const paymentStorage = {
  getPayments: () => {
    return JSON.parse(localStorage.getItem("payments") || "[]");
  },

  savePayment: (payment) => {
    const payments = paymentStorage.getPayments();
    payments.push(payment);
    localStorage.setItem("payments", JSON.stringify(payments));
  },

  getActivePlan: () => {
    return JSON.parse(localStorage.getItem("activePlan") || "null");
  },

  savePlan: (plan) => {
    localStorage.setItem("activePlan", JSON.stringify(plan));
  },

  getSavedCards: () => {
    return JSON.parse(localStorage.getItem("savedCards") || "[]");
  },

  saveCard: (card) => {
    const cards = paymentStorage.getSavedCards();
    cards.push(card);
    localStorage.setItem("savedCards", JSON.stringify(cards));
  },
};
