import React, { useState } from "react";
import {
  X,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

function PaymentPlanSetupModal({
  onClose,
  planType,
  planDetails,
  formatAmount,
}) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [preferredDay, setPreferredDay] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Generate payment schedule based on plan details
  const generateSchedule = () => {
    if (!selectedStartDate) return [];

    const startDate = new Date(selectedStartDate);
    const schedule = [];
    const installmentAmount = planDetails.installmentAmount;
    const numberOfInstallments =
      planType === "early" ? 1 : planDetails.installments;

    for (let i = 0; i < numberOfInstallments; i++) {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + i);
      date.setDate(parseInt(preferredDay));

      schedule.push({
        date: date.toISOString().split("T")[0],
        amount: installmentAmount,
        installmentNumber: i + 1,
      });
    }

    return schedule;
  };

  const handleSubmit = () => {
    if (!agreedToTerms || !selectedStartDate) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
    }, 1500);
  };

  if (showConfirmation) {
    return (
      <div className="modal-overlay">
        <div className="modal-content payment-plan-modal success">
          <div className="success-message">
            <CheckCircle size={48} className="success-icon" />
            <h3>Payment Plan Set Up Successfully!</h3>
            <p>Your first payment is scheduled for {selectedStartDate}</p>
            <button className="financial-primary-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content payment-plan-modal">
        <div className="modal-header">
          <h3>Setup Payment Plan</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Plan Summary */}
          <div className="plan-summary">
            <h4>Plan Details</h4>
            <div className="summary-details">
              <div className="detail-item">
                <span>Plan Type</span>
                <span>{planType}</span>
              </div>
              <div className="detail-item">
                <span>Total Amount</span>
                <span>{formatAmount(planDetails.totalAmount)}</span>
              </div>
              {planType !== "early" && (
                <>
                  <div className="detail-item">
                    <span>Number of Installments</span>
                    <span>{planDetails.installments}</span>
                  </div>
                  <div className="detail-item">
                    <span>Monthly Payment</span>
                    <span>{formatAmount(planDetails.installmentAmount)}</span>
                  </div>
                </>
              )}
              {planDetails.interest > 0 && (
                <div className="detail-item">
                  <span>Interest Amount</span>
                  <span>{formatAmount(planDetails.interest)}</span>
                </div>
              )}
              {planDetails.savings > 0 && (
                <div className="detail-item savings">
                  <span>Your Savings</span>
                  <span>-{formatAmount(planDetails.savings)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Schedule Setup */}
          <div className="schedule-setup">
            <h4>Payment Schedule</h4>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={selectedStartDate}
                onChange={(e) => setSelectedStartDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="date-input"
              />
            </div>

            <div className="form-group">
              <label>Preferred Payment Day</label>
              <select
                value={preferredDay}
                onChange={(e) => setPreferredDay(e.target.value)}
                className="day-select"
              >
                {[1, 5, 10, 15, 20, 25].map((day) => (
                  <option key={day} value={day}>
                    {day}th of each month
                  </option>
                ))}
              </select>
            </div>

            {/* Generated Schedule Preview */}
            {selectedStartDate && (
              <div className="schedule-preview">
                <h5>Payment Schedule Preview</h5>
                <div className="schedule-list">
                  {generateSchedule().map((payment, index) => (
                    <div key={index} className="schedule-item">
                      <div className="schedule-date">
                        <Calendar size={16} />
                        {new Date(payment.date).toLocaleDateString()}
                      </div>
                      <div className="schedule-amount">
                        <DollarSign size={16} />
                        {formatAmount(payment.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Important Information */}
          <div className="important-info">
            <div className="info-header">
              <Info size={16} />
              <h4>Important Information</h4>
            </div>
            <ul>
              <li>
                Payments will be automatically deducted on the selected dates
              </li>
              <li>A failed payment may result in plan cancellation</li>
              <li>
                Early payment penalties may apply if canceled before completion
              </li>
            </ul>
          </div>

          {/* Terms Agreement */}
          <div className="terms-agreement">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              I understand and agree to the payment plan terms and conditions
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <button className="financial-secondary-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="financial-primary-button"
            onClick={handleSubmit}
            disabled={!agreedToTerms || !selectedStartDate || isSubmitting}
          >
            {isSubmitting ? "Setting up..." : "Confirm Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPlanSetupModal;
