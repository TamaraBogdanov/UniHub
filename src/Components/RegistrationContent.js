import React, { useState, useRef, useEffect } from "react";
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  Star,
  Info,
  Plus,
  Check,
  X,
  HelpCircle,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  FileText,
  Play,
  MessageSquare,
  CreditCard,
} from "lucide-react";
import { studentData } from "../Mockdata/studentData";
import "../Styles/Registration.css";

// Utility function for calculating credits
const calculateTotalCredits = (courses) => {
  return courses.reduce((sum, course) => sum + course.credits, 0);
};

function RegistrationContent() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [selectedCourses, setSelectedCourses] = useState(
    studentData.registrationInfo.selectedCourses
  );
  const [registrationComplete, setRegistrationComplete] = useState(false);

  // Calculate current registration status
  const isRegistrationOpen = () => {
    const startDate = new Date(
      studentData.registrationInfo.registrationPeriod.start
    );
    const endDate = new Date(
      studentData.registrationInfo.registrationPeriod.end
    );
    const today = new Date();
    return today >= startDate && today <= endDate;
  };

  // Calculate total credits
  const calculateTotalCredits = () => {
    return selectedCourses.reduce((sum, course) => sum + course.credits, 0);
  };

  // Check credit limits
  const isWithinCreditLimits = () => {
    const total = calculateTotalCredits();
    return total >= 72 && total <= 144;
  };

  return (
    <div className="registration-content">
      {/* Header Section */}
      <div className="registration-header">
        <div className="registration-status">
          <h1>Course Registration</h1>
          <div
            className={`status-badge ${
              isRegistrationOpen() ? "open" : "closed"
            }`}
          >
            <Clock size={20} />
            Registration Period:{" "}
            {studentData.registrationInfo.registrationPeriod.start} -{" "}
            {studentData.registrationInfo.registrationPeriod.end}
          </div>
        </div>
        <div className="advisor-info">
          <p>Academic Advisor: {studentData.registrationInfo.advisorName}</p>
          <p>Email: {studentData.registrationInfo.advisorEmail}</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="registration-progress">
        <div
          className={`progress-step ${
            activeTab === "requirements" ? "completed" : ""
          }`}
        >
          <Check size={20} />
          Check Requirements
        </div>
        <div
          className={`progress-step ${
            activeTab === "schedule" ? "active" : ""
          }`}
        >
          <Star size={20} />
          Select Courses
        </div>
        <div
          className={`progress-step ${
            activeTab === "confirmation" ? "active" : ""
          }`}
        >
          <Info size={20} />
          Review & Confirm
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="forms-tabs">
        <button
          className={`tab-button ${activeTab === "schedule" ? "active" : ""}`}
          onClick={() => setActiveTab("schedule")}
        >
          <Calendar size={20} />
          Course Schedule
        </button>
        <button
          className={`tab-button ${
            activeTab === "requirements" ? "active" : ""
          }`}
          onClick={() => setActiveTab("requirements")}
        >
          <BookOpen size={20} />
          Requirements
        </button>
        <button
          className={`tab-button ${
            activeTab === "confirmation" ? "active" : ""
          }`}
          onClick={() => setActiveTab("confirmation")}
          disabled={!isWithinCreditLimits()}
        >
          <Check size={20} />
          Confirmation
        </button>
        <button
          className={`tab-button ${activeTab === "support" ? "active" : ""}`}
          onClick={() => setActiveTab("support")}
        >
          <HelpCircle size={20} />
          Support
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "schedule" && (
          <CourseScheduleTab
            selectedCourses={selectedCourses}
            setSelectedCourses={setSelectedCourses}
            isRegistrationOpen={isRegistrationOpen()}
            calculateTotalCredits={calculateTotalCredits}
          />
        )}
        {activeTab === "confirmation" && (
          <ConfirmationTab
            selectedCourses={selectedCourses}
            onConfirm={() => setRegistrationComplete(true)}
            calculateTotalCredits={calculateTotalCredits}
          />
        )}
        {activeTab === "support" && <RegistrationSupportTab />}
      </div>

      {/* Success Modal */}
      {registrationComplete && (
        <div className="modal-overlay">
          <div className="modal-content success-modal">
            <div className="success-icon">
              <Check size={48} />
            </div>
            <h2>Registration Complete!</h2>
            <p>Your course registration has been successfully submitted.</p>
            <div className="modal-actions">
              <button className="primary-button" onClick={() => window.print()}>
                <FileText size={16} />
                Download Confirmation
              </button>
              <button
                className="secondary-button"
                onClick={() => window.location.reload()}
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// CourseScheduleTab Component
function CourseScheduleTab({
  selectedCourses,
  setSelectedCourses,
  isRegistrationOpen,
  calculateTotalCredits,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "all",
    level: "all",
    credits: "all",
  });

  // Combine all available courses
  const availableCourses = [
    ...studentData.registrationInfo.selectedCourses,
    ...studentData.registrationInfo.alternativeCourses,
  ];

  // Filter courses based on search and filters
  const filteredCourses = availableCourses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filters.department === "all" ||
      course.code.startsWith(filters.department);

    const matchesLevel =
      filters.level === "all" || course.code.charAt(3) === filters.level;

    const matchesCredits =
      filters.credits === "all" || course.credits === parseInt(filters.credits);

    return matchesSearch && matchesDepartment && matchesLevel && matchesCredits;
  });

  // Handle adding course
  const handleAddCourse = (course) => {
    if (!isRegistrationOpen) {
      alert("Registration is currently closed.");
      return;
    }

    if (selectedCourses.some((c) => c.code === course.code)) {
      alert("This course is already selected.");
      return;
    }

    setSelectedCourses([...selectedCourses, course]);
  };

  // Handle removing course
  const handleRemoveCourse = (courseCode) => {
    if (!isRegistrationOpen) {
      alert("Registration is currently closed.");
      return;
    }
    setSelectedCourses(selectedCourses.filter((c) => c.code !== courseCode));
  };

  return (
    <div className="course-schedule-content">
      {/* Search and Filters */}
      <div className="registration-search-filters">
        <div className="registration-search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search courses by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="registration-filters">
          <select
            value={filters.department}
            onChange={(e) =>
              setFilters({ ...filters, department: e.target.value })
            }
          >
            <option value="all">All Departments</option>
            <option value="CSC">Computer Science</option>
            <option value="MAM">Mathematics</option>
            <option value="STA">Statistics</option>
          </select>
          <select
            value={filters.level}
            onChange={(e) => setFilters({ ...filters, level: e.target.value })}
          >
            <option value="all">All Levels</option>
            <option value="1">First Year</option>
            <option value="2">Second Year</option>
            <option value="3">Third Year</option>
          </select>
          <select
            value={filters.credits}
            onChange={(e) =>
              setFilters({ ...filters, credits: e.target.value })
            }
          >
            <option value="all">All Credits</option>
            <option value="16">16 Credits</option>
            <option value="18">18 Credits</option>
          </select>
        </div>
      </div>

      {/* Course Lists */}
      <div className="schedule-grid">
        <div className="available-courses">
          <h3>Available Courses</h3>
          <div className="course-list">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.code}
                course={course}
                onAction={handleAddCourse}
                actionType="add"
                isSelected={selectedCourses.some((c) => c.code === course.code)}
                disabled={!isRegistrationOpen}
              />
            ))}
          </div>
        </div>

        <div className="selected-courses">
          <h3>Selected Courses</h3>
          <div className="course-list">
            {selectedCourses.map((course) => (
              <CourseCard
                key={course.code}
                course={course}
                onAction={handleRemoveCourse}
                actionType="remove"
                disabled={!isRegistrationOpen}
              />
            ))}
          </div>
          <div className="credits-summary">
            <div className="credits-info">
              <span>
                Total Credits: {calculateTotalCredits(selectedCourses)}
              </span>
              {calculateTotalCredits(selectedCourses) < 72 && (
                <span className="credits-warning">
                  Minimum 72 credits required
                </span>
              )}
              {calculateTotalCredits(selectedCourses) > 144 && (
                <span className="credits-warning">
                  Maximum 144 credits exceeded
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Course Card Component
function CourseCard({ course, onAction, actionType, isSelected, disabled }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`course-card ${isSelected ? "selected" : ""} ${
        disabled ? "disabled" : ""
      }`}
    >
      <div className="course-header" onClick={() => setExpanded(!expanded)}>
        <div className="course-info">
          <h4>
            {course.code}: {course.name}
          </h4>
          <p>{course.credits} credits</p>
        </div>
        <button
          className={`action-button ${actionType}`}
          onClick={(e) => {
            e.stopPropagation();
            onAction(actionType === "add" ? course : course.code);
          }}
          disabled={disabled}
        >
          {actionType === "add" ? <Plus size={16} /> : <X size={16} />}
          {actionType === "add" ? "Add" : "Remove"}
        </button>
      </div>

      {expanded && (
        <div className="course-details">
          <p className="schedule">
            <Clock size={16} /> {course.schedule}
          </p>
          <p className="prerequisite">Prerequisites: CSC2001F</p>
          <p className="description">
            {course.description || "No description available."}
          </p>
        </div>
      )}
    </div>
  );
}

function RequirementsTab() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [requirements] = useState({
    academic: [
      {
        id: 1,
        type: "Minimum Credits",
        required: "72 credits",
        current: `${studentData.academicInfo.creditsEarned} credits`,
        met: studentData.academicInfo.creditsEarned >= 72,
      },
      {
        id: 2,
        type: "GPA Requirement",
        required: "60%",
        current: `${(studentData.academicInfo.gpa * 25).toFixed(1)}%`,
        met: studentData.academicInfo.gpa * 25 >= 60,
      },
      {
        id: 3,
        type: "Core Modules",
        required: `${studentData.degreeProgress.coreModules.total} modules`,
        current: `${studentData.degreeProgress.coreModules.completed} completed`,
        met:
          studentData.degreeProgress.coreModules.completed >=
          studentData.degreeProgress.coreModules.total * 0.75,
      },
    ],
    administrative: [
      {
        id: 1,
        type: "Registration Fee",
        required: "Paid",
        current:
          studentData.financialInfo.accountBalance <= 0
            ? "Paid"
            : "Outstanding",
        met: studentData.financialInfo.accountBalance <= 0,
      },
      {
        id: 2,
        type: "Previous Semester",
        required: "Completed",
        current: "Completed",
        met: true,
      },
      {
        id: 3,
        type: "Course Prerequisites",
        required: "All Met",
        current: "Verified",
        met: true,
      },
    ],
    prerequisites: studentData.modules
      .filter((module) => module.status === "Upcoming")
      .map((module) => ({
        id: module.code,
        course: module.code,
        name: module.name,
        requires: ["CSC2001F"], // In real app, would come from module data
        status: "Met",
        met: true,
      })),
  });

  // Calculate overall status
  const getOverallStatus = () => {
    const allRequirements = [
      ...requirements.academic,
      ...requirements.administrative,
      ...requirements.prerequisites,
    ];
    const unmetRequirements = allRequirements.filter((req) => !req.met);
    return {
      met: unmetRequirements.length === 0,
      unmetCount: unmetRequirements.length,
      unmetItems: unmetRequirements,
    };
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="requirements-content">
      <div className="requirements-overview">
        <div
          className={`requirement-status-card overall-status ${
            overallStatus.met ? "met" : "unmet"
          }`}
        >
          <h3>Registration Status</h3>
          <div className="status-indicator">
            {overallStatus.met ? (
              <Check size={24} />
            ) : (
              <AlertTriangle size={24} />
            )}
            <span>
              {overallStatus.met
                ? "All Requirements Met"
                : `${overallStatus.unmetCount} requirements need attention`}
            </span>
          </div>
          {!overallStatus.met && (
            <ul className="unmet-requirements">
              {overallStatus.unmetItems.map((item) => (
                <li key={item.id}>
                  <AlertTriangle size={16} />
                  {item.type}: {item.current} (Required: {item.required})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="requirement-status-cards">
          <div className="requirement-status-card">
            <h4>Academic Requirements</h4>
            <div
              className="progress-circle"
              style={{
                "--progress": `${
                  (requirements.academic.filter((r) => r.met).length /
                    requirements.academic.length) *
                  360
                }deg`,
              }}
            >
              <span>
                {requirements.academic.filter((r) => r.met).length}/
                {requirements.academic.length}
              </span>
              <small>Met</small>
            </div>
          </div>
          <div className="requirement-status-card">
            <h4>Administrative</h4>
            <div
              className="progress-circle"
              style={{
                "--progress": `${
                  (requirements.administrative.filter((r) => r.met).length /
                    requirements.administrative.length) *
                  360
                }deg`,
              }}
            >
              <span>
                {requirements.administrative.filter((r) => r.met).length}/
                {requirements.administrative.length}
              </span>
              <small>Met</small>
            </div>
          </div>
        </div>
      </div>

      <div className="requirements-sections">
        <div className="requirements-section">
          <div
            className="section-header"
            onClick={() =>
              setExpandedSection(
                expandedSection === "academic" ? null : "academic"
              )
            }
          >
            <h3>Academic Requirements</h3>
            {expandedSection === "academic" ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
          {expandedSection === "academic" && (
            <div className="section-content">
              {requirements.academic.map((req) => (
                <RequirementItem key={req.id} requirement={req} />
              ))}
            </div>
          )}
        </div>

        <div className="requirements-section">
          <div
            className="section-header"
            onClick={() =>
              setExpandedSection(
                expandedSection === "administrative" ? null : "administrative"
              )
            }
          >
            <h3>Administrative Requirements</h3>
            {expandedSection === "administrative" ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
          {expandedSection === "administrative" && (
            <div className="section-content">
              {requirements.administrative.map((req) => (
                <RequirementItem key={req.id} requirement={req} />
              ))}
            </div>
          )}
        </div>

        <div className="requirements-section">
          <div
            className="section-header"
            onClick={() =>
              setExpandedSection(
                expandedSection === "prerequisites" ? null : "prerequisites"
              )
            }
          >
            <h3>Course Prerequisites</h3>
            {expandedSection === "prerequisites" ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
          {expandedSection === "prerequisites" && (
            <div className="section-content">
              {requirements.prerequisites.map((req) => (
                <PrerequisiteItem key={req.id} prerequisite={req} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="requirements-actions">
        {!overallStatus.met && (
          <button className="action-button resolve">
            <AlertTriangle size={16} />
            Resolve Outstanding Requirements
          </button>
        )}
        <button className="action-button request">
          <HelpCircle size={16} />
          Request Assistance
        </button>
      </div>
    </div>
  );
}

function ConfirmationTab({
  selectedCourses,
  onConfirm,
  calculateTotalCredits,
}) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState("review");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setConfirmationStep("confirmed");
      onConfirm();
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (confirmationStep === "confirmed") {
    return (
      <div className="confirmation-success">
        <div className="success-icon">
          <Check size={48} />
        </div>
        <h2>Registration Successful!</h2>
        <p>
          Your course registration has been confirmed for the upcoming semester.
        </p>
        <div className="confirmation-actions">
          <button className="primary-button" onClick={() => window.print()}>
            <FileText size={16} />
            Download Confirmation
          </button>
          <button
            className="secondary-button"
            onClick={() => window.location.reload()}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-content">
      <div className="confirmation-summary">
        <h3>Registration Summary</h3>
        <div className="summary-cards">
          <div className="summary-card">
            <h4>Total Courses</h4>
            <p>{calculateTotalCredits(selectedCourses)}</p>
          </div>
          <div className="summary-card">
            <h4>Total Credits</h4>
            <p>{calculateTotalCredits()}</p>
          </div>
          <div className="summary-card">
            <h4>Semester</h4>
            <p>Second Semester 2024</p>
          </div>
        </div>
      </div>

      <div className="selected-courses-review">
        <h3>Selected Courses</h3>
        <table className="courses-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Schedule</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {selectedCourses.map((course) => (
              <tr key={course.code}>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td>{course.credits}</td>
                <td>{course.schedule}</td>
                <td>
                  <span className="status-badge">Pending</span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" className="text-right">
                <strong>Total Credits:</strong>
              </td>
              <td colSpan="3">
                <strong>{calculateTotalCredits(selectedCourses)}</strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="terms-and-conditions">
        <h3>Terms and Conditions</h3>
        <div className="terms-content">
          <p>By proceeding with registration, you acknowledge and agree to:</p>
          <ul>
            <li>Payment of all required fees by the specified deadlines</li>
            <li>
              Adherence to the university's academic policies and procedures
            </li>
            <li>
              Responsibility for maintaining academic progress requirements
            </li>
            <li>Understanding of the course withdrawal and refund policies</li>
          </ul>
        </div>
        <label className="terms-checkbox">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          I have read and agree to the terms and conditions
        </label>
      </div>

      <div className="confirmation-actions">
        <button
          className="confirm-button"
          disabled={!termsAccepted || loading}
          onClick={handleConfirm}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Processing...
            </>
          ) : (
            <>
              <Check size={16} />
              Confirm Registration
            </>
          )}
        </button>
        <button
          className="back-button"
          onClick={() => window.history.back()}
          disabled={loading}
        >
          Review Changes
        </button>
      </div>
    </div>
  );
}

function RegistrationSupportTab() {
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const supportResources = {
    faqs: [
      {
        id: 1,
        question: "How do I choose the right courses?",
        answer:
          "Consider your degree requirements, prerequisites, and career goals. Consult with your academic advisor for guidance.",
        category: "academic",
      },
      {
        id: 2,
        question: "What if I need to change my courses after registration?",
        answer:
          "You can modify your course selection during the add/drop period, which is typically the first two weeks of the semester.",
        category: "administrative",
      },
      {
        id: 3,
        question: "How many credits should I take per semester?",
        answer:
          "Full-time students typically take between 72 and 144 credits per semester. Consult with your advisor for personalized guidance.",
        category: "academic",
      },
    ],
    contacts: [
      {
        id: 1,
        title: "Academic Advisor",
        name: studentData.registrationInfo.advisorName,
        email: studentData.registrationInfo.advisorEmail,
        hours: "Mon-Fri, 9:00-15:00",
      },
      {
        id: 2,
        title: "Registration Help Desk",
        email: "registration@university.ac.za",
        phone: "+27 21 555 0123",
        hours: "Mon-Fri, 8:00-16:00",
      },
    ],
  };

  // Filter FAQs based on search and category
  const filteredFAQs = supportResources.faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="support-content">
      <div className="support-header">
        <div className="search-container">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="registration-category-filters">
          <button
            className={`category-filter ${
              selectedCategory === "all" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
          <button
            className={`category-filter ${
              selectedCategory === "academic" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("academic")}
          >
            Academic
          </button>
          <button
            className={`category-filter ${
              selectedCategory === "administrative" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("administrative")}
          >
            Administrative
          </button>
        </div>
      </div>

      <div className="support-grid">
        {/* FAQs Section */}
        <div className="support-section faqs">
          <h3>Frequently Asked Questions</h3>
          {filteredFAQs.length === 0 ? (
            <div className="no-results">
              <Search size={24} />
              <p>
                No matching FAQs found. Try different search terms or contact
                support.
              </p>
            </div>
          ) : (
            <div className="faq-list">
              {filteredFAQs.map((faq) => (
                <details key={faq.id} className="faq-item">
                  <summary>
                    <span className="faq-question">{faq.question}</span>
                    <ChevronDown size={20} className="faq-icon" />
                  </summary>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>

        {/* Support Contacts */}
        <div className="support-section contacts">
          <h3>Support Contacts</h3>
          <div className="contact-cards">
            {supportResources.contacts.map((contact) => (
              <div key={contact.id} className="contact-card">
                <h4>{contact.title}</h4>
                {contact.name && <p className="contact-name">{contact.name}</p>}
                <p className="contact-email">
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
                {contact.phone && (
                  <p className="contact-phone">
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                      {contact.phone}
                    </a>
                  </p>
                )}
                <p className="contact-hours">
                  <Clock size={16} />
                  {contact.hours}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Need Help Section */}
        <div className="support-footer">
          <div className="live-chat-prompt">
            <h3>Need More Help?</h3>
            <p>Our support team is available to assist you.</p>
            <button
              className="chat-button"
              onClick={() => setShowChatModal(true)}
            >
              <MessageSquare size={16} />
              Start Live Chat
            </button>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {showChatModal && <ChatModal onClose={() => setShowChatModal(false)} />}
    </div>
  );
}

// Chat Modal Component
function ChatModal({ onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "system",
      content:
        "Welcome to Registration Support! How can I help you with your course registration today?",
      time: new Date().toISOString(),
    },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      type: "user",
      content: message.trim(),
      time: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Simulate response
    setTimeout(() => {
      const responseMessage = {
        type: "system",
        content: getRegistrationResponse(message),
        time: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  const getRegistrationResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    // Registration-specific responses
    if (
      lowerMessage.includes("prerequisite") ||
      lowerMessage.includes("requirements")
    ) {
      return "Prerequisites are listed in the course details. You can view them by clicking on any course in the course selection screen. Need help finding specific prerequisites?";
    } else if (
      lowerMessage.includes("deadline") ||
      lowerMessage.includes("due date")
    ) {
      return "The registration deadline for this semester is July 15, 2024. Would you like information about late registration procedures?";
    } else if (
      lowerMessage.includes("credit") ||
      lowerMessage.includes("credits")
    ) {
      return "You need to register for between 72 and 144 credits per semester. Would you like help calculating your current credit total?";
    } else if (lowerMessage.includes("add") || lowerMessage.includes("drop")) {
      return "You can add or drop courses using the Course Schedule tab. The add/drop period ends two weeks after the semester starts. Need help with specific courses?";
    } else {
      return "How else can I help you with your course registration? Feel free to ask about prerequisites, deadlines, credits, or adding/dropping courses.";
    }
  };

  return (
    <div className="modal-overlay">
      <div className="registration-chat-modal">
        <div className="chat-header">
          <h3>
            <span className="status-indicator"></span>
            Registration Support
          </h3>
          <button className="registration-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              <div className="message-content">{msg.content}</div>
              <div className="message-time">
                {new Date(msg.time).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-container" onSubmit={handleSendMessage}>
          <div className="chat-input-form">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="chat-input"
            />
            <button
              type="submit"
              className="chat-send-button"
              disabled={!message.trim()}
            >
              <MessageSquare size={16} />
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper Components
function RequirementItem({ requirement }) {
  return (
    <div className={`requirement-item ${requirement.met ? "met" : "unmet"}`}>
      <div className="requirement-status">
        {requirement.met ? <Check size={20} /> : <X size={20} />}
      </div>
      <div className="requirement-details">
        <h4>{requirement.type}</h4>
        <div className="requirement-values">
          <span>Required: {requirement.required}</span>
          <span>Current: {requirement.current}</span>
        </div>
      </div>
    </div>
  );
}

function PrerequisiteItem({ prerequisite }) {
  return (
    <div className={`prerequisite-item ${prerequisite.met ? "met" : "unmet"}`}>
      <div className="prerequisite-header">
        <h4>
          {prerequisite.course} - {prerequisite.name}
        </h4>
        <span className={`status ${prerequisite.met ? "met" : "unmet"}`}>
          {prerequisite.status}
        </span>
      </div>
      <div className="prerequisite-details">
        <p>Required courses:</p>
        <ul>
          {prerequisite.requires.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { RequirementsTab, ConfirmationTab, RegistrationSupportTab };

// Export the main component
export default RegistrationContent;
