import React, { useState, useEffect } from "react";
import {
  CreditCard,
  FileText,
  Wallet,
  DollarSign,
  Calendar,
  Share2,
  CheckCircle,
  AlertTriangle,
  Clock,
  X,
  Eye,
  EyeOff,
  Copy,
  ChevronRight,
} from "lucide-react";

import PaymentPlanSetupModal from "../modals/PaymentPlanSetupModal";
import SchedulePaymentModal from "../modals/SchedulePaymentModal";
import SharePaymentModal from "../modals/SharePaymentModal";
import {
  PAYMENT_STATUS,
  PAYMENT_METHODS,
  BANK_LIST,
  processPayment,
  paymentStorage,
} from "../utils/paymentUtils";

const paymentPlans = {
  standard: {
    name: "Standard Plan",
    installments: 4,
    interest: 0,
    description:
      "Split your payments into 4 equal installments with no interest.",
  },
  extended: {
    name: "Extended Plan",
    installments: 8,
    interest: 5,
    description: "Split your payments into 8 installments with 5% interest.",
  },
  early: {
    name: "Early Payment Plan",
    discount: 5,
    description: "Pay full amount early and receive 5% discount.",
  },
};

function PaymentsTab({ financialInfo, formatAmount }) {
  // State management
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [paymentPlanType, setPaymentPlanType] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showEftDetails, setShowEftDetails] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [activePlan, setActivePlan] = useState(null);
  const [showCvv, setShowCvv] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    saveCard: false,
  });
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleSchedulePayment = async (scheduleDetails) => {
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPaymentSuccess({
        message: "Payment scheduled successfully!",
        transactionId: `SCH-${Date.now()}`,
      });
    } catch (error) {
      setPaymentError("Failed to schedule payment");
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  // Load saved data on mount
  useEffect(() => {
    const loadedCards = paymentStorage.getSavedCards();
    const loadedPlan = paymentStorage.getActivePlan();
    setSavedCards(loadedCards);
    setActivePlan(loadedPlan);
  }, []);

  const handleFullPayment = async () => {
    if (!selectedPaymentMethod) {
      setPaymentError("Please select a payment method");
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    try {
      const paymentDetails = {
        amount: financialInfo.accountBalance,
        method: selectedPaymentMethod,
        cardDetails:
          selectedPaymentMethod === PAYMENT_METHODS.CARD ? cardDetails : null,
        timestamp: new Date().toISOString(),
      };

      const result = await processPayment(paymentDetails);

      if (
        cardDetails.saveCard &&
        selectedPaymentMethod === PAYMENT_METHODS.CARD
      ) {
        paymentStorage.saveCard({
          last4: cardDetails.number.slice(-4),
          expiry: cardDetails.expiry,
          name: cardDetails.name,
        });
      }

      setPaymentSuccess({
        message: "Payment processed successfully!",
        transactionId: result.transactionId,
      });

      // Reset form
      setCardDetails({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
        saveCard: false,
      });
    } catch (error) {
      setPaymentError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle card input
  const handleCardInput = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ") || ""
    );
  };

  // Generate payment reference
  const generatePaymentRef = () => {
    return `REF-${financialInfo.studentNumber}-${Date.now().toString(36)}`;
  };

  // Calculate plan details
  const calculatePlanDetails = (planType) => {
    const totalAmount = financialInfo.accountBalance;
    const plan = paymentPlans[planType];

    if (planType === "early") {
      const discount = totalAmount * (plan.discount / 100);
      return {
        installmentAmount: totalAmount - discount,
        totalAmount: totalAmount - discount,
        savings: discount,
      };
    }

    const interest = totalAmount * (plan.interest / 100);
    const totalWithInterest = totalAmount + interest;
    return {
      installmentAmount: totalWithInterest / plan.installments,
      totalAmount: totalWithInterest,
      interest: interest,
    };
  };

  return (
    <div className="payments-tab">
      {/* Payment Summary Section */}
      <div className="payment-summary">
        <div className="summary-header">
          <h3>Payment Summary</h3>
          <div className="balance-info">
            <span>Current Balance:</span>
            <span className="amount">
              {formatAmount(financialInfo.accountBalance)}
            </span>
          </div>
        </div>

        {paymentError && (
          <div className="error-message">
            <AlertTriangle size={16} />
            {paymentError}
          </div>
        )}

        {paymentSuccess && (
          <div className="success-message">
            <CheckCircle size={16} />
            {paymentSuccess.message}
            <div className="transaction-info">
              Transaction ID: {paymentSuccess.transactionId}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions">
          <button
            className="action-button primary"
            onClick={handleFullPayment}
            disabled={isProcessing}
          >
            <DollarSign size={16} />
            {isProcessing ? "Processing..." : "Pay Full Amount"}
          </button>
          <button
            className="action-button secondary"
            onClick={() => setShowScheduleModal(true)}
          >
            <Calendar size={16} />
            Schedule Payment
          </button>
          <button
            className="action-button secondary"
            onClick={() => setShowShareModal(true)}
          >
            <Share2 size={16} />
            Share Payment Link
          </button>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="payment-methods">
        <h3>Payment Methods</h3>
        <div className="methods-grid">
          {/* Credit Card Option */}
          <div
            className={`method-card ${
              selectedPaymentMethod === PAYMENT_METHODS.CARD ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedPaymentMethod(PAYMENT_METHODS.CARD);
              setShowCardModal(true);
            }}
          >
            <CreditCard size={24} />
            <h4>Credit/Debit Card</h4>
            <p>Instant payment using your card</p>
            {savedCards.length > 0 && (
              <div className="saved-cards">
                <p>{savedCards.length} saved card(s)</p>
              </div>
            )}
          </div>

          {/* EFT Option */}
          <div
            className={`method-card ${
              selectedPaymentMethod === PAYMENT_METHODS.EFT ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedPaymentMethod(PAYMENT_METHODS.EFT);
              setShowEftDetails(true);
            }}
          >
            <FileText size={24} />
            <h4>EFT Payment</h4>
            <p>Direct bank transfer</p>
            <button className="details-button">View Bank Details</button>
          </div>

          {/* E-Wallet Option */}
          <div
            className={`method-card ${
              selectedPaymentMethod === PAYMENT_METHODS.EWALLET
                ? "selected"
                : ""
            }`}
            onClick={() => setSelectedPaymentMethod(PAYMENT_METHODS.EWALLET)}
          >
            <Wallet size={24} />
            <h4>E-Wallet</h4>
            <p>Pay using supported e-wallets</p>
          </div>
        </div>
      </div>

      {/* Payment Plans Section */}
      <div className="payment-plans">
        <div className="plans-header">
          <h3>Payment Plans</h3>
          <div className="plan-selector">
            <select
              value={paymentPlanType}
              onChange={(e) => setPaymentPlanType(e.target.value)}
            >
              {Object.entries(paymentPlans).map(([key, plan]) => (
                <option key={key} value={key}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="plan-details">
          <div className="plan-info">
            <h4>{paymentPlans[paymentPlanType].name}</h4>
            <p>{paymentPlans[paymentPlanType].description}</p>

            <div className="plan-calculations">
              {(() => {
                const details = calculatePlanDetails(paymentPlanType);
                return (
                  <>
                    <div className="calculation-item">
                      <span>Original Amount</span>
                      <span>{formatAmount(financialInfo.accountBalance)}</span>
                    </div>
                    {paymentPlanType === "early" ? (
                      <>
                        <div className="calculation-item discount">
                          <span>Early Payment Discount (5%)</span>
                          <span>-{formatAmount(details.savings)}</span>
                        </div>
                        <div className="calculation-item total">
                          <span>Final Amount</span>
                          <span>{formatAmount(details.totalAmount)}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        {details.interest > 0 && (
                          <div className="calculation-item interest">
                            <span>
                              Interest ({paymentPlans[paymentPlanType].interest}
                              %)
                            </span>
                            <span>{formatAmount(details.interest)}</span>
                          </div>
                        )}
                        <div className="calculation-item">
                          <span>Number of Installments</span>
                          <span>
                            {paymentPlans[paymentPlanType].installments}
                          </span>
                        </div>
                        <div className="calculation-item">
                          <span>Installment Amount</span>
                          <span>{formatAmount(details.installmentAmount)}</span>
                        </div>
                        <div className="calculation-item total">
                          <span>Total Amount</span>
                          <span>{formatAmount(details.totalAmount)}</span>
                        </div>
                      </>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          {activePlan && (
            <div className="active-plan">
              <h4>Current Payment Plan</h4>
              <div className="plan-status">
                <div className="status-info">
                  <span className="label">Plan Type</span>
                  <span>{activePlan.name}</span>
                </div>
                <div className="status-info">
                  <span className="label">Next Payment</span>
                  <span>{formatAmount(activePlan.nextPayment.amount)}</span>
                </div>
                <div className="status-info">
                  <span className="label">Due Date</span>
                  <span>
                    {new Date(
                      activePlan.nextPayment.dueDate
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="plan-actions">
          <button
            className="setup-plan-button"
            onClick={() => setShowSetupModal(true)}
            disabled={isProcessing}
          >
            {activePlan ? "Modify Payment Plan" : "Set Up Payment Plan"}
          </button>
          {activePlan && (
            <button className="download-agreement">Download Agreement</button>
          )}
        </div>
      </div>

      {/* Card Payment Modal */}
      {showCardModal && (
        <div className="modal-overlay">
          <div className="modal-content card-payment-modal">
            <div className="modal-header">
              <h3>Credit/Debit Card Payment</h3>
              <button
                className="close-button"
                onClick={() => setShowCardModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {savedCards.length > 0 && (
                <div className="saved-cards-section">
                  <h4>Saved Cards</h4>
                  <div className="saved-cards-list">
                    {savedCards.map((card, index) => (
                      <div key={index} className="saved-card">
                        <div className="card-info">
                          <CreditCard size={20} />
                          <span>•••• {card.last4}</span>
                          <span>Expires {card.expiry}</span>
                        </div>
                        <button className="use-card-button">
                          Use this card
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="divider">
                    <span>or use a new card</span>
                  </div>
                </div>
              )}

              <form className="card-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Card Number</label>
                  <div className="card-input-wrapper">
                    <CreditCard size={16} />
                    <input
                      type="text"
                      name="number"
                      value={formatCardNumber(cardDetails.number)}
                      onChange={(e) =>
                        handleCardInput({
                          target: {
                            name: "number",
                            value: e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 16),
                          },
                        })
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    name="name"
                    value={cardDetails.name}
                    onChange={handleCardInput}
                    placeholder="JOHN SMITH"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 4) {
                          handleCardInput({
                            target: {
                              name: "expiry",
                              value: value.replace(/(\d{2})(\d{2})/, "$1/$2"),
                            },
                          });
                        }
                      }}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                  </div>

                  <div className="form-group">
                    <label>CVV</label>
                    <div className="cvv-input-wrapper">
                      <input
                        type={showCvv ? "text" : "password"}
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={(e) =>
                          handleCardInput({
                            target: {
                              name: "cvv",
                              value: e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 4),
                            },
                          })
                        }
                        placeholder="123"
                        maxLength="4"
                      />
                      <button
                        type="button"
                        className="toggle-cvv"
                        onClick={() => setShowCvv(!showCvv)}
                      >
                        {showCvv ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="saveCard"
                    checked={cardDetails.saveCard}
                    onChange={(e) =>
                      handleCardInput({
                        target: {
                          name: "saveCard",
                          value: e.target.checked,
                        },
                      })
                    }
                  />
                  Save card for future payments
                </label>

                <div className="payment-summary">
                  <div className="summary-row">
                    <span>Amount to Pay</span>
                    <span className="amount">
                      {formatAmount(financialInfo.accountBalance)}
                    </span>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                className="secondary-button"
                onClick={() => setShowCardModal(false)}
              >
                Cancel
              </button>
              <button
                className="primary-button"
                onClick={handleFullPayment}
                disabled={
                  isProcessing ||
                  !cardDetails.number ||
                  !cardDetails.name ||
                  !cardDetails.expiry ||
                  !cardDetails.cvv
                }
              >
                {isProcessing ? (
                  <span className="loading">Processing...</span>
                ) : (
                  <>Pay {formatAmount(financialInfo.accountBalance)}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EFT Details Modal */}
      {showEftDetails && (
        <div className="modal-overlay">
          <div className="modal-content eft-details-modal">
            <div className="modal-header">
              <h3>Bank Account Details</h3>
              <button
                className="close-button"
                onClick={() => setShowEftDetails(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="bank-details">
                <div className="detail-row">
                  <span className="label">Bank</span>
                  <span className="value">First National Bank</span>
                  <button
                    className="copy-button"
                    onClick={() =>
                      navigator.clipboard.writeText("First National Bank")
                    }
                  >
                    <Copy size={16} />
                  </button>
                </div>

                <div className="detail-row">
                  <span className="label">Account Number</span>
                  <span className="value">62834567891</span>
                  <button
                    className="copy-button"
                    onClick={() => navigator.clipboard.writeText("62834567891")}
                  >
                    <Copy size={16} />
                  </button>
                </div>

                <div className="detail-row">
                  <span className="label">Branch Code</span>
                  <span className="value">250655</span>
                  <button
                    className="copy-button"
                    onClick={() => navigator.clipboard.writeText("250655")}
                  >
                    <Copy size={16} />
                  </button>
                </div>

                <div className="detail-row">
                  <span className="label">Reference</span>
                  <span className="value">{generatePaymentRef()}</span>
                  <button
                    className="copy-button"
                    onClick={() =>
                      navigator.clipboard.writeText(generatePaymentRef())
                    }
                  >
                    <Copy size={16} />
                  </button>
                </div>

                <div className="detail-row">
                  <span className="label">Amount</span>
                  <span className="value">
                    {formatAmount(financialInfo.accountBalance)}
                  </span>
                  <button
                    className="copy-button"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        financialInfo.accountBalance.toString()
                      )
                    }
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div className="eft-instructions">
                <h4>Instructions</h4>
                <ol>
                  <li>Log in to your bank's online banking platform</li>
                  <li>
                    Add the university as a beneficiary using the details above
                  </li>
                  <li>Use the provided reference number for your payment</li>
                  <li>Upload proof of payment below once completed</li>
                </ol>
              </div>

              <div className="proof-upload">
                <h4>Upload Proof of Payment</h4>
                <div className="upload-area">
                  <input type="file" id="proofUpload" accept=".pdf,.jpg,.png" />
                  <label htmlFor="proofUpload">
                    <FileText size={24} />
                    <span>Click to upload or drag and drop</span>
                    <span className="file-types">
                      PDF, JPG or PNG (max 5MB)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="secondary-button"
                onClick={() => setShowEftDetails(false)}
              >
                Close
              </button>
              <button
                className="primary-button"
                onClick={() => {
                  // Handle proof of payment submission
                  setShowEftDetails(false);
                }}
              >
                Submit Proof of Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Plan Setup Modal */}
      {showSetupModal && (
        <PaymentPlanSetupModal
          onClose={() => setShowSetupModal(false)}
          planType={paymentPlanType}
          planDetails={calculatePlanDetails(paymentPlanType)}
          formatAmount={formatAmount}
          onSetupComplete={(plan) => {
            setActivePlan(plan);
            paymentStorage.savePlan(plan);
            setShowSetupModal(false);
          }}
        />
      )}

      {showScheduleModal && (
        <SchedulePaymentModal
          onClose={() => setShowScheduleModal(false)}
          onSchedule={handleSchedulePayment}
          amount={financialInfo.accountBalance}
          formatAmount={formatAmount}
        />
      )}

      {showShareModal && (
        <SharePaymentModal
          onClose={() => setShowShareModal(false)}
          amount={financialInfo.accountBalance}
          formatAmount={formatAmount}
          paymentRef={generatePaymentRef()}
        />
      )}
    </div>
  );
}

export default PaymentsTab;
