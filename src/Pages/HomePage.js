import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Clock,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  ChevronRight,
  Users,
  Calendar,
  Video,
  BookOpen,
  X,
  Group,
  Book,
  PieChart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Topbar from "../Shared/CTopBar";
import "../Shared/Styling/dashboard.css";
import { courses } from "../Mockdata/mockData";
import "../Styles/Home2.css";
import "../Styles/Home.css";
import ScheduleContent from "../Components/ScheduleContent";
import ResourcesContent from "../Components/ResourcesContent";
import ClassesContent from "../Components/ClassesContent";
import GradesContent from "../Components/GradesContent";
import SubmissionsContent from "../Components/SubmissionsContent";
import GroupsContent from "../Components/GroupsContent";
import useScrollToTop from "../hooks/useScrollToTop";

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
  // Alert data
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

  // Activity data for chart
  const activityData = [
    { day: "Mon", tasks: 8 },
    { day: "Tue", tasks: 12 },
    { day: "Wed", tasks: 7 },
    { day: "Thu", tasks: 15 },
    { day: "Fri", tasks: 10 },
    { day: "Sat", tasks: 5 },
    { day: "Sun", tasks: 3 },
  ];

  // Quick stats data
  const quickStats = {
    coursesInProgress: 6,
    upcomingDeadlines: 8,
    completedTasks: 45,
    totalTasks: 52,
    averageGrade: 88.5,
    gradeChange: 2.3,
    activeDiscussions: 12,
    studyTime: 28.5,
  };

  // Calculate upcoming deadlines
  const upcomingDeadlines = useMemo(() => {
    return courses
      .flatMap((course) =>
        course.assignments.map((assignment) => ({
          ...assignment,
          courseCode: course.code,
          courseTitle: course.title,
        }))
      )
      .filter((assignment) => !assignment.submitted)
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
      .slice(0, 5);
  }, []);

  // Calculate course progress
  const courseProgress = useMemo(() => {
    return courses.map((course) => ({
      code: course.code,
      title: course.title,
      progress: course.progress,
      completedModules: course.modules.filter((m) => m.completed).length,
      totalModules: course.modules.length,
    }));
  }, []);

  classesData.forEach((alert, index) => {
    alert.alertType = index % 2 === 0 ? "newest" : "oldest";
  });

  return (
    <div className="dashboard-content">
      {/* Hero Section */}
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

      {/* Quick Stats Grid */}
      <div className="stats-grid">
        <div className="home-stat-card">
          <div className="stat-content">
            <BookOpen className="stat-icon" />
            <div>
              <h3>Active Courses</h3>
              <div className="home-stat-value">
                {quickStats.coursesInProgress}
              </div>
            </div>
          </div>
          <div className="stat-footer">
            <span className="stat-label">In Progress</span>
          </div>
        </div>

        <div className="home-stat-card">
          <div className="stat-content">
            <Clock className="stat-icon" />
            <div>
              <h3>Upcoming Deadlines</h3>
              <div className="home-stat-value">
                {quickStats.upcomingDeadlines}
              </div>
            </div>
          </div>
          <div className="stat-footer">
            <span className="stat-label">This Week</span>
          </div>
        </div>

        <div className="home-stat-card">
          <div className="stat-content">
            <TrendingUp className="stat-icon" />
            <div>
              <h3>Average Grade</h3>
              <div className="home-stat-value">
                {quickStats.averageGrade}%
                <span
                  className={`grade-trend ${
                    quickStats.gradeChange >= 0 ? "positive" : "negative"
                  }`}
                >
                  {quickStats.gradeChange >= 0 ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )}
                  {Math.abs(quickStats.gradeChange)}%
                </span>
              </div>
            </div>
          </div>
          <div className="stat-footer">
            <span className="stat-label">Term Average</span>
          </div>
        </div>

        <div className="home-stat-card">
          <div className="stat-content">
            <CheckCircle className="stat-icon" />
            <div>
              <h3>Task Completion</h3>
              <div className="home-stat-value">
                {Math.round(
                  (quickStats.completedTasks / quickStats.totalTasks) * 100
                )}
                %
              </div>
            </div>
          </div>
          <div className="home-progress-bar">
            <div
              className="home-progress-fill"
              style={{
                width: `${Math.round(
                  (quickStats.completedTasks / quickStats.totalTasks) * 100
                )}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Activity Chart */}
        <div className="dashboard-card activity-chart">
          <div className="home-card-header">
            <h2>Weekly Activity</h2>
            <div className="home-card-actions">
              <button className="card-action-button">
                View Details
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="home-chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "12px" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="tasks"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Progress */}
        <div className="dashboard-card home-course-progress">
          <div className="home-card-header">
            <h2>Course Progress</h2>
          </div>
          <div className="progress-list">
            {courseProgress.map((course) => (
              <div key={course.code} className="progress-item">
                <div className="progress-info">
                  <div className="progress-course">{course.code}</div>
                  <div className="progress-title">{course.title}</div>
                  <div className="progress-stats">
                    <span>
                      {course.completedModules}/{course.totalModules} Modules
                    </span>
                    <span>{course.progress}% Complete</span>
                  </div>
                </div>
                <div className="home-progress-bar">
                  <div
                    className="home-progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="dashboard-card deadlines">
          <div className="home-card-header">
            <h2>Upcoming Deadlines</h2>
            <div className="home-card-actions">
              <button className="card-action-button">
                View All
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="deadlines-list">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="deadline-item">
                <div className="deadline-info">
                  <div className="deadline-course">{deadline.courseCode}</div>
                  <div className="deadline-title">{deadline.title}</div>
                  <div className="deadline-date">
                    <Clock size={14} />
                    Due {new Date(deadline.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <button className="deadline-action">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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

  // Use the hook with activeSection as dependency
  useScrollToTop(activeSection);

  const [selectedTask, setSelectedTask] = useState(null);

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
      case "submissions":
        return <SubmissionsContent />;
      case "groups":
        return <GroupsContent />;
      case "schedule":
        return <ScheduleContent />;
      case "resources":
        return <ResourcesContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
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
              <Group size={25} />
              <h3>Courses</h3>
            </button>
            <button
              className={`nav-button ${
                activeSection === "grades" ? "active" : ""
              }`}
              onClick={() => setActiveSection("grades")}
            >
              <PieChart size={25} />
              <h3>Grades</h3>
            </button>
            <button
              className={`nav-button ${
                activeSection === "submissions" ? "active" : ""
              }`}
              onClick={() => setActiveSection("submissions")}
            >
              <Book size={25} />
              <h3>Submissions</h3>
            </button>
            <button
              className={`nav-button ${
                activeSection === "groups" ? "active" : ""
              }`}
              onClick={() => setActiveSection("groups")}
            >
              <Users size={25} />
              <h3>Groups</h3>
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

          {/* <div className="sidebar-content todo-list">
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
						</div> */}
        </nav>

        {/* Main content area */}
        <main className="main-content">{renderContent()}</main>
      </div>

      {/* Modal for tasks */}
      <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}

export default HomePage;
