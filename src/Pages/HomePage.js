import React, { useState } from "react";
import {
  Home,
  CreditCard,
  Users,
  Calendar,
  Video,
  BookOpen,
  Calculator,
  Globe,
  Brain,
  Beaker, // Changed from Flask to Beaker
  DollarSign,
  CheckSquare,
  X,
} from "lucide-react";
import Topbar from "../Shared/CTopBar";
import "../Shared/Styling/dashboard.css";
import { courses } from "./mockData";

// Mock data for tasks
const tasks = [
  {
    id: 1,
    title: "Submit Math Assignment",
    dueDate: "2024-09-10",
    details: "Complete problems 1-10 from Chapter 5",
  },
  {
    id: 2,
    title: "Read History Chapter",
    dueDate: "2024-09-12",
    details: "Read pages 100-120 and take notes",
  },
  {
    id: 3,
    title: "Prepare for Chemistry Lab",
    dueDate: "2024-09-15",
    details: "Review lab safety procedures and pre-lab questions",
  },
];

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

function HomePage({ userRole }) {
  const [filter, setFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);

  const filters = [
    { name: "All", icon: BookOpen },
    { name: "Computer Science", icon: Home },
    { name: "Mathematics", icon: Calculator },
    { name: "History", icon: Globe },
    { name: "Psychology", icon: Brain },
    { name: "Chemistry", icon: Beaker }, // Changed from Flask to Beaker
    { name: "Economics", icon: DollarSign },
  ];

  const filteredCourses =
    filter === "All"
      ? courses
      : courses.filter((course) => course.department === filter);

  return (
    <div className="HomePage">
      {/* Added a topbar that changes depending on which page youre on and which user youre logged in as */}
      <Topbar currentPage={"Dashboard"} userRole={userRole} />

      <div className="dashboard">
        <nav className="sidebar">
          <div className="sidebar-content topnav">
            <button className="nav-button active">
              <Home size={25} />
              <h3>Dashboard</h3>
            </button>
            <button className="nav-button">
              <CreditCard size={25} />
              <h3>Grades</h3>
            </button>
          </div>

          <div className="sidebar-content midnav">
            <button className="nav-button">
              <Users size={25} />
              <h3>Classes</h3>
            </button>
            <button className="nav-button">
              <Calendar size={25} />
              <h3>Schedule</h3>
            </button>
            <button className="nav-button">
              <Calendar size={25} />
              <h3>Schedule</h3>
            </button>
            <button className="nav-button">
              <Video size={25} />
              <h3>Resources</h3>
            </button>
          </div>

          <div className="sidebar-content todo-list">
            <h3>
              <CheckSquare size={20} /> To-Do List
            </h3>
            {tasks.map((task) => (
              <button
                key={task.id}
                className="nav-button todo-item"
                onClick={() => setSelectedTask(task)}
              >
                {task.title}
              </button>
            ))}
          </div>
        </nav>

        <main className="main-content">
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
            <div className="section-header">
              <h3>Your Courses</h3>
            </div>
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
            <div className="course-grid">
              {filteredCourses.map((course) => (
                <div key={course.id} className="course-card">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="course-image"
                  />
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
        </main>
      </div>

      <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}

export default HomePage;
