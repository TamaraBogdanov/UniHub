import React, { useState } from "react";
import {
  DollarSign,
  FileText,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Info,
  Clock,
} from "lucide-react";

function OverviewTab({ financialInfo, saInfo, formatAmount }) {
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);

  const calculateTotalCosts = () => {
    return (
      financialInfo.tuitionFees +
      financialInfo.accommodation +
      financialInfo.mealPlan
    );
  };

  const calculateDaysUntil = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="overview-tab">
      <div className="financial-summary-grid">
        {/* Current Balance Card */}
        <div className="financial-summary-card balance-card">
          <div className="card-header">
            <h3>Current Balance</h3>
            <Info
              size={16}
              className="info-icon"
              title="Balance includes all charges and payments"
            />
          </div>
          <p className="amount">{formatAmount(financialInfo.accountBalance)}</p>
          <div className="balance-indicators">
            <div className="indicator">
              <span className="label">Payment Status</span>
              <span
                className={`status ${
                  financialInfo.accountBalance > 0 ? "pending" : "clear"
                }`}
              >
                {financialInfo.accountBalance > 0
                  ? "Payment Required"
                  : "Clear"}
              </span>
            </div>
            <div className="indicator">
              <span className="label">Next Due Date</span>
              <span className="date">
                {financialInfo.paymentPlan.installments.find(
                  (i) => i.status === "Upcoming"
                )?.dueDate || "No upcoming payments"}
              </span>
            </div>
          </div>
          <div className="card-actions">
            <button className="financial-primary-button">
              <DollarSign size={16} />
              Make Payment
            </button>
            <button className="financial-secondary-button">
              <FileText size={16} />
              View Statement
            </button>
          </div>
        </div>

        {/* Fees Breakdown Card */}
        <div className="financial-summary-card fees-breakdown">
          <div className="card-header">
            <h3>Fees Breakdown</h3>
            <button
              className="toggle-detail"
              onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
            >
              {showDetailedBreakdown ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
              {showDetailedBreakdown ? "Less Detail" : "More Detail"}
            </button>
          </div>
          <div className="fee-items">
            <div className="fee-item">
              <span>Tuition</span>
              <span>{formatAmount(financialInfo.tuitionFees)}</span>
            </div>
            {showDetailedBreakdown && (
              <div className="fee-details">
                <div className="fee-subitem">
                  <span>Base Tuition</span>
                  <span>{formatAmount(financialInfo.tuitionFees * 0.8)}</span>
                </div>
                <div className="fee-subitem">
                  <span>Laboratory Fees</span>
                  <span>{formatAmount(financialInfo.tuitionFees * 0.15)}</span>
                </div>
                <div className="fee-subitem">
                  <span>Technology Fee</span>
                  <span>{formatAmount(financialInfo.tuitionFees * 0.05)}</span>
                </div>
              </div>
            )}
            <div className="fee-item">
              <span>Accommodation</span>
              <span>{formatAmount(financialInfo.accommodation)}</span>
            </div>
            {showDetailedBreakdown && (
              <div className="fee-details">
                <div className="fee-subitem">
                  <span>Room Rent</span>
                  <span>
                    {formatAmount(financialInfo.accommodation * 0.85)}
                  </span>
                </div>
                <div className="fee-subitem">
                  <span>Utilities</span>
                  <span>
                    {formatAmount(financialInfo.accommodation * 0.15)}
                  </span>
                </div>
              </div>
            )}
            <div className="fee-item">
              <span>Meal Plan</span>
              <span>{formatAmount(financialInfo.mealPlan)}</span>
            </div>
            <div className="fee-item total">
              <span>Total</span>
              <span>{formatAmount(calculateTotalCosts())}</span>
            </div>
          </div>
        </div>

        {/* NSFAS Card */}
        {saInfo.nsfasStatus === "Funded" && (
          <div className="financial-summary-card nsfas-card">
            <div className="card-header">
              <h3>NSFAS Funding</h3>
              <span className="status-badge funded">Funded</span>
            </div>
            <div className="funding-progress">
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${
                      (Object.values(saInfo.nsfasAllowances).reduce(
                        (a, b) => a + b,
                        0
                      ) /
                        calculateTotalCosts()) *
                      100
                    }%`,
                  }}
                />
              </div>
              <span className="progress-label">Coverage</span>
            </div>
            <div className="nsfas-details">
              {Object.entries(saInfo.nsfasAllowances).map(([key, value]) => (
                <div key={key} className="nsfas-item">
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span>{formatAmount(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Payments Section */}
      <div className="upcoming-payments">
        <div className="financial-section-header">
          <h3>Upcoming Payments</h3>
          <button className="view-all-button">
            View All
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="payments-list">
          {financialInfo.paymentPlan.installments
            .filter((payment) => payment.status === "Upcoming")
            .map((payment, index) => (
              <div key={index} className="payment-item">
                <div className="payment-info">
                  <p className="payment-date">{payment.dueDate}</p>
                  <p className="payment-amount">
                    {formatAmount(payment.amount)}
                  </p>
                </div>
                <div className="payment-status">
                  <Clock size={16} />
                  <span>Due in {calculateDaysUntil(payment.dueDate)} days</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default OverviewTab;
