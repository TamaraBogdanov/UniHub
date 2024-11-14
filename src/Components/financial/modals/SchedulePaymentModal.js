import React, { useState } from "react";
import { X, Calendar } from "lucide-react";

function SchedulePaymentModal({ onClose, onSchedule, amount, formatAmount }) {
  const [scheduleDetails, setScheduleDetails] = useState({
    date: "",
    time: "09:00",
    amount: amount,
    email: "",
    sendReminder: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScheduleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setScheduleDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await onSchedule(scheduleDetails);
      onClose();
    } catch (error) {
      console.error("Schedule payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="payment-modal-content schedule-modal">
        <div className="modal-header">
          <h3>Schedule Payment</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Payment Date</label>
              <input
                type="date"
                name="date"
                value={scheduleDetails.date}
                onChange={handleScheduleInput}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Payment Time</label>
              <input
                type="time"
                name="time"
                value={scheduleDetails.time}
                onChange={handleScheduleInput}
                required
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={scheduleDetails.amount}
                onChange={handleScheduleInput}
                max={amount}
                required
              />
            </div>

            <div className="form-group">
              <label>Email for Confirmation</label>
              <input
                type="email"
                name="email"
                value={scheduleDetails.email}
                onChange={handleScheduleInput}
                placeholder="your@email.com"
                required
              />
            </div>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="sendReminder"
                checked={scheduleDetails.sendReminder}
                onChange={handleScheduleInput}
              />
              Send me a reminder 24 hours before
            </label>

            <div className="payment-summary">
              <div className="summary-row">
                <span>Scheduled Amount</span>
                <span className="amount">
                  {formatAmount(scheduleDetails.amount)}
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="secondary-button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="primary-button"
                disabled={isProcessing}
              >
                {isProcessing ? "Scheduling..." : "Schedule Payment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SchedulePaymentModal;
