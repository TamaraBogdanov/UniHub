import React, { useState } from "react";
import {
  User,
  Mail,
  Settings,
  Camera,
  AlertTriangle,
  Edit2,
  Save,
  X,
  Lock,
  CheckCircle,
} from "lucide-react";
import { studentData } from "../Mockdata/studentData";
import "../Styles/PersonalInformation.css";

function PersonalInformationContent() {
  const [activeTab, setActiveTab] = useState("basic");
  const [editMode, setEditMode] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(studentData.personalInfo);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setShowConfirmation(true);
    setEditMode(false);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <BasicInfoTab
            personalInfo={personalInfo}
            editMode={editMode}
            setPersonalInfo={setPersonalInfo}
          />
        );
      case "contact":
        return (
          <ContactInfoTab
            personalInfo={personalInfo}
            editMode={editMode}
            setPersonalInfo={setPersonalInfo}
          />
        );
      case "emergency":
        return (
          <EmergencyContactTab
            personalInfo={personalInfo}
            editMode={editMode}
            setPersonalInfo={setPersonalInfo}
          />
        );
      case "preferences":
        return <PreferencesTab />;
      default:
        return <BasicInfoTab personalInfo={personalInfo} editMode={editMode} />;
    }
  };

  return (
    <div className="personal-information-content">
      {showConfirmation && (
        <div className="save-confirmation">
          <CheckCircle size={20} /> Changes saved successfully
        </div>
      )}

      <div className="profile-header">
        <div className="profile-image-section">
          <div className="profile-image-container">
            <img
              src={personalInfo.profilePic}
              alt="Profile"
              className="profile-image"
            />
            {editMode && (
              <button className="change-photo-button">
                <Camera size={16} /> Change Photo
              </button>
            )}
          </div>
          <h2>{personalInfo.name}</h2>
          <p className="student-number">
            Student Number: {personalInfo.studentNumber}
          </p>
        </div>

        <div className="edit-controls">
          {!editMode ? (
            <button className="edit-button" onClick={() => setEditMode(true)}>
              <Edit2 size={16} /> Edit Information
            </button>
          ) : (
            <div className="edit-actions">
              <button className="save-button" onClick={handleSave}>
                <Save size={16} /> Save Changes
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setEditMode(false);
                  setPersonalInfo(studentData.personalInfo); // Reset to original data
                }}
              >
                <X size={16} /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="forms-tabs">
        <button
          className={`tab-button ${activeTab === "basic" ? "active" : ""}`}
          onClick={() => setActiveTab("basic")}
        >
          <User size={20} />
          Basic Information
        </button>
        <button
          className={`tab-button ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          <Mail size={20} />
          Contact Details
        </button>
        <button
          className={`tab-button ${activeTab === "emergency" ? "active" : ""}`}
          onClick={() => setActiveTab("emergency")}
        >
          <AlertTriangle size={20} />
          Emergency Contact
        </button>
        <button
          className={`tab-button ${
            activeTab === "preferences" ? "active" : ""
          }`}
          onClick={() => setActiveTab("preferences")}
        >
          <Settings size={20} />
          Preferences
        </button>
      </div>

      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}

function BasicInfoTab({ personalInfo, editMode, setPersonalInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="info-grid">
      <div className="info-section">
        <h3>Personal Details</h3>
        <div className="info-group">
          <label>Full Name</label>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={personalInfo.name}
              onChange={handleChange}
            />
          ) : (
            <p>{personalInfo.name}</p>
          )}
        </div>
        <div className="info-group">
          <label>ID Number</label>
          <p className="protected-field">
            <Lock size={16} />
            {personalInfo.idNumber}
          </p>
        </div>
        <div className="info-group">
          <label>Date of Birth</label>
          {editMode ? (
            <input
              type="date"
              name="dateOfBirth"
              value={personalInfo.dateOfBirth}
              onChange={handleChange}
            />
          ) : (
            <p>{new Date(personalInfo.dateOfBirth).toLocaleDateString()}</p>
          )}
        </div>
        <div className="info-group">
          <label>Gender</label>
          {editMode ? (
            <select
              name="gender"
              value={personalInfo.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p>{personalInfo.gender}</p>
          )}
        </div>
        <div className="info-group">
          <label>Nationality</label>
          {editMode ? (
            <input
              type="text"
              name="nationality"
              value={personalInfo.nationality}
              onChange={handleChange}
            />
          ) : (
            <p>{personalInfo.nationality}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactInfoTab({ personalInfo, editMode, setPersonalInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  return (
    <div className="info-grid">
      <div className="info-section">
        <h3>Contact Information</h3>
        <div className="info-group">
          <label>Email Address</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
            />
          ) : (
            <p>{personalInfo.email}</p>
          )}
        </div>
        <div className="info-group">
          <label>Phone Number</label>
          {editMode ? (
            <input
              type="tel"
              name="phoneNumber"
              value={personalInfo.phoneNumber}
              onChange={handleChange}
            />
          ) : (
            <p>{personalInfo.phoneNumber}</p>
          )}
        </div>
      </div>

      <div className="info-section">
        <h3>Residential Address</h3>
        <div className="address-fields">
          <div className="info-group">
            <label>Street Address</label>
            {editMode ? (
              <input
                type="text"
                name="street"
                value={personalInfo.address.street}
                onChange={handleAddressChange}
              />
            ) : (
              <p>{personalInfo.address.street}</p>
            )}
          </div>
          <div className="info-group">
            <label>Suburb</label>
            {editMode ? (
              <input
                type="text"
                name="suburb"
                value={personalInfo.address.suburb}
                onChange={handleAddressChange}
              />
            ) : (
              <p>{personalInfo.address.suburb}</p>
            )}
          </div>
          <div className="info-group">
            <label>City</label>
            {editMode ? (
              <input
                type="text"
                name="city"
                value={personalInfo.address.city}
                onChange={handleAddressChange}
              />
            ) : (
              <p>{personalInfo.address.city}</p>
            )}
          </div>
          <div className="info-group">
            <label>Province</label>
            {editMode ? (
              <select
                name="province"
                value={personalInfo.address.province}
                onChange={handleAddressChange}
              >
                <option value="Gauteng">Gauteng</option>
                <option value="Western Cape">Western Cape</option>
                <option value="Eastern Cape">Eastern Cape</option>
                <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                <option value="Free State">Free State</option>
                <option value="Limpopo">Limpopo</option>
                <option value="Mpumalanga">Mpumalanga</option>
                <option value="North West">North West</option>
                <option value="Northern Cape">Northern Cape</option>
              </select>
            ) : (
              <p>{personalInfo.address.province}</p>
            )}
          </div>
          <div className="info-group">
            <label>Postal Code</label>
            {editMode ? (
              <input
                type="text"
                name="postalCode"
                value={personalInfo.address.postalCode}
                onChange={handleAddressChange}
              />
            ) : (
              <p>{personalInfo.address.postalCode}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmergencyContactTab({ personalInfo, editMode, setPersonalInfo }) {
  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value,
      },
    }));
  };

  return (
    <div className="info-grid">
      <div className="info-section">
        <h3>Emergency Contact</h3>
        <div className="info-group">
          <label>Contact Name</label>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={personalInfo.emergencyContact.name}
              onChange={handleEmergencyContactChange}
            />
          ) : (
            <p>{personalInfo.emergencyContact.name}</p>
          )}
        </div>
        <div className="info-group">
          <label>Relationship</label>
          {editMode ? (
            <input
              type="text"
              name="relationship"
              value={personalInfo.emergencyContact.relationship}
              onChange={handleEmergencyContactChange}
            />
          ) : (
            <p>{personalInfo.emergencyContact.relationship}</p>
          )}
        </div>
        <div className="info-group">
          <label>Phone Number</label>
          {editMode ? (
            <input
              type="tel"
              name="phoneNumber"
              value={personalInfo.emergencyContact.phoneNumber}
              onChange={handleEmergencyContactChange}
            />
          ) : (
            <p>{personalInfo.emergencyContact.phoneNumber}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function PreferencesTab() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    language: "English",
    accessibility: false,
  });

  const handlePreferenceChange = (e) => {
    const { name, type, checked, value } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="preferences-section">
      <h3>Communication Preferences</h3>
      <div className="preferences-grid">
        <div className="preference-item">
          <label>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={preferences.emailNotifications}
              onChange={handlePreferenceChange}
            />
            Email Notifications
          </label>
          <p className="preference-description">
            Receive important updates and announcements via email
          </p>
        </div>
        <div className="preference-item">
          <label>
            <input
              type="checkbox"
              name="smsNotifications"
              checked={preferences.smsNotifications}
              onChange={handlePreferenceChange}
            />
            SMS Notifications
          </label>
          <p className="preference-description">
            Receive urgent notifications via SMS
          </p>
        </div>
      </div>

      <h3>System Preferences</h3>
      <div className="preferences-grid">
        <div className="preference-item">
          <label>Language</label>
          <select
            name="language"
            value={preferences.language}
            onChange={handlePreferenceChange}
          >
            <option value="English">English</option>
            <option value="Afrikaans">Afrikaans</option>
            <option value="isiZulu">isiZulu</option>
            <option value="isiXhosa">isiXhosa</option>
            <option value="Sesotho">Sesotho</option>
          </select>
        </div>
        <div className="preference-item">
          <label>
            <input
              type="checkbox"
              name="accessibility"
              checked={preferences.accessibility}
              onChange={handlePreferenceChange}
            />
            High Contrast Mode
          </label>
          <p className="preference-description">
            Enable high contrast mode for better visibility
          </p>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformationContent;
