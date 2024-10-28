import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Eye,
  Calendar,
  ChevronDown,
  ChevronUp,
  Paperclip,
  HelpCircle,
  Plus,
  MessageSquare,
  ArrowRight,
  Save,
} from "lucide-react";
import { studentData } from "../Mockdata/studentData";
import "../Styles/FormsAndRequests.css";

// Form templates for different types of requests
const formTemplates = {
  transcript: {
    fields: [
      {
        name: "purpose",
        label: "Purpose of Request",
        type: "select",
        options: ["Employment", "Further Studies", "Visa Application", "Other"],
      },
      {
        name: "copies",
        label: "Number of Copies",
        type: "number",
        min: 1,
        max: 10,
      },
      {
        name: "delivery",
        label: "Delivery Method",
        type: "select",
        options: ["Digital Copy", "Collection", "Courier"],
      },
    ],
    documents: ["ID Copy", "Proof of Payment"],
  },
  leave: {
    fields: [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
      { name: "reason", label: "Reason for Leave", type: "textarea" },
    ],
    documents: [
      "Supporting Documentation",
      "Medical Certificate (if applicable)",
    ],
  },
  // Add more form templates as needed
};

function FormsAndRequestsContent() {
  const [activeTab, setActiveTab] = useState("available");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedForm, setSelectedForm] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [formDrafts, setFormDrafts] = useState([]);

  const { formsAndRequests } = studentData;

  useEffect(() => {
    // Load saved drafts from localStorage
    const savedDrafts = localStorage.getItem("formDrafts");
    if (savedDrafts) {
      setFormDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  const categories = ["All", "Academic", "Administrative", "Financial"];

  const filteredForms = formsAndRequests.availableForms.filter(
    (form) =>
      (selectedCategory === "All" || form.category === selectedCategory) &&
      (form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleFormSelect = (form) => {
    setSelectedForm(form);
    setShowSubmissionModal(true);
  };

  return (
    <div className="forms-requests-content">
      {/* Header Section */}
      <header className="content-header">
        <h1>Forms & Requests</h1>
        <div className="forms-quick-stats">
          <div className="stat-card">
            <h3>Pending Requests</h3>
            <p className="stat-value">
              {
                formsAndRequests.submittedRequests.filter(
                  (r) => r.status === "In Progress"
                ).length
              }
            </p>
          </div>
          <div className="stat-card">
            <h3>Completed Requests</h3>
            <p className="stat-value">
              {
                formsAndRequests.submittedRequests.filter(
                  (r) => r.status === "Completed"
                ).length
              }
            </p>
          </div>
          <div className="stat-card">
            <h3>Saved Drafts</h3>
            <p className="stat-value">{formDrafts.length}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button
            className="forms-primary-button"
            onClick={() => setActiveTab("available")}
          >
            <Plus size={16} />
            New Request
          </button>
          <button
            className="help-button"
            onClick={() => window.open("/help", "_blank")}
          >
            <HelpCircle size={16} />
            Help Center
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="forms-tabs">
        <button
          className={`tab-button ${activeTab === "available" ? "active" : ""}`}
          onClick={() => setActiveTab("available")}
        >
          <FileText size={20} />
          Available Forms
        </button>
        <button
          className={`tab-button ${activeTab === "submitted" ? "active" : ""}`}
          onClick={() => setActiveTab("submitted")}
        >
          <Clock size={20} />
          Submitted Requests
        </button>
        <button
          className={`tab-button ${activeTab === "drafts" ? "active" : ""}`}
          onClick={() => setActiveTab("drafts")}
        >
          <Save size={20} />
          Saved Drafts
        </button>
      </div>

      {/* Search and Filters */}
      {activeTab === "available" && (
        <div className="forms-controls">
          <div className="forms-search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search forms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="wellness-category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="tab-content">
        {activeTab === "available" ? (
          <AvailableForms
            forms={filteredForms}
            onFormSelect={handleFormSelect}
          />
        ) : activeTab === "submitted" ? (
          <SubmittedRequests requests={formsAndRequests.submittedRequests} />
        ) : (
          <SavedDrafts
            drafts={formDrafts}
            onDraftSelect={handleFormSelect}
            onDraftDelete={(draftId) => {
              setFormDrafts(formDrafts.filter((draft) => draft.id !== draftId));
              localStorage.setItem(
                "formDrafts",
                JSON.stringify(
                  formDrafts.filter((draft) => draft.id !== draftId)
                )
              );
            }}
          />
        )}
      </div>

      {/* Form Submission Modal */}
      {showSubmissionModal && selectedForm && (
        <FormSubmissionModal
          form={selectedForm}
          onClose={() => {
            setShowSubmissionModal(false);
            setSelectedForm(null);
          }}
          onSaveDraft={(formData) => {
            const newDraft = {
              id: Date.now(),
              formId: selectedForm.id,
              formName: selectedForm.name,
              data: formData,
              lastModified: new Date().toISOString(),
            };
            const updatedDrafts = [...formDrafts, newDraft];
            setFormDrafts(updatedDrafts);
            localStorage.setItem("formDrafts", JSON.stringify(updatedDrafts));
            setShowSubmissionModal(false);
            setSelectedForm(null);
          }}
        />
      )}
    </div>
  );
}

function RequestDetailsModal({ request, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          <XCircle size={24} />
        </button>

        <div className="request-detail-header">
          <h2>{request.name}</h2>
          <span className={`status-badge ${request.status.toLowerCase()}`}>
            {request.status}
          </span>
        </div>

        <div className="request-info">
          <div className="info-section">
            <h3>Request Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Reference Number</label>
                <p>#{request.id.toString().padStart(6, "0")}</p>
              </div>
              <div className="info-item">
                <label>Submission Date</label>
                <p>{new Date(request.submittedDate).toLocaleDateString()}</p>
              </div>
              {request.completedDate && (
                <div className="info-item">
                  <label>Completion Date</label>
                  <p>{new Date(request.completedDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>

          <div className="info-section">
            <h3>Processing Timeline</h3>
            <div className="timeline">
              {getProgressSteps(request).map((step, index) => (
                <div key={index} className={`timeline-item ${step.status}`}>
                  <div className="timeline-icon">
                    {step.status === "completed" ? (
                      <CheckCircle size={16} />
                    ) : step.status === "current" ? (
                      <Clock size={16} />
                    ) : (
                      <div className="timeline-dot" />
                    )}
                  </div>
                  <div className="timeline-content">
                    <h4>{step.label}</h4>
                    {step.date && (
                      <p>{new Date(step.date).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {request.comments && (
            <div className="info-section">
              <h3>Comments</h3>
              <div className="comments-list">
                {request.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <p className="comment-text">{comment.text}</p>
                    <p className="comment-meta">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-date">
                        {new Date(comment.date).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {request.documents && (
            <div className="info-section">
              <h3>Submitted Documents</h3>
              <div className="documents-list">
                {request.documents.map((doc, index) => (
                  <div key={index} className="document-item">
                    <FileText size={16} />
                    <span>{doc.name}</span>
                    <button className="download-button">
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="secondary-button" onClick={onClose}>
            Close
          </button>
          {request.status !== "Completed" && (
            <button className="forms-primary-button">Contact Support</button>
          )}
        </div>
      </div>
    </div>
  );
}

// Add this function to get fields for each step
function getFieldsForStep(step, template = {}) {
  const fields = template.fields || [];

  switch (step) {
    case 1:
      return fields.filter(
        (field) => field.step === 1 || !field.step // If no step is specified, assume it's step 1
      );
    case 2:
      return fields.filter((field) => field.step === 2);
    case 3:
      return []; // Document upload step doesn't have fields
    case 4:
      return []; // Review step doesn't have fields
    default:
      return [];
  }
}

// Update the DocumentsStep component to include setFiles
function DocumentsStep({
  files,
  onUpload,
  onRemove,
  requiredDocuments,
  errors,
}) {
  const fileInputRef = React.useRef();
  const [uploadedFiles, setFiles] = useState(files);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = [...uploadedFiles, ...droppedFiles];
    setFiles(newFiles);
    onUpload({ target: { files: droppedFiles } });
  };

  return (
    <div className="form-section">
      <h3>Supporting Documents</h3>
      <div className="required-documents">
        <h4>Required Documents:</h4>
        <ul>
          {requiredDocuments.map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
        </ul>
      </div>

      <div className="file-upload-section">
        <div
          className="upload-dropzone"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <Upload size={24} />
          <p>Drag and drop files here or click to browse</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              const newFiles = Array.from(e.target.files);
              setFiles([...uploadedFiles, ...newFiles]);
              onUpload(e);
            }}
            multiple
            hidden
          />
        </div>

        {errors.files && <p className="error-message">{errors.files}</p>}

        <div className="uploaded-files">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="file-item">
              <Paperclip size={16} />
              <span>{file.name}</span>
              <button
                type="button"
                onClick={() => {
                  const newFiles = uploadedFiles.filter((_, i) => i !== index);
                  setFiles(newFiles);
                  onRemove(index);
                }}
                className="remove-file"
              >
                <XCircle size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AvailableForms({ forms, onFormSelect }) {
  const [expandedForm, setExpandedForm] = useState(null);

  const toggleForm = (formId) => {
    setExpandedForm(expandedForm === formId ? null : formId);
  };

  // Split forms into common and other categories
  const commonForms = forms.filter((form) => form.common);
  const otherForms = forms.filter((form) => !form.common);

  return (
    <div className="available-forms">
      {/* Common Forms Section */}
      <section className="common-forms">
        <h2>Common Forms</h2>
        <div className="forms-grid">
          {commonForms.map((form) => (
            <div key={form.id} className="form-card common">
              <div className="form-icon">
                <FileText size={24} />
              </div>
              <div className="form-info">
                <h3>{form.name}</h3>
                <p>{form.description}</p>
                <div className="form-meta">
                  <span className="processing-time">
                    <Clock size={16} />{" "}
                    {form.processingTime || "2-3 business days"}
                  </span>
                  <button
                    className="start-form-button"
                    onClick={() => onFormSelect(form)}
                  >
                    Start Form
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Forms Section */}
      <section className="all-forms">
        <h2>All Available Forms</h2>
        <div className="forms-list">
          {otherForms.map((form) => (
            <div key={form.id} className="form-item">
              <div className="form-header" onClick={() => toggleForm(form.id)}>
                <div className="form-title">
                  <FileText size={20} />
                  <h3>{form.name}</h3>
                </div>
                <div className="form-indicators">
                  <span className="category-badge">{form.category}</span>
                  {expandedForm === form.id ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
              </div>
              {expandedForm === form.id && (
                <div className="form-details">
                  <p>{form.description}</p>
                  <div className="form-requirements">
                    <h4>Requirements</h4>
                    <ul>
                      {form.requirements?.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="form-actions">
                    <button
                      className="preview-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add preview functionality
                      }}
                    >
                      <Eye size={16} />
                      Preview Form
                    </button>
                    <button
                      className="start-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onFormSelect(form);
                      }}
                    >
                      Start Form
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SubmittedRequests({ requests }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "in progress":
        return "warning";
      case "pending":
        return "info";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  // Filter and sort requests
  const filteredRequests = requests
    .filter(
      (request) =>
        filterStatus === "all" || request.status.toLowerCase() === filterStatus
    )
    .sort((a, b) => {
      const dateA = new Date(a.submittedDate);
      const dateB = new Date(b.submittedDate);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="submitted-requests">
      <div className="requests-filters">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="in progress">In Progress</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-filter"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="requests-timeline">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className={`request-card ${getStatusColor(request.status)}`}
            onClick={() => setSelectedRequest(request)}
          >
            <div className="request-header">
              <h3>{request.name}</h3>
              <span
                className={`status-badge ${getStatusColor(request.status)}`}
              >
                {request.status}
              </span>
            </div>
            <div className="request-details">
              <p className="submission-date">
                <Calendar size={16} />
                Submitted:{" "}
                {new Date(request.submittedDate).toLocaleDateString()}
              </p>
              <p className="reference-number">
                Reference: #{request.id.toString().padStart(6, "0")}
              </p>
            </div>
            <div className="request-progress">
              <div className="progress-tracker">
                {getProgressSteps(request).map((step, index) => (
                  <div
                    key={index}
                    className={`progress-step ${step.status}`}
                    title={step.description}
                  >
                    <div className="step-icon">
                      {step.status === "completed" ? (
                        <CheckCircle size={16} />
                      ) : step.status === "current" ? (
                        <Clock size={16} />
                      ) : (
                        <div className="step-dot" />
                      )}
                    </div>
                    <span>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
}

function SavedDrafts({ drafts, onDraftSelect, onDraftDelete }) {
  if (drafts.length === 0) {
    return (
      <div className="saved-drafts">
        <div className="empty-state">
          <FileText size={48} />
          <h3>No Saved Drafts</h3>
          <p>When you save a form as draft, it will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-drafts">
      <div className="drafts-list">
        {drafts.map((draft) => (
          <div key={draft.id} className="draft-card">
            <div className="draft-info">
              <h3>{draft.formName}</h3>
              <p className="last-modified">
                <Clock size={16} />
                Last modified: {new Date(draft.lastModified).toLocaleString()}
              </p>
            </div>
            <div className="draft-actions">
              <button
                className="continue-button"
                onClick={() => onDraftSelect(draft)}
              >
                Continue
              </button>
              <button
                className="delete-button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this draft?"
                    )
                  ) {
                    onDraftDelete(draft.id);
                  }
                }}
              >
                <XCircle size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormSubmissionModal({ form, onClose, onSaveDraft }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const template = formTemplates[form.type] || {
    fields: [],
    documents: [],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when field is modified
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateStep = () => {
    const errors = {};
    const currentFields = getFieldsForStep(step);

    currentFields.forEach((field) => {
      if (!formData[field.name] && field.required !== false) {
        errors[field.name] = "This field is required";
      }
    });

    if (step === 3 && files.length === 0 && template.documents.length > 0) {
      errors.files = "At least one document is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      // Here you would typically submit the form data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      // Handle successful submission
      onClose();
      // Show success message
      alert("Form submitted successfully!");
    } catch (error) {
      // Handle submission error
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          <XCircle size={24} />
        </button>

        <div className="form-header">
          <h2>{form.name}</h2>
          <p>{form.description}</p>
        </div>

        <div className="form-progress">
          {["Basic Info", "Details", "Documents", "Review"].map(
            (label, index) => (
              <div
                key={label}
                className={`progress-step ${step > index ? "completed" : ""} ${
                  step === index + 1 ? "active" : ""
                }`}
              >
                <div className="step-number">
                  {step > index ? <CheckCircle size={16} /> : index + 1}
                </div>
                <span>{label}</span>
              </div>
            )
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-step">
            {step === 1 && (
              <BasicInfoStep
                formData={formData}
                onChange={handleInputChange}
                errors={validationErrors}
                template={template}
              />
            )}
            {step === 2 && (
              <DetailsStep
                formData={formData}
                onChange={handleInputChange}
                errors={validationErrors}
                template={template}
              />
            )}
            {step === 3 && (
              <DocumentsStep
                files={files}
                onUpload={handleFileUpload}
                onRemove={removeFile}
                requiredDocuments={template.documents}
                errors={validationErrors}
              />
            )}
            {step === 4 && (
              <ReviewStep
                formData={formData}
                files={files}
                template={template}
              />
            )}
          </div>

          <div className="form-actions">
            {step > 1 && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => setStep((prev) => prev - 1)}
              >
                Previous
              </button>
            )}
            {step < 4 ? (
              <>
                <button
                  type="button"
                  className="form-save-button"
                  onClick={() => onSaveDraft(formData)}
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  className="form-next-button"
                  onClick={handleNext}
                >
                  Next
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function BasicInfoStep({ formData, onChange, errors, template }) {
  return (
    <div className="form-section">
      <h3>Basic Information</h3>
      {template.fields
        .filter((field) => field.step === 1)
        .map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={formData[field.name] || ""}
            onChange={onChange}
            error={errors[field.name]}
          />
        ))}
    </div>
  );
}

function DetailsStep({ formData, onChange, errors, template }) {
  return (
    <div className="form-section">
      <h3>Request Details</h3>
      {template.fields
        .filter((field) => field.step === 2)
        .map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={formData[field.name] || ""}
            onChange={onChange}
            error={errors[field.name]}
          />
        ))}
    </div>
  );
}

function ReviewStep({ formData, files, template }) {
  return (
    <div className="form-section">
      <h3>Review Your Request</h3>
      <div className="review-section">
        <h4>Form Details</h4>
        {template.fields.map((field) => (
          <div key={field.name} className="review-item">
            <strong>{field.label}:</strong>
            <span>{formData[field.name]}</span>
          </div>
        ))}
      </div>

      <div className="review-section">
        <h4>Uploaded Documents</h4>
        <ul className="documents-list">
          {files.map((file, index) => (
            <li key={index}>
              <Paperclip size={16} />
              <span>{file.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="terms-section">
        <label className="checkbox-label">
          <input type="checkbox" required />
          <span>
            I confirm that all the information provided is accurate and complete
          </span>
        </label>
      </div>
    </div>
  );
}

function FormField({ field, value, onChange, error }) {
  switch (field.type) {
    case "select":
      return (
        <div className="form-field">
          <label htmlFor={field.name}>{field.label}</label>
          <select
            id={field.name}
            name={field.name}
            value={value}
            onChange={onChange}
            className={error ? "error" : ""}
          >
            <option value="">Select {field.label}</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {error && <span className="error-message">{error}</span>}
        </div>
      );

    case "textarea":
      return (
        <div className="form-field">
          <label htmlFor={field.name}>{field.label}</label>
          <textarea
            id={field.name}
            name={field.name}
            value={value}
            onChange={onChange}
            className={error ? "error" : ""}
            rows={4}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
      );

    default:
      return (
        <div className="form-field">
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type || "text"}
            id={field.name}
            name={field.name}
            value={value}
            onChange={onChange}
            className={error ? "error" : ""}
            {...field.props}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
      );
  }
}

function getProgressSteps(request) {
  const steps = [
    { label: "Submitted", status: "completed" },
    { label: "Under Review", status: "pending" },
    { label: "Processing", status: "pending" },
    { label: "Completed", status: "pending" },
  ];

  const statusIndex = {
    Pending: 1,
    "In Progress": 2,
    Completed: 3,
  };

  const currentIndex = statusIndex[request.status] || 0;

  return steps.map((step, index) => ({
    ...step,
    status:
      index < currentIndex
        ? "completed"
        : index === currentIndex
        ? "current"
        : "pending",
  }));
}

export default FormsAndRequestsContent;
