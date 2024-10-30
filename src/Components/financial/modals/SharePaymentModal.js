import React, { useState } from "react";
import { X, Copy, CheckCircle } from "lucide-react";

function SharePaymentModal({ onClose, amount, formatAmount, paymentRef }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const generateShareableLink = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/pay/${paymentRef}?amount=${amount}`;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content share-modal">
        <div className="modal-header">
          <h3>Share Payment Link</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="share-link-section">
            <h4>Payment Link</h4>
            <div className="link-display">
              <input
                type="text"
                value={generateShareableLink()}
                readOnly
                className="share-link-input"
              />
              <button
                className="copy-button"
                onClick={() => copyToClipboard(generateShareableLink())}
              >
                {copySuccess ? <CheckCircle size={16} /> : <Copy size={16} />}
              </button>
            </div>
            {copySuccess && (
              <span className="copy-success">Link copied to clipboard!</span>
            )}
          </div>

          <div className="share-options">
            <h4>Share via</h4>
            <div className="share-buttons">
              <button
                className="share-button whatsapp"
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(
                      generateShareableLink()
                    )}`,
                    "_blank"
                  )
                }
              >
                WhatsApp
              </button>
              <button
                className="share-button email"
                onClick={() =>
                  window.open(
                    `mailto:?subject=Payment Link&body=${encodeURIComponent(
                      generateShareableLink()
                    )}`,
                    "_blank"
                  )
                }
              >
                Email
              </button>
              <button
                className="share-button sms"
                onClick={() =>
                  window.open(
                    `sms:?body=${encodeURIComponent(generateShareableLink())}`,
                    "_blank"
                  )
                }
              >
                SMS
              </button>
            </div>
          </div>

          <div className="payment-info">
            <div className="info-row">
              <span>Amount:</span>
              <span>{formatAmount(amount)}</span>
            </div>
            <div className="info-row">
              <span>Valid for:</span>
              <span>24 hours</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SharePaymentModal;
