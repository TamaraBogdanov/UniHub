import React, { useState, useMemo } from "react";
import "../Styles/Submissions.css";
import { courses } from "../Mockdata/mockData";
import {
  Calendar,
  BookOpen,
  AlertCircle,
  FileText,
  ChevronDown,
  Search,
  SortAsc,
} from "lucide-react";

function SubmissionsContent() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("dueDate");
  const [showFilters, setShowFilters] = useState(false);

  // Extract all assignments from courses
  const allAssignments = useMemo(() => {
    return courses.flatMap((course) =>
      course.assignments.map((assignment) => ({
        ...assignment,
        courseTitle: course.title,
        courseCode: course.code,
        department: course.department,
      }))
    );
  }, []);

  // Filter and sort assignments
  const filteredAssignments = useMemo(() => {
    let filtered = allAssignments;

    // Apply status filter
    if (filter !== "all") {
      filtered = filtered.filter((assignment) =>
        filter === "submitted" ? assignment.submitted : !assignment.submitted
      );
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (assignment) =>
          assignment.title.toLowerCase().includes(query) ||
          assignment.courseTitle.toLowerCase().includes(query) ||
          assignment.courseCode.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortType) {
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "course":
          return a.courseTitle.localeCompare(b.courseTitle);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [allAssignments, filter, searchQuery, sortType]);

  const getStatusClass = (assignment) => {
    if (assignment.submitted) {
      return "submission-status-submitted";
    }
    const dueDate = new Date(assignment.dueDate);
    const today = new Date();
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "status-overdue";
    if (diffDays <= 3) return "status-due-soon";
    return "status-upcoming";
  };

  const getStatusText = (assignment) => {
    if (assignment.submitted) return "Submitted";
    const dueDate = new Date(assignment.dueDate);
    const today = new Date();
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due Today";
    if (diffDays === 1) return "Due Tomorrow";
    return `Due in ${diffDays} days`;
  };

  return (
    <div className="submissions-content">
      <div className="submissions-header">
        <div className="submissions-header-left">
          <h1 className="submissions-heading">Submissions</h1>
          <p className="submissions-subheading">
            Track and manage your course assignments
          </p>
        </div>

        <div className="header-right">
          <div className="assignment-count">
            <FileText />
            <span>{filteredAssignments.length} Assignments</span>
          </div>
        </div>
      </div>

      <div className="submissions-controls">
        <div className="search-sort-section">
          <div className="search-box">
            <Search className="submissions-search-icon" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="submissions-search-input"
            />
          </div>

          <div className="control-buttons">
            <select
              className="submissions-sort-select"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="course">Sort by Course</option>
              <option value="title">Sort by Title</option>
            </select>

            <button
              className="submissions-filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SortAsc />
              Filter
              <ChevronDown className={showFilters ? "rotate" : ""} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="filter-buttons">
            <button
              className={`filter-button ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`filter-button ${
                filter === "pending" ? "active" : ""
              }`}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button
              className={`filter-button ${
                filter === "submitted" ? "active" : ""
              }`}
              onClick={() => setFilter("submitted")}
            >
              Submitted
            </button>
          </div>
        )}
      </div>

      <div className="assignments-grid">
        {filteredAssignments.map((assignment) => (
          <div
            key={`${assignment.courseCode}-${assignment.id}`}
            className="assignment-card"
          >
            <div className="assignment-content">
              <div className="assignment-submissions-header">
                <div className="submissions-course-info">
                  <BookOpen />
                  <span>{assignment.courseCode}</span>
                  <span className="dot">•</span>
                  <span>{assignment.courseTitle}</span>
                </div>

                <div className={`status-badge ${getStatusClass(assignment)}`}>
                  {getStatusText(assignment)}
                </div>
              </div>

              <h3 className="assignment-title">{assignment.title}</h3>

              <div className="assignment-meta">
                <div className="due-date">
                  <Calendar />
                  <span>
                    {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAssignments.length === 0 && (
          <div className="empty-state">
            <AlertCircle />
            <h3>No assignments found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubmissionsContent;
