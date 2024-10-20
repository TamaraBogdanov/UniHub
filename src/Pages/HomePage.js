import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Home,
	Users,
	CreditCard,
	Calendar,
	Video,
	CheckSquare,
	BookOpen,
	X,
} from "lucide-react";
import Topbar from "../Shared/CTopBar";
import "../Shared/Styling/dashboard.css";
import ScheduleContent from "../Components/ScheduleContent";
import ResourcesContent from "../Components/ResourcesContent";
import ClassesContent from "../Components/ClassesContent";
import GradesContent from "../Components/GradesContent";
import { TodoProvider, useTodo } from "../Components/TodoContext";

function TaskModal({ task, onClose }) {
	if (!task) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<button className="modal-close" onClick={onClose}>
					<X size={24} />
				</button>
				<h2>{task.title}</h2>
				<p>
					<strong>Due Date:</strong> {task.dueDate}
				</p>
				<p>
					<strong>Details:</strong> {task.details}
				</p>
			</div>
		</div>
	);
}

function DashboardContent() {
	const [filter, setFilter] = useState("All");

	const filters = [
		{ name: "All", icon: BookOpen },
		{ name: "Newest", icon: Calendar },
		{ name: "Oldest", icon: Calendar },
	];

	const classesData = [
		{
			id: 1,
			title: "System Maintenance",
			message: "The system will be down for maintenance on 9th Sept.",
			date: "2024-09-09",
			alertType: "newest",
		},
		{
			id: 2,
			title: "Exam Results",
			message: "Your exam results are now available.",
			date: "2024-09-02",
			alertType: "oldest",
		},
		{
			id: 3,
			title: "New Course Enrollment",
			message: "Enrollment for the new courses is now open.",
			date: "2024-09-05",
			alertType: "newest",
		},
		{
			id: 4,
			title: "Library Due Date",
			message: "Your library book is due on 15th Sept.",
			date: "2024-09-01",
			alertType: "oldest",
		},
	];

	classesData.forEach((alert, index) => {
		alert.alertType = index % 2 === 0 ? "newest" : "oldest";
	});

	const filteredClasses = classesData
		.filter(
			(alert) =>
				filter === "All" ||
				(filter === "Newest" && alert.alertType === "newest") ||
				(filter === "Oldest" && alert.alertType === "oldest")
		)
		.sort((a, b) => {
			if (filter === "Newest") {
				return new Date(b.date) - new Date(a.date);
			}
			if (filter === "Oldest") {
				return new Date(a.date) - new Date(b.date);
			}
			return 0;
		});

	return (
		<>
			<section className="hero">
				<div className="hero-text">
					<h1>Welcome, Student!</h1>
					<h2>Ready to continue your academic journey?</h2>
					<div className="hero-buttons">
						<button className="primary-button">View Schedule</button>
						<button className="secondary-button">Explore Courses</button>
					</div>
				</div>
				<div className="hero-image">
					<img src="./images/portal.png" alt="Hero" />
				</div>
			</section>
			<div>
				<div className="filter-system">
					{filters.map(({ name, icon: Icon }) => (
						<button
							key={name}
							className={`filter-button ${filter === name ? "active" : ""}`}
							onClick={() => setFilter(name)}
						>
							<Icon size={16} /> {name}
						</button>
					))}
				</div>
				<div className="classes-list">
					{filteredClasses.map((alert) => (
						<AlertBox key={alert.id} alert={alert} />
					))}
				</div>
			</div>
		</>
	);
}

function AlertBox({ alert }) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className="alert-box" onClick={() => setIsExpanded(!isExpanded)}>
			<h3>{alert.title}</h3>
			{isExpanded && (
				<div className="alert-details">
					<p>{alert.message}</p>
					<p>
						<strong>Date:</strong> {alert.date}
					</p>
				</div>
			)}
		</div>
	);
}

function HomePage({ userRole }) {
	const [activeSection, setActiveSection] = useState("dashboard"); // Manages subpages (Courses, Grades, etc.)
	const [activeTopLevel, setActiveTopLevel] = useState("dashboard"); // Manages top-level navigation state

	const [selectedTask, setSelectedTask] = useState(null);
	const { todos, toggleTodo } = useTodo();
	const navigate = useNavigate();

	const handleTopLevelNavigation = (page) => {
		if (page === "self-service") {
			setActiveTopLevel("self-service"); // Set active state for self-service
			navigate("/self-service");
		} else if (page === "student-hub") {
			setActiveTopLevel("student-hub"); // Set active state for student hub
			navigate("/student-hub");
		}
	};

	const renderContent = () => {
		switch (activeSection) {
			case "dashboard":
				return <DashboardContent />;
			case "courses":
				return <ClassesContent />;
			case "grades":
				return <GradesContent />;
			case "schedule":
				return <ScheduleContent />;
			case "resources":
				return <ResourcesContent />;
			default:
				return <DashboardContent />;
		}
	};

	return (
		<TodoProvider>
			<div className="HomePage">
				{/* Pass activeTopPage to Topbar */}
				<Topbar currentPage="Dashboard" userRole={userRole} />

				<div className="dashboard">
					<nav className="sidebar">
						<div className="sidebar-content topnav">
							{/* New Dashboard Button */}
							{/* Keep Dashboard Button Active */}
							<button
								className="nav-button active" // Always active
								onClick={() => setActiveSection("dashboard")}
							>
								<Home size={25} />
								<h3>Dashboard</h3>
							</button>

							{/* Only changes activeTopPage */}

							<button
								className="nav-button"
								onClick={() => handleTopLevelNavigation("student-hub")}
							>
								<Users size={25} />
								<h3>Student Hub</h3>
							</button>
							<button
								className="nav-button"
								onClick={() => handleTopLevelNavigation("self-service")}
							>
								<Home size={25} />
								<h3>Self-Service</h3>
							</button>
						</div>

						<div className="sidebar-content midnav">
							{/* These buttons do not change the top-level page */}
							<button
								className={`nav-button ${
									activeSection === "dashboard" ? "active" : ""
								}`}
								onClick={() => setActiveSection("dashboard")}
							>
								<Home size={25} />
								<h3>Home</h3>
							</button>
							<button
								className={`nav-button ${
									activeSection === "courses" ? "active" : ""
								}`}
								onClick={() => setActiveSection("courses")}
							>
								<Users size={25} />
								<h3>Courses</h3>
							</button>
							<button
								className={`nav-button ${
									activeSection === "grades" ? "active" : ""
								}`}
								onClick={() => setActiveSection("grades")}
							>
								<CreditCard size={25} />
								<h3>Grades</h3>
							</button>
							<button
								className={`nav-button ${
									activeSection === "schedule" ? "active" : ""
								}`}
								onClick={() => setActiveSection("schedule")}
							>
								<Calendar size={25} />
								<h3>Schedule</h3>
							</button>
							<button
								className={`nav-button ${
									activeSection === "resources" ? "active" : ""
								}`}
								onClick={() => setActiveSection("resources")}
							>
								<Video size={25} />
								<h3>Resources</h3>
							</button>
						</div>

						<div className="sidebar-content todo-list">
							<h3>
								<CheckSquare size={25} /> Tasks
							</h3>
							<ul>
								{todos.map((task) => (
									<div key={task.id} className="todo-item">
										<input
											type="checkbox"
											checked={task.completed}
											onChange={() => toggleTodo(task.id)}
										/>
										<span className={task.completed ? "completed" : ""}>
											{task.title}
										</span>
									</div>
								))}
							</ul>
						</div>
					</nav>

					{/* Main content area */}
					<main className="main-content">{renderContent()}</main>
				</div>

				{/* Modal for tasks */}
				<TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
			</div>
		</TodoProvider>
	);
}

export default HomePage;
