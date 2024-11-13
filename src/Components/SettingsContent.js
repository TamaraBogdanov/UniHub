import React, { useState } from "react";
import {
	User,
	Bell,
	Lock,
	Globe,
	Eye,
	EyeOff,
	Shield,
	Smartphone,
	Mail,
	Monitor,
	Sun,
	Moon,
	Save,
	Download,
	CheckCircle,
	AlertTriangle,
	RefreshCw,
} from "lucide-react";
import { studentData } from "../Mockdata/studentData";
import "../Styles/Settings.css";

function SettingsContent() {
	const [activeSection, setActiveSection] = useState("profile");
	const [showSavedMessage, setShowSavedMessage] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSave = async () => {
		setLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setLoading(false);
		setShowSavedMessage(true);
		setTimeout(() => setShowSavedMessage(false), 3000);
	};

	return (
		<div className="settings-content">
			{showSavedMessage && (
				<div className="save-notification">
					<CheckCircle size={20} />
					Settings saved successfully
				</div>
			)}

			<div className="settings-header">
				<h1>Settings</h1>
				<p>Manage your account settings and preferences</p>
			</div>

			<div className="forms-tabs">
				<button
					className={`tab-button ${
						activeSection === "profile" ? "active" : ""
					}`}
					onClick={() => setActiveSection("profile")}
				>
					<User size={20} />
					Profile Settings
				</button>
				<button
					className={`tab-button ${
						activeSection === "notifications" ? "active" : ""
					}`}
					onClick={() => setActiveSection("notifications")}
				>
					<Bell size={20} />
					Notifications
				</button>
				<button
					className={`tab-button ${
						activeSection === "security" ? "active" : ""
					}`}
					onClick={() => setActiveSection("security")}
				>
					<Lock size={20} />
					Security
				</button>
				<button
					className={`tab-button ${
						activeSection === "preferences" ? "active" : ""
					}`}
					onClick={() => setActiveSection("preferences")}
				>
					<Globe size={20} />
					Preferences
				</button>
				<button
					className={`tab-button ${
						activeSection === "accessibility" ? "active" : ""
					}`}
					onClick={() => setActiveSection("accessibility")}
				>
					<Eye size={20} />
					Accessibility
				</button>
				<button
					className={`tab-button ${
						activeSection === "privacy" ? "active" : ""
					}`}
					onClick={() => setActiveSection("privacy")}
				>
					<Shield size={20} />
					Privacy
				</button>
			</div>

			<div className="settings-main">
				{activeSection === "profile" && <ProfileSettings />}
				{activeSection === "notifications" && <NotificationSettings />}
				{activeSection === "security" && <SecuritySettings />}
				{activeSection === "preferences" && <PreferenceSettings />}
				{activeSection === "accessibility" && <AccessibilitySettings />}
				{activeSection === "privacy" && <PrivacySettings />}
			</div>
		</div>
	);
}

function ProfileSettings() {
	const { personalInfo } = studentData;
	const [profileData, setProfileData] = useState(personalInfo);
	const [profileImage, setProfileImage] = useState(null);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfileImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="settings-section">
			<h2>Profile Settings</h2>
			<div className="profile-image-section">
				<div className="profile-image-container">
					<img
						src={profileImage || "/default-avatar.png"}
						alt="Profile"
						className="profile-image"
					/>
					<label className="image-upload-button">
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							hidden
						/>
						Change Photo
					</label>
				</div>
			</div>

			<div className="settings-form">
				<div className="form-group">
					<label>Full Name</label>
					<input
						type="text"
						value={profileData.name}
						onChange={(e) =>
							setProfileData({ ...profileData, name: e.target.value })
						}
					/>
				</div>
				<div className="form-group">
					<label>Email</label>
					<input
						type="email"
						value={profileData.email}
						onChange={(e) =>
							setProfileData({ ...profileData, email: e.target.value })
						}
					/>
				</div>
				<div className="form-group">
					<label>Phone Number</label>
					<input
						type="tel"
						value={profileData.phoneNumber}
						onChange={(e) =>
							setProfileData({ ...profileData, phoneNumber: e.target.value })
						}
					/>
				</div>
				<div className="form-group">
					<label>Address</label>
					<textarea
						value={profileData.address.street}
						onChange={(e) =>
							setProfileData({
								...profileData,
								address: { ...profileData.address, street: e.target.value },
							})
						}
					/>
				</div>
				<div className="form-actions">
					<button className="save-button">Save Changes</button>
					<button className="cancel-button">Cancel</button>
				</div>
			</div>
		</div>
	);
}

function NotificationSettings() {
	const [notifications, setNotifications] = useState({
		email: {
			announcements: true,
			grades: true,
			assignments: true,
			reminders: false,
		},
		sms: {
			urgent: true,
			deadlines: false,
			grades: false,
		},
		app: {
			all: true,
			messages: true,
			updates: true,
		},
	});

	return (
		<div className="settings-section">
			<h2>Notification Preferences</h2>

			<div className="notification-groups">
				<div className="notification-group">
					<h3>
						<Mail size={20} /> Email Notifications
					</h3>
					<div className="notification-options">
						{Object.entries(notifications.email).map(([key, value]) => (
							<label key={key} className="toggle-label">
								<span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
								<div className="toggle-switch">
									<input
										type="checkbox"
										checked={value}
										onChange={(e) =>
											setNotifications({
												...notifications,
												email: {
													...notifications.email,
													[key]: e.target.checked,
												},
											})
										}
									/>
									<span className="toggle-slider"></span>
								</div>
							</label>
						))}
					</div>
				</div>

				<div className="notification-group">
					<h3>
						<Smartphone size={20} /> SMS Notifications
					</h3>
					<div className="notification-options">
						{Object.entries(notifications.sms).map(([key, value]) => (
							<label key={key} className="toggle-label">
								<span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
								<div className="toggle-switch">
									<input
										type="checkbox"
										checked={value}
										onChange={(e) =>
											setNotifications({
												...notifications,
												sms: { ...notifications.sms, [key]: e.target.checked },
											})
										}
									/>
									<span className="toggle-slider"></span>
								</div>
							</label>
						))}
					</div>
				</div>

				<div className="notification-group">
					<h3>
						<Monitor size={20} /> App Notifications
					</h3>
					<div className="notification-options">
						{Object.entries(notifications.app).map(([key, value]) => (
							<label key={key} className="toggle-label">
								<span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
								<div className="toggle-switch">
									<input
										type="checkbox"
										checked={value}
										onChange={(e) =>
											setNotifications({
												...notifications,
												app: { ...notifications.app, [key]: e.target.checked },
											})
										}
									/>
									<span className="toggle-slider"></span>
								</div>
							</label>
						))}
					</div>
				</div>
			</div>

			<div className="form-actions">
				<button className="save-button">Save Preferences</button>
			</div>
		</div>
	);
}

function SecuritySettings() {
	const [showPassword, setShowPassword] = useState(false);
	const [passwordData, setPasswordData] = useState({
		current: "",
		new: "",
		confirm: "",
	});

	return (
		<div className="settings-section">
			<h2>Security Settings</h2>

			<div className="security-section">
				<h3>Change Password</h3>
				<div className="settings-form">
					<div className="form-group">
						<label>Current Password</label>
						<div className="password-input">
							<input
								type={showPassword ? "text" : "password"}
								value={passwordData.current}
								onChange={(e) =>
									setPasswordData({
										...passwordData,
										current: e.target.value,
									})
								}
							/>
							<button
								className="toggle-password"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
					</div>
					<div className="form-group">
						<label>New Password</label>
						<input
							type="password"
							value={passwordData.new}
							onChange={(e) =>
								setPasswordData({
									...passwordData,
									new: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-group">
						<label>Confirm New Password</label>
						<input
							type="password"
							value={passwordData.confirm}
							onChange={(e) =>
								setPasswordData({
									...passwordData,
									confirm: e.target.value,
								})
							}
						/>
					</div>
				</div>
			</div>

			<div className="security-section">
				<h3>Two-Factor Authentication</h3>
				<div className="two-factor-setup">
					<div className="status-indicator enabled">
						<CheckCircle size={20} />
						<span>2FA is currently enabled</span>
					</div>
					<button className="secondary-button">
						<RefreshCw size={16} />
						Reconfigure 2FA
					</button>
				</div>
			</div>

			<div className="security-section">
				<h3>Login History</h3>
				<div className="login-history">
					{/* Add login history table here */}
				</div>
			</div>
		</div>
	);
}

function PreferenceSettings() {
	const [preferences, setPreferences] = useState({
		language: "English",
		theme: "light",
		timeZone: "Africa/Johannesburg",
	});

	return (
		<div className="settings-section">
			<h2>Preferences</h2>

			<div className="preferences-group">
				<h3>Display Settings</h3>
				<div className="form-group">
					<label>Theme</label>
					<div className="theme-selector">
						<button
							className={`theme-option ${
								preferences.theme === "light" ? "active" : ""
							}`}
							onClick={() => setPreferences({ ...preferences, theme: "light" })}
						>
							<Sun size={20} />
							Light
						</button>
						<button
							className={`theme-option ${
								preferences.theme === "dark" ? "active" : ""
							}`}
							onClick={() => setPreferences({ ...preferences, theme: "dark" })}
						>
							<Moon size={20} />
							Dark
						</button>
					</div>
				</div>

				<div className="form-group">
					<label>Language</label>
					<select
						value={preferences.language}
						onChange={(e) =>
							setPreferences({
								...preferences,
								language: e.target.value,
							})
						}
					>
						<option value="English">English</option>
						<option value="Afrikaans">Afrikaans</option>
						<option value="isiZulu">isiZulu</option>
						<option value="isiXhosa">isiXhosa</option>
						<option value="Sesotho">Sesotho</option>
					</select>
				</div>

				<div className="form-group">
					<label>Time Zone</label>
					<select
						value={preferences.timeZone}
						onChange={(e) =>
							setPreferences({
								...preferences,
								timeZone: e.target.value,
							})
						}
					>
						<option value="Africa/Johannesburg">South Africa (GMT+2)</option>
						<option value="Africa/Windhoek">Namibia (GMT+2)</option>
						<option value="Africa/Maputo">Mozambique (GMT+2)</option>
					</select>
				</div>
			</div>
		</div>
	);
}

function AccessibilitySettings() {
	const [accessibility, setAccessibility] = useState({
		highContrast: false,
		largeText: false,
		reduceMotion: false,
		screenReader: false,
	});

	return (
		<div className="settings-section">
			<h2>Accessibility</h2>

			<div className="accessibility-options">
				{Object.entries(accessibility).map(([key, value]) => (
					<label key={key} className="accessibility-option">
						<div className="option-info">
							<h3>
								{key
									.replace(/([A-Z])/g, " $1")
									.replace(/^./, (str) => str.toUpperCase())}
							</h3>
							<p className="option-description">
								{getAccessibilityDescription(key)}
							</p>
						</div>
						<div className="toggle-switch">
							<input
								type="checkbox"
								checked={value}
								onChange={(e) =>
									setAccessibility({
										...accessibility,
										[key]: e.target.checked,
									})
								}
							/>
							<span className="toggle-slider"></span>
						</div>
					</label>
				))}
			</div>
		</div>
	);
}

function PrivacySettings() {
	const [privacy, setPrivacy] = useState({
		profileVisibility: "public",
		showEmail: true,
		showPhone: false,
		allowMessages: true,
	});

	return (
		<div className="settings-section">
			<h2>Privacy</h2>
			<div className="privacy-section">
				<h3>Profile Visibility</h3>
				<div className="privacy-options">
					<div className="radio-group">
						<label className="radio-option">
							<input
								type="radio"
								name="visibility"
								value="public"
								checked={privacy.profileVisibility === "public"}
								onChange={(e) =>
									setPrivacy({
										...privacy,
										profileVisibility: e.target.value,
									})
								}
							/>
							<div className="option-content">
								<span>Public</span>
								<p>Your profile is visible to all university members</p>
							</div>
						</label>
						<label className="radio-option">
							<input
								type="radio"
								name="visibility"
								value="students"
								checked={privacy.profileVisibility === "students"}
								onChange={(e) =>
									setPrivacy({
										...privacy,
										profileVisibility: e.target.value,
									})
								}
							/>
							<div className="option-content">
								<span>Students Only</span>
								<p>Only registered students can view your profile</p>
							</div>
						</label>
						<label className="radio-option">
							<input
								type="radio"
								name="visibility"
								value="private"
								checked={privacy.profileVisibility === "private"}
								onChange={(e) =>
									setPrivacy({
										...privacy,
										profileVisibility: e.target.value,
									})
								}
							/>
							<div className="option-content">
								<span>Private</span>
								<p>Only you and administrators can view your profile</p>
							</div>
						</label>
					</div>
				</div>
			</div>

			<div className="privacy-section">
				<h3>Contact Information Visibility</h3>
				<div className="toggle-options">
					<label className="toggle-option">
						<div className="option-info">
							<span>Show Email Address</span>
							<p>Display your email address on your profile</p>
						</div>
						<div className="toggle-switch">
							<input
								type="checkbox"
								checked={privacy.showEmail}
								onChange={(e) =>
									setPrivacy({
										...privacy,
										showEmail: e.target.checked,
									})
								}
							/>
							<span className="toggle-slider"></span>
						</div>
					</label>
					<label className="toggle-option">
						<div className="option-info">
							<span>Show Phone Number</span>
							<p>Display your phone number on your profile</p>
						</div>
						<div className="toggle-switch">
							<input
								type="checkbox"
								checked={privacy.showPhone}
								onChange={(e) =>
									setPrivacy({
										...privacy,
										showPhone: e.target.checked,
									})
								}
							/>
							<span className="toggle-slider"></span>
						</div>
					</label>
				</div>
			</div>

			<div className="privacy-section">
				<h3>Communication Preferences</h3>
				<div className="privacy-options">
					<label className="toggle-option">
						<div className="option-info">
							<span>Allow Direct Messages</span>
							<p>Let other students send you direct messages</p>
						</div>
						<div className="toggle-switch">
							<input
								type="checkbox"
								checked={privacy.allowMessages}
								onChange={(e) =>
									setPrivacy({
										...privacy,
										allowMessages: e.target.checked,
									})
								}
							/>
							<span className="toggle-slider"></span>
						</div>
					</label>
				</div>
			</div>

			<div className="privacy-section">
				<h3>Data Management</h3>
				<div className="data-management-options">
					<button className="secondary-button">
						<Download size={16} />
						Download My Data
					</button>
					<button className="danger-button">
						<AlertTriangle size={16} />
						Delete Account
					</button>
				</div>
			</div>

			<div className="form-actions">
				<button className="save-button">Save Privacy Settings</button>
				<button className="cancel-button">Reset to Defaults</button>
			</div>
		</div>
	);
}

// Helper function for accessibility descriptions
function getAccessibilityDescription(key) {
	const descriptions = {
		highContrast: "Increase contrast for better visibility",
		largeText: "Make text larger and easier to read",
		reduceMotion: "Minimize animations and motion effects",
		screenReader: "Optimize for screen reader compatibility",
	};
	return descriptions[key] || "";
}

export default SettingsContent;
