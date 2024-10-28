import React, { useState, useEffect } from "react";
import {
  DollarSign,
  PieChart,
  Wallet,
  Award,
  Clock,
  BarChart,
  BellRing,
  Printer,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { studentData } from "../Mockdata/studentData";

// Import Tab Components
import OverviewTab from "./financial/tabs/OverviewTab";
import PaymentsTab from "./financial/tabs/PaymentsTab";
import ScholarshipsTab from "./financial/tabs/ScholarshipsTab";
import TransactionHistoryTab from "./financial/tabs/TransactionHistoryTab";
import AnalyticsTab from "./financial/tabs/AnalyticsTab";

// Import Modal Components
import PaymentReminderModal from "./financial/modals/PaymentReminderModal";
import PaymentPlanSetupModal from "./financial/modals/PaymentPlanSetupModal";

// Import styles
import "../Styles/FinancialInformation.css";

// Exchange rates (could be moved to a constants file)
const exchangeRates = {
  USD: 0.054,
  EUR: 0.049,
  GBP: 0.042,
  NGN: 49.73,
};

function FinancialInformationContent() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCurrency, setSelectedCurrency] = useState("ZAR");
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const { financialInfo, saInfo } = studentData;

  useEffect(() => {
    const checkUpcomingPayments = () => {
      const upcomingPayments = financialInfo.paymentPlan.installments
        .filter((payment) => payment.status === "Upcoming")
        .map((payment) => {
          const daysUntil = calculateDaysUntil(payment.dueDate);
          if (daysUntil <= 7 && daysUntil > 0) {
            return {
              id: Date.now(),
              type: "payment",
              message: `Payment of R${payment.amount.toLocaleString()} due in ${daysUntil} days`,
              dueDate: payment.dueDate,
            };
          }
          return null;
        })
        .filter(Boolean);

      setNotifications((prev) => [...prev, ...upcomingPayments]);
    };

    checkUpcomingPayments();
    const interval = setInterval(checkUpcomingPayments, 86400000);
    return () => clearInterval(interval);
  }, [financialInfo.paymentPlan.installments]);

  const convertAmount = (amount) => {
    if (selectedCurrency === "ZAR") return amount;
    return amount * exchangeRates[selectedCurrency];
  };

  const formatAmount = (amount) => {
    const converted = convertAmount(amount);
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: selectedCurrency,
    }).format(converted);
  };

  return (
    <div className="financial-information-content">
      {/* Top Bar */}
      <div className="financial-header">
        <div className="header-left">
          <h1>Financial Information</h1>
          <div className="currency-selector">
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="currency-select"
            >
              <option value="ZAR">ZAR - South African Rand</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="NGN">NGN - Nigerian Naira</option>
            </select>
          </div>
        </div>
        <div className="header-actions">
          <button
            className="financial-action-button"
            onClick={() => setShowReminderModal(true)}
          >
            <BellRing size={20} />
            Set Payment Reminder
          </button>
          <button
            className="financial-action-button"
            onClick={() => window.print()}
          >
            <Printer size={20} />
            Print Statement
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="notifications-banner">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <AlertTriangle size={16} />
              <span>{notification.message}</span>
              <button
                className="dismiss-notification"
                onClick={() =>
                  setNotifications((prev) =>
                    prev.filter((n) => n.id !== notification.id)
                  )
                }
              >
                <XCircle size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="forms-tabs">
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <PieChart size={20} />
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === "payments" ? "active" : ""}`}
          onClick={() => setActiveTab("payments")}
        >
          <Wallet size={20} />
          Payments & Plans
        </button>
        <button
          className={`tab-button ${
            activeTab === "scholarships" ? "active" : ""
          }`}
          onClick={() => setActiveTab("scholarships")}
        >
          <Award size={20} />
          Scholarships & Aid
        </button>
        <button
          className={`tab-button ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          <Clock size={20} />
          Transaction History
        </button>
        <button
          className={`tab-button ${activeTab === "analytics" ? "active" : ""}`}
          onClick={() => setActiveTab("analytics")}
        >
          <BarChart size={20} />
          Financial Analytics
        </button>
      </div>

      {/* Main Content */}
      <div className="tab-content">
        {activeTab === "overview" && (
          <OverviewTab
            financialInfo={financialInfo}
            saInfo={saInfo}
            formatAmount={formatAmount}
          />
        )}
        {activeTab === "payments" && (
          <PaymentsTab
            financialInfo={financialInfo}
            formatAmount={formatAmount}
          />
        )}
        {activeTab === "scholarships" && (
          <ScholarshipsTab
            financialInfo={financialInfo}
            saInfo={saInfo}
            formatAmount={formatAmount}
          />
        )}
        {activeTab === "history" && (
          <TransactionHistoryTab
            financialInfo={financialInfo}
            formatAmount={formatAmount}
          />
        )}
        {activeTab === "analytics" && (
          <AnalyticsTab
            financialInfo={financialInfo}
            formatAmount={formatAmount}
          />
        )}
      </div>

      {/* Modals */}
      {showReminderModal && (
        <PaymentReminderModal
          onClose={() => setShowReminderModal(false)}
          upcomingPayments={financialInfo.paymentPlan.installments.filter(
            (payment) => payment.status === "Upcoming"
          )}
          formatAmount={formatAmount}
        />
      )}
    </div>
  );
}

function calculateDaysUntil(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export default FinancialInformationContent;
