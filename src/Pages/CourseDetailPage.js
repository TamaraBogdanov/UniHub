import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	ArrowLeft,
	Info,
	Book,
	FileText,
	Award,
	Link,
	Bell,
	MessageSquare,
	CheckCircle,
	XCircle,
} from "lucide-react";
import { courses } from "../Mockdata/mockData";
import "../Styles/CourseDetail.css";

function CourseDetailPage() {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState("overview");

	const course = courses.find((c) => c.id === parseInt(courseId));

	if (!course) {
		return <div>Course not found</div>;
	}

	const renderContent = () => {
		switch (activeSection) {
			case "overview":
				return <OverviewContent course={course} />;
			case "modules":
				return <ModulesContent modules={course.modules} />;
			case "assignments":
				return <AssignmentsContent assignments={course.assignments} />;
			case "grades":
				return <GradesContent grades={course.grades} />;
			case "resources":
				return <ResourcesContent resources={course.resources} />;
			case "announcements":
				return <AnnouncementsContent announcements={course.announcements} />;
			case "discussions":
				return <DiscussionsContent discussions={course.discussions} />;
			default:
				return <OverviewContent course={course} />;
		}
	};

	return (
		<div className="course-detail-page">
			<nav className="detailed-sidebar">
				<div className="detailed-sidebar-content">
					<button className="back-button" onClick={() => navigate("/home")}>
						<ArrowLeft size={20} />
						Back to Courses
					</button>
					{[
						"overview",
						"modules",
						"assignments",
						"grades",
						"resources",
						"announcements",
						"discussions",
					].map((section) => (
						<button
							key={section}
							className={`detailed-nav-button ${
								activeSection === section ? "active" : ""
							}`}
							onClick={() => setActiveSection(section)}
						>
							{getIcon(section)}
							<span>{capitalizeFirstLetter(section)}</span>
						</button>
					))}
				</div>
			</nav>

			<main className="course-main-content">
				<div className="content-wrapper">
					<div className="course-header">
						<h1>{course.title}</h1>
						<p>
							{course.code} • {course.instructor}
						</p>
					</div>
					{renderContent()}
				</div>
			</main>
		</div>
	);
}

function getIcon(section) {
	const icons = {
		overview: Info,
		modules: Book,
		assignments: FileText,
		grades: Award,
		resources: Link,
		announcements: Bell,
		discussions: MessageSquare,
	};
	const IconComponent = icons[section];
	return <IconComponent size={20} />;
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function OverviewContent({ course }) {
	return (
		<div className="overview-content">
			<h2>Course Overview</h2>
			<p>{course.description}</p>
			<div className="course-info">
				<p>
					<strong>Instructor:</strong> {course.instructor}
				</p>
				<p>
					<strong>Department:</strong> {course.department}
				</p>
				<p>
					<strong>Credits:</strong> {course.credits}
				</p>
			</div>
			<div className="detail-course-progress">
				<h3>Course Progress</h3>
				<div className="detail-progress-bar">
					<div
						className="progress"
						style={{ width: `${course.progress}%` }}
					></div>
				</div>
				<p>{course.progress}% Complete</p>
			</div>
		</div>
	);
}

function ModulesContent({ modules }) {
	return (
		<div className="modules-content">
			<h2>Course Modules</h2>
			<ul className="module-list">
				{modules.map((module) => (
					<li
						key={module.id}
						className={`module-item ${module.completed ? "completed" : ""}`}
					>
						<span>{module.title}</span>
						{module.completed ? (
							<span className="completion-status">
								<CheckCircle size={16} /> Completed
							</span>
						) : (
							<span className="completion-status incomplete">
								<XCircle size={16} /> Incomplete
							</span>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

function AssignmentsContent({ assignments }) {
	return (
		<div className="assignments-content">
			<h2>Assignments</h2>
			<ul className="assignment-list">
				{assignments.map((assignment) => (
					<li key={assignment.id} className="assignment-item">
						<h3>{assignment.title}</h3>
						<p>Due Date: {assignment.dueDate}</p>
						<p>
							Status:
							<span
								className={`status-indicator ${
									assignment.submitted
										? "status-submitted"
										: "status-not-submitted"
								}`}
							>
								{assignment.submitted ? "Submitted" : "Not Submitted"}
							</span>
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}

function GradesContent({ grades }) {
	const totalWeight = grades.reduce((sum, grade) => sum + grade.weight, 0);
	const weightedAverage =
		grades.reduce((sum, grade) => sum + grade.grade * grade.weight, 0) /
		totalWeight;

	return (
		<div className="grades-content">
			<h2>Grades</h2>
			<p>Overall Grade: {weightedAverage.toFixed(2)}%</p>
			<ul className="grade-list">
				{grades.map((grade) => (
					<li key={grade.id} className="grade-item">
						<h3>{grade.title}</h3>
						<p>Grade: {grade.grade}%</p>
						<p>Weight: {grade.weight}%</p>
					</li>
				))}
			</ul>
		</div>
	);
}

function ResourcesContent({ resources }) {
	return (
		<div className="resources-content">
			<h2>Course Resources</h2>
			<ul className="resource-list">
				{resources.map((resource) => (
					<li key={resource.id} className="resource-item">
						<h3>{resource.title}</h3>
						<p>Type: {resource.type}</p>
						<a href={resource.link} target="_blank" rel="noopener noreferrer">
							Access Resource
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

function AnnouncementsContent({ announcements }) {
	return (
		<div className="announcements-content">
			<h2>Announcements</h2>
			<ul className="announcement-list">
				{announcements.map((announcement) => (
					<li key={announcement.id} className="announcement-item">
						<p className="announcement-date">{announcement.date}</p>
						<p>{announcement.content}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

function DiscussionsContent({ discussions }) {
	return (
		<div className="discussions-content">
			<h2>Discussion Forums</h2>
			<ul className="discussion-list">
				{discussions.map((discussion) => (
					<li key={discussion.id} className="discussion-item">
						<h3>{discussion.title}</h3>
						<p>{discussion.replies} replies</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default CourseDetailPage;
