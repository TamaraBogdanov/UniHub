import React, { useState } from "react";
import {
  X,
  Mail,
  MessageSquare,
  Bell,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { formatDate } from "../utils/financialUtils";

function PaymentReminderModal({ onClose, upcomingPayments, formatAmount }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [reminderType, setReminderType] = useState("email");
  const [reminderDays, setReminderDays] = useState(7);
  const [reminderTime, setReminderTime] = useState("09:00");
  const [notificationMethods, setNotificationMethods] = useState({
    email: true,
    sms: false,
    push: false,
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSetReminder = () => {
    // In a real application, this would integrate with a notification service
    const reminderData = {
      paymentId: selectedPayment,
      reminderType,
      reminderDays,
      reminderTime,
      notificationMethods,
      payment: upcomingPayments.find(
        (p, index) => index === Number(selectedPayment)
      ),
    };

    console.log("Setting reminder:", reminderData);

    // Show success state
    setIsSuccess(true);

    // Close modal after delay
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="modal-overlay">
        <div className="payment-modal-content payment-reminder-modal success">
          <div className="success-message">
            <CheckCircle size={48} className="success-icon" />
            <h3>Reminder Set Successfully!</h3>
            <p>You'll be notified before your payment is due.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="payment-modal-content payment-reminder-modal">
        <div className="modal-header">
          <h3>Set Payment Reminder</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Payment Selection */}
          <div className="form-group">
            <label>Select Payment</label>
            <select
              value={selectedPayment || ""}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className="payment-select"
            >
              <option value="">Choose a payment</option>
              {upcomingPayments.map((payment, index) => (
                <option key={index} value={index}>
                  {formatDate(payment.dueDate)} - {formatAmount(payment.amount)}
                </option>
              ))}
            </select>
          </div>

          {/* Notification Methods */}
          <div className="form-group">
            <label>Notification Methods</label>
            <div className="notification-methods">
              <button
                className={`method-button ${
                  notificationMethods.email ? "active" : ""
                }`}
                onClick={() =>
                  setNotificationMethods((prev) => ({
                    ...prev,
                    email: !prev.email,
                  }))
                }
              >
                <Mail size={20} />
                Email
              </button>
              <button
                className={`method-button ${
                  notificationMethods.sms ? "active" : ""
                }`}
                onClick={() =>
                  setNotificationMethods((prev) => ({
                    ...prev,
                    sms: !prev.sms,
                  }))
                }
              >
                <MessageSquare size={20} />
                SMS
              </button>
              <button
                className={`method-button ${
                  notificationMethods.push ? "active" : ""
                }`}
                onClick={() =>
                  setNotificationMethods((prev) => ({
                    ...prev,
                    push: !prev.push,
                  }))
                }
              >
                <Bell size={20} />
                Push
              </button>
            </div>
          </div>

          {/* Reminder Timing */}
          <div className="form-group">
            <label>Remind Me</label>
            <div className="reminder-timing">
              <select
                value={reminderDays}
                onChange={(e) => setReminderDays(Number(e.target.value))}
                className="days-select"
              >
                <option value={1}>1 day before</option>
                <option value={3}>3 days before</option>
                <option value={7}>1 week before</option>
                <option value={14}>2 weeks before</option>
              </select>

              <select
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="time-select"
              >
                <option value="09:00">9:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="18:00">6:00 PM</option>
              </select>
            </div>
          </div>

          {/* Additional Options */}
          <div className="form-group">
            <label>Additional Options</label>
            <div className="additional-options">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                Repeat reminder daily until paid
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                Include payment details in reminder
              </label>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="financial-secondary-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="financial-primary-button"
            onClick={handleSetReminder}
            disabled={!selectedPayment}
          >
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentReminderModal;
