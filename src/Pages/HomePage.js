import React, { useState } from "react";

// Imported these icons from Lucin React, it's external so I had to install it on my terminal
import {
  Home,
  Users,
  CreditCard,
  Calendar,
  Video,
  CheckSquare,
  BookOpen,
  Calculator,
  Globe,
  Brain,
  Beaker,
  DollarSign,
  X,
} from "lucide-react";

// Components and styles imported
import Topbar from "../Shared/CTopBar";
import "../Shared/Styling/dashboard.css";
import ScheduleContent from "../Components/ScheduleContent";
import ResourcesContent from "../Components/ResourcesContent";
import ClassesContent from "../Components/ClassesContent";
import GradesContent from "../Components/GradesContent";
import { courses } from "./mockData";
import { TodoProvider, useTodo } from "../Components/TodoContext";

// This is the Task Modal code, I put it here because it's easier to fetch instead of making it a separate component for now - also thinking about removing it for something else (and it doesn't work)
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

// Dashboard - There's a lot of content here that displays on the landing page and I've written basically all the code it has because I couldn't make a separate component at the time.
function DashboardContent() {
  const [filter, setFilter] = useState("All");

  // Our filters, filters courses based on their major
  const filters = [
    { name: "All", icon: BookOpen },
    { name: "Computer Science", icon: Home },
    { name: "Mathematics", icon: Calculator },
    { name: "History", icon: Globe },
    { name: "Psychology", icon: Brain },
    { name: "Chemistry", icon: Beaker },
    { name: "Economics", icon: DollarSign },
  ];

  // Filters courses based on their major
  const filteredCourses =
    filter === "All"
      ? courses
      : courses.filter((course) => course.department === filter);

  return (
    <>
      <section className="hero">
        <div>
          <h1>Welcome, Student!</h1>
          <h2>Ready to continue your academic journey?</h2>
          <div className="hero-buttons">
            <button className="primary-button">View Schedule</button>
            <button className="secondary-button">Explore Courses</button>
          </div>
        </div>
      </section>

      <section className="courses">
        {/* Filter system for courses */}
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

        {/* The grid of courses that will be displayed */}
        <div className="course-grid">
          {/* Map over the courses array and render a card for each course */}
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <img
                src={course.image}
                alt={course.title}
                className="course-image"
              />

              {/* Course info */}
              <div className="course-info">
                <h4>{course.title}</h4>
                <p>{course.instructor}</p>
                <p>
                  {course.department} • {course.credits} credits
                </p>
                <div className="course-progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {course.progress}% Complete
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// Home Page
function HomePage({ userRole }) {
  // State management for the task modal and active section of the dashboard
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedTask, setSelectedTask] = useState(null);
  const { todos, toggleTodo } = useTodo();

  // Render the content of the dashboard based on the active section and user role
  const renderContent = () => {
    // Switch statement to render the content based on the active section - we can add more sections later?
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "classes":
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
    // Todo Provider is used to manage the todos and toggle them based on the id
    <TodoProvider>
      {/* The top navigation bar */}
      <div className="HomePage">
        {/* Sorry Tamara, moved your top-nav component here, but it still has the same function, get current page/active section and display it's name at the top */}
        <Topbar currentPage={activeSection} userRole={userRole} />

        {/* The side navigation bar */}
        <div className="dashboard">
          <nav className="sidebar">
            {/* The navigation buttons for the sidebar */}
            <div className="sidebar-content topnav">
              <button className="nav-button">
                <Home size={25} />
                <h3>Self-Service</h3>
              </button>
              <button className="nav-button">
                <Users size={25} />
                <h3>Student-Hub</h3>
              </button>
            </div>

            {/* The navigation buttons for the sidebar - midnav */}
            <div className="sidebar-content midnav">
              <button
                className={`nav-button ${
                  activeSection === "dashboard" ? "active" : ""
                }`}
                onClick={() => setActiveSection("dashboard")}
              >
                <Home size={25} />
                <h3>Dashboard</h3>
              </button>
              <button
                className={`nav-button ${
                  activeSection === "classes" ? "active" : ""
                }`}
                onClick={() => setActiveSection("classes")}
              >
                <Users size={25} />
                <h3>Classes</h3>
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

            {/* The navigation buttons for the sidebar - todo */}
            <div className="sidebar-content todo-list">
              <h3>
                <CheckSquare size={20} /> To-Do List
              </h3>

              {/* Map over the todos array and render a button for each todo */}
              {todos.map((task) => (
                <button
                  key={task.id}
                  className={`nav-button todo-item ${
                    task.completed ? "completed" : ""
                  }`}
                  onClick={() => toggleTodo(task.id)}
                >
                  {task.title}
                </button>
              ))}
            </div>
          </nav>

          {/* The main content of the dashboard */}
          <main className="main-content">{renderContent()}</main>
        </div>

        {/* The task modal component */}
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      </div>
    </TodoProvider>
  );
}

export default HomePage;
