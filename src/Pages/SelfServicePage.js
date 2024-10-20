import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Home,
	Users,
	BookOpen,
	DollarSign,
	User,
	Calendar,
	FileText,
	Settings,
	HelpCircle,
} from "lucide-react";
import Topbar from "../Shared/CTopBar";
import "../Styles/Home2.css";

// Import content components (to be created)
import SelfServiceHomeContent from "../Components/SelfServiceHomeContent";
import AcademicRecordsContent from "../Components/AcademicRecordsContent";
import FinancialInformationContent from "../Components/FinancialInformationContent";
import PersonalInformationContent from "../Components/PersonalInformationContent";
import RegistrationContent from "../Components/RegistrationContent";
import FormsAndRequestsContent from "../Components/FormsAndRequestsContent";
import SettingsContent from "../Components/SettingsContent";
import HelpAndSupportContent from "../Components/HelpAndSupportContent";

function SelfServicePage({ userRole }) {
	const [activeSection, setActiveSection] = useState("home");
	const [topbarColor, setTopbarColor] = useState("#1b065e");
	const navigate = useNavigate();

	useEffect(() => {
		setTopbarColor("#1b065e"); // Default color for Self-Service
	}, [activeSection]);

	const renderContent = () => {
		switch (activeSection) {
			case "home":
				return <SelfServiceHomeContent />;
			case "academic-records":
				return <AcademicRecordsContent />;
			case "financial-information":
				return <FinancialInformationContent />;
			case "personal-information":
				return <PersonalInformationContent />;
			case "registration":
				return <RegistrationContent />;
			case "forms-and-requests":
				return <FormsAndRequestsContent />;
			case "settings":
				return <SettingsContent />;
			case "help-and-support":
				return <HelpAndSupportContent />;
			default:
				return <SelfServiceHomeContent />;
		}
	};

	const handleNavigation = (page) => {
		if (page === "student-hub") {
			navigate("/student-hub");
		} else if (page === "home") {
			setActiveSection("home");
			navigate("/home");
		} else {
			setActiveSection(page);
		}
	};

	return (
		<div className="SelfServicePage">
			<Topbar
				currentPage="Self-Service"
				userRole={userRole}
				topbarColor={topbarColor}
			/>

			<div className="dashboard">
				<nav className="sidebar">
					<div className="sidebar-content topnav">
						<button
							className="nav-button"
							onClick={() => handleNavigation("home")}
						>
							<Home size={25} />
							<h3>Dashboard</h3>
						</button>
						<button
							className="nav-button"
							onClick={() => handleNavigation("student-hub")}
						>
							<Users size={25} />
							<h3>Student Hub</h3>
						</button>
						<button
							className="nav-button active" // Always active
							onClick={() => setActiveSection("self-service")}
						>
							<Home size={25} />
							<h3>Self-Service</h3>
						</button>
					</div>

					<div className="sidebar-content midnav">
						<button
							className={`nav-button ${
								activeSection === "home" ? "active" : ""
							}`}
							onClick={() => setActiveSection("home")}
						>
							<Home size={25} />
							<h3>Self-Service Home</h3>
						</button>
						<button
							className={`nav-button ${
								activeSection === "academic-records" ? "active" : ""
							}`}
							onClick={() => setActiveSection("academic-records")}
						>
							<BookOpen size={25} />
							<h3>Academic Records</h3>
						</button>
						<button
							className={`nav-button ${
								activeSection === "financial-information" ? "active" : ""
							}`}
							onClick={() => setActiveSection("financial-information")}
						>
							<DollarSign size={25} />
							<h3>Financial Information</h3>
						</button>
						<button
							className={`nav-button ${
								activeSection === "personal-information" ? "active" : ""
							}`}
							onClick={() => setActiveSection("personal-information")}
						>
							<User size={25} />
							<h3>Personal Information</h3>
						</button>
						<button
							className={`nav-button ${
								activeSection === "registration" ? "active" : ""
							}`}
							onClick={() => setActiveSection("registration")}
						>
							<Calendar size={25} />
							<h3>Registration</h3>
						</button>
						<button
							className={`nav-button ${
								activeSection === "forms-and-requests" ? "active" : ""
							}`}
							onClick={() => setActiveSection("forms-and-requests")}
						>
							<FileText size={25} />
							<h3>Forms and Requests</h3>
						</button>
						<button
							className={`nav-button ${
								activeSection === "settings" ? "active" : ""
							}`}
							onClick={() => setActiveSection("settings")}
						>
							<Settings size={25} />
							<h3>Settings</h3>
						</button>
						<button
							className={`nav-button ${
								activeSection === "help-and-support" ? "active" : ""
							}`}
							onClick={() => setActiveSection("help-and-support")}
						>
							<HelpCircle size={25} />
							<h3>Help and Support</h3>
						</button>
					</div>
				</nav>

				<main className="main-content">{renderContent()}</main>
			</div>
		</div>
	);
}

export default SelfServicePage;
