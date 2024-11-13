import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Info,
  Book,
  Video,
  Globe,
  Settings,
  FileText,
  Award,
  Link,
  Bell,
  MessageSquare,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  BarChart2,
  BookOpen,
  Users,
  ExternalLink,
  AlertTriangle,
  ChevronRight,
  Star,
  Download,
} from "lucide-react";
import { courses } from "../Mockdata/mockData";
import "../Styles/CourseDetail.css";

// Helper Functions
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

function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const [moduleExpanded, setModuleExpanded] = useState({});

  const course = courses.find((c) => c.id === parseInt(courseId));

  if (!course) {
    return (
      <div className="course-not-found">
        <AlertTriangle size={48} />
        <h2>Course Not Found</h2>
        <p>The requested course could not be found.</p>
        <button className="back-button" onClick={() => navigate("/home")}>
          <ArrowLeft size={20} />
          Back to Courses
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewContent course={course} />;
      case "modules":
        return (
          <ModulesContent
            modules={course.modules}
            expanded={moduleExpanded}
            setExpanded={setModuleExpanded}
          />
        );
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
            <div className="course-header-main">
              <h1>{course.title}</h1>
              <p className="course-header-meta">
                <span className="course-code">{course.code}</span>
                <span className="course-instructor">
                  <Users size={16} />
                  {course.instructor}
                </span>
                <span className="course-credits">
                  <BookOpen size={16} />
                  {course.credits} credits
                </span>
              </p>
            </div>
            <div className="course-quick-stats">
              <div className="quick-stat">
                <BarChart2 size={16} />
                <span>Progress: {course.progress}%</span>
              </div>
              <div className="quick-stat">
                <CheckCircle size={16} />
                <span>
                  {course.modules.filter((m) => m.completed).length}/
                  {course.modules.length} Modules
                </span>
              </div>
              <div className="quick-stat">
                <MessageSquare size={16} />
                <span>
                  {course.discussions.reduce((sum, d) => sum + d.replies, 0)}{" "}
                  Discussion Posts
                </span>
              </div>
            </div>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function OverviewContent({ course }) {
  const nextDueAssignment = course.assignments
    .filter((a) => !a.submitted)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];

  const calculateGradeAverage = () => {
    const totalWeight = course.grades.reduce(
      (sum, grade) => sum + grade.weight,
      0
    );
    return (
      course.grades.reduce(
        (sum, grade) => sum + grade.grade * grade.weight,
        0
      ) / totalWeight
    ).toFixed(2);
  };

  return (
    <div className="overview-content">
      <div className="overview-grid">
        <div className="overview-main">
          <section className="overview-section">
            <h2>Course Overview</h2>
            <p>{course.description}</p>
          </section>

          <section className="overview-section">
            <h3>Course Progress</h3>
            <div className="detail-course-progress">
              <div className="progress-header">
                <span>Overall Completion</span>
                <span>{course.progress}%</span>
              </div>
              <div className="detail-progress-bar">
                <div
                  className="progress"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="progress-stats">
                <div className="stat-item">
                  <CheckCircle size={16} />
                  <span>
                    {course.modules.filter((m) => m.completed).length} of{" "}
                    {course.modules.length} Modules Complete
                  </span>
                </div>
                <div className="stat-item">
                  <FileText size={16} />
                  <span>
                    {course.assignments.filter((a) => a.submitted).length} of{" "}
                    {course.assignments.length} Assignments Submitted
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="overview-sidebar">
          <section className="overview-card upcoming-deadlines">
            <h3>
              <Clock size={20} />
              Next Deadline
            </h3>
            {nextDueAssignment ? (
              <div className="upcoming-assignment">
                <h4>{nextDueAssignment.title}</h4>
                <p>
                  Due:{" "}
                  {new Date(nextDueAssignment.dueDate).toLocaleDateString()}
                </p>
                <button className="view-assignment">
                  View Assignment
                  <ChevronRight size={16} />
                </button>
              </div>
            ) : (
              <p className="no-deadlines">No upcoming deadlines!</p>
            )}
          </section>

          <section className="overview-card quick-links">
            <h3>Quick Links</h3>
            <div className="quick-links-grid">
              {course.resources.slice(0, 4).map((resource) => (
                <a
                  key={resource.id}
                  href={resource.link}
                  className="quick-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  {resource.title}
                </a>
              ))}
            </div>
          </section>

          <section className="overview-card course-stats">
            <h3>Course Stats</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <BarChart2 size={20} />
                <div className="stat-info">
                  <span className="stat-label">Current Grade</span>
                  <span className="stat-value">{calculateGradeAverage()}%</span>
                </div>
              </div>
              <div className="stat-box">
                <MessageSquare size={20} />
                <div className="stat-info">
                  <span className="stat-label">Discussion Posts</span>
                  <span className="stat-value">
                    {course.discussions.reduce((sum, d) => sum + d.replies, 0)}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ModulesContent({ modules, expanded, setExpanded }) {
  return (
    <div className="modules-content">
      <h2>Course Modules</h2>
      <ul className="module-list">
        {modules.map((module) => (
          <li
            key={module.id}
            className={`module-item ${module.completed ? "completed" : ""} ${
              expanded[module.id] ? "expanded" : ""
            }`}
          >
            <div
              className="module-header"
              onClick={() =>
                setExpanded((prev) => ({
                  ...prev,
                  [module.id]: !prev[module.id],
                }))
              }
            >
              <div className="module-title">
                <ChevronRight
                  size={20}
                  className={expanded[module.id] ? "rotate-90" : ""}
                />
                <span>{module.title}</span>
              </div>
              {module.completed ? (
                <span className="completion-status">
                  <CheckCircle size={16} /> Completed
                </span>
              ) : (
                <span className="completion-status incomplete">
                  <XCircle size={16} /> Incomplete
                </span>
              )}
            </div>
            {expanded[module.id] && (
              <div className="module-content">
                <div className="module-resources">
                  <h4>Module Resources</h4>
                  <ul className="resource-list">
                    <li className="resource-item">
                      <Download size={16} />
                      <span>Lecture Slides</span>
                    </li>
                    <li className="resource-item">
                      <FileText size={16} />
                      <span>Reading Materials</span>
                    </li>
                  </ul>
                </div>
                <div className="module-activities">
                  <h4>Activities</h4>
                  <ul className="activity-list">
                    <li className="activity-item">
                      <CheckCircle size={16} />
                      <span>Complete Reading</span>
                    </li>
                    <li className="activity-item">
                      <XCircle size={16} />
                      <span>Submit Quiz</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AssignmentsContent({ assignments }) {
  const [filter, setFilter] = useState("all"); // all, submitted, pending

  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === "submitted") return assignment.submitted;
    if (filter === "pending") return !assignment.submitted;
    return true;
  });

  return (
    <div className="assignments-content">
      <div className="assignments-header">
        <h2>Assignments</h2>
        <div className="assignment-filters">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "submitted" ? "active" : ""}`}
            onClick={() => setFilter("submitted")}
          >
            Submitted
          </button>
          <button
            className={`filter-btn ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>
      </div>
      <ul className="assignment-list">
        {filteredAssignments.map((assignment) => (
          <li key={assignment.id} className="assignment-item">
            <div className="assignment-header">
              <h3>{assignment.title}</h3>
              <span
                className={`status-indicator ${
                  assignment.submitted
                    ? "status-submitted"
                    : "status-not-submitted"
                }`}
              >
                {assignment.submitted ? (
                  <>
                    <CheckCircle size={16} /> Submitted
                  </>
                ) : (
                  <>
                    <Clock size={16} /> Pending
                  </>
                )}
              </span>
            </div>
            <div className="assignment-details">
              <div className="due-date">
                <Calendar size={16} />
                <span>Due: {assignment.dueDate}</span>
              </div>
              <button className="view-assignment-btn">
                View Assignment <ChevronRight size={16} />
              </button>
            </div>
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

  const getGradeColor = (grade) => {
    if (grade >= 90) return "grade-a";
    if (grade >= 80) return "grade-b";
    if (grade >= 70) return "grade-c";
    if (grade >= 60) return "grade-d";
    return "grade-f";
  };

  return (
    <div className="grades-content">
      <div className="grades-header">
        <h2>Grades</h2>
        <div className="grade-summary">
          <div className={`overall-grade ${getGradeColor(weightedAverage)}`}>
            <span className="grade-label">Overall Grade</span>
            <span className="grade-value">{weightedAverage.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      <div className="grades-chart">
        <h3>Grade Distribution</h3>
        <div className="grade-bars">
          {grades.map((grade) => (
            <div key={grade.id} className="grade-bar-container">
              <div className="grade-bar-label">{grade.title}</div>
              <div className="grade-bar-wrapper">
                <div
                  className={`grade-bar ${getGradeColor(grade.grade)}`}
                  style={{ height: `${grade.grade}%` }}
                >
                  <span className="grade-percentage">{grade.grade}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grades-list">
        {grades.map((grade) => (
          <div key={grade.id} className="grade-item">
            <div className="grade-item-header">
              <h3>{grade.title}</h3>
              <div className={`grade-badge ${getGradeColor(grade.grade)}`}>
                {grade.grade}%
              </div>
            </div>
            <div className="grade-item-details">
              <div className="grade-weight">
                <BarChart2 size={16} />
                <span>Weight: {grade.weight}%</span>
              </div>
              <div className="grade-contribution">
                <span>Contribution to Final Grade: </span>
                <strong>
                  {((grade.grade * grade.weight) / totalWeight).toFixed(2)}%
                </strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourcesContent({ resources }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = ["all", ...new Set(resources.map((r) => r.type))];

  const filteredResources = resources.filter(
    (resource) => activeCategory === "all" || resource.type === activeCategory
  );

  return (
    <div className="resources-content">
      <div className="resources-header">
        <h2>Course Resources</h2>
        <div className="resource-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="resources-grid">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="resource-card">
            <div className="resource-icon">
              {getResourceIcon(resource.type)}
            </div>
            <div className="resource-info">
              <h3>{resource.title}</h3>
              <span className="resource-type">{resource.type}</span>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link"
              >
                Access Resource
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnnouncementsContent({ announcements }) {
  const sortedAnnouncements = [...announcements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="announcements-content">
      <h2>Announcements</h2>
      <div className="announcements-timeline">
        {sortedAnnouncements.map((announcement) => (
          <div key={announcement.id} className="announcement-item">
            <div className="announcement-date-marker">
              <div className="date-bubble">{formatDate(announcement.date)}</div>
              <div className="timeline-line"></div>
            </div>
            <div className="announcement-card">
              <div className="announcement-header">
                <Bell size={16} />
                <span className="announcement-time">
                  {formatTime(announcement.date)}
                </span>
              </div>
              <div className="announcement-content">
                <p>{announcement.content}</p>
              </div>
              <div className="announcement-actions">
                <button className="action-button">
                  <MessageSquare size={16} />
                  Comment
                </button>
                <button className="action-button">
                  <Star size={16} />
                  Mark Important
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscussionsContent({ discussions }) {
  const [activeTab, setActiveTab] = useState("popular");

  const sortedDiscussions = [...discussions].sort((a, b) => {
    if (activeTab === "popular") {
      return b.replies - a.replies;
    }
    // Add other sorting options as needed
    return 0;
  });

  return (
    <div className="discussions-content">
      <div className="discussions-header">
        <h2>Discussion Forums</h2>
        <div className="discussion-tabs">
          <button
            className={`tab-btn ${activeTab === "popular" ? "active" : ""}`}
            onClick={() => setActiveTab("popular")}
          >
            Popular
          </button>
          <button
            className={`tab-btn ${activeTab === "recent" ? "active" : ""}`}
            onClick={() => setActiveTab("recent")}
          >
            Recent
          </button>
          <button
            className={`tab-btn ${activeTab === "trending" ? "active" : ""}`}
            onClick={() => setActiveTab("trending")}
          >
            Trending
          </button>
        </div>
      </div>

      <div className="discussions-list">
        {sortedDiscussions.map((discussion) => (
          <div key={discussion.id} className="discussion-card">
            <div className="discussion-main">
              <h3>{discussion.title}</h3>
              <div className="discussion-stats">
                <div className="stat">
                  <MessageSquare size={16} />
                  <span>{discussion.replies} replies</span>
                </div>
                <div className="stat">
                  <Users size={16} />
                  <span>
                    {Math.round(discussion.replies * 1.5)} participants
                  </span>
                </div>
              </div>
            </div>
            <button className="join-discussion">
              Join Discussion
              <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper functions
function getResourceIcon(type) {
  switch (type.toLowerCase()) {
    case "book":
    case "textbook":
      return <Book size={24} />;
    case "video":
    case "video series":
      return <Video size={24} />;
    case "website":
      return <Globe size={24} />;
    case "tool":
    case "interactive tool":
      return <Settings size={24} />;
    default:
      return <FileText size={24} />;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default CourseDetailPage;
