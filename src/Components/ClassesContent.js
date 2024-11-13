import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Classes.css";
import { courses } from "../Mockdata/mockData";
import {
  Home,
  BookOpen,
  Calculator,
  Globe,
  Brain,
  Beaker,
  DollarSign,
  Search,
  SortAsc,
  Clock,
  AlertCircle,
  Calendar,
  BookMarked,
  MessageSquare,
  Users,
  BarChart2,
  CheckCircle,
  Bell,
  ChevronDown,
  Grid,
  List,
} from "lucide-react";

function ClassesContent() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("name");
  const [viewType, setViewType] = useState("grid"); // grid or list
  const [selectedSemester, setSelectedSemester] = useState("Fall 2024");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const filters = [
    { name: "All", icon: BookOpen },
    { name: "Computer Science", icon: Home },
    { name: "Mathematics", icon: Calculator },
    { name: "History", icon: Globe },
    { name: "Psychology", icon: Brain },
    { name: "Chemistry", icon: Beaker },
    { name: "Economics", icon: DollarSign },
  ];

  const semesters = ["Fall 2024", "Summer 2024", "Spring 2024", "Fall 2023"];

  const getUpcomingAssignment = (course) => {
    const upcomingAssignments = course.assignments
      .filter((assignment) => !assignment.submitted)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    return upcomingAssignments[0];
  };

  const calculateGradeAverage = (grades) => {
    const totalWeight = grades.reduce((sum, grade) => sum + grade.weight, 0);
    const weightedSum = grades.reduce(
      (sum, grade) => sum + grade.grade * grade.weight,
      0
    );
    return (weightedSum / totalWeight).toFixed(1);
  };

  const getActiveDiscussions = (course) => {
    return course.discussions.reduce(
      (sum, discussion) => sum + discussion.replies,
      0
    );
  };

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses;

    // Apply department filter
    if (filter !== "All") {
      filtered = filtered.filter((course) => course.department === filter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.code.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortType) {
        case "progress":
          return b.progress - a.progress;
        case "grade":
          return (
            calculateGradeAverage(b.grades) - calculateGradeAverage(a.grades)
          );
        case "activity":
          return getActiveDiscussions(b) - getActiveDiscussions(a);
        case "upcoming":
          const aAssignment = getUpcomingAssignment(a);
          const bAssignment = getUpcomingAssignment(b);
          if (!aAssignment) return 1;
          if (!bAssignment) return -1;
          return new Date(aAssignment.dueDate) - new Date(bAssignment.dueDate);
        default:
          return a.title.localeCompare(b.title);
      }
    });
  }, [filter, searchQuery, sortType]);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="classes-content">
      {/* Header Section */}
      <div className="classes-header">
        <div className="header-left">
          <h2 className="classes-heading">My Courses</h2>
          <div className="semester-selector">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="semester-select"
            >
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="view-controls">
          <button
            className={`view-button ${viewType === "grid" ? "active" : ""}`}
            onClick={() => setViewType("grid")}
          >
            <Grid size={20} />
          </button>
          <button
            className={`view-button ${viewType === "list" ? "active" : ""}`}
            onClick={() => setViewType("list")}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="search-filter-bar">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <BarChart2 size={20} />
          Filters
          <ChevronDown size={16} className={showFilters ? "rotate-180" : ""} />
        </button>

        <div className="sort-control">
          <SortAsc size={20} />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="progress">Sort by Progress</option>
            <option value="grade">Sort by Grade</option>
            <option value="activity">Sort by Activity</option>
            <option value="upcoming">Sort by Due Date</option>
          </select>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="expanded-filters">
          {filters.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setFilter(name)}
              className={`filter-button ${filter === name ? "active" : ""}`}
            >
              <Icon size={20} />
              <span>{name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Course Grid/List */}
      <section className={`courses ${viewType}`}>
        <div className={viewType === "grid" ? "course-grid" : "course-list"}>
          {filteredAndSortedCourses.map((course) => {
            const upcomingAssignment = getUpcomingAssignment(course);
            const completedModules = course.modules.filter(
              (m) => m.completed
            ).length;
            const gradeAverage = calculateGradeAverage(course.grades);
            const activeDiscussions = getActiveDiscussions(course);

            return (
              <div
                key={course.id}
                className="course-card"
                onClick={() => handleCourseClick(course.id)}
              >
                <div className="course-card-header">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="course-image"
                  />
                  <div className="course-badge">{course.code}</div>
                </div>

                <div className="course-info">
                  <div className="course-title-section">
                    <h4>{course.title}</h4>
                    <div className="course-meta">
                      <span className="department-tag">
                        {course.department}
                      </span>
                      <span className="credits-tag">
                        {course.credits} credits
                      </span>
                    </div>
                  </div>

                  <div className="instructor-section">
                    <Users size={16} />
                    <span>{course.instructor}</span>
                  </div>

                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Course Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="progress-stats">
                      <span>
                        <CheckCircle size={14} />
                        {completedModules}/{course.modules.length} Modules
                      </span>
                      <span>
                        <BarChart2 size={14} />
                        {gradeAverage}% Average
                      </span>
                    </div>
                  </div>

                  <div className="course-footer">
                    {upcomingAssignment && (
                      <div className="upcoming-assignment">
                        <Calendar size={14} />
                        <span>
                          Due:{" "}
                          {new Date(
                            upcomingAssignment.dueDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    <div className="activity-indicators">
                      <span className="activity-item">
                        <Bell size={14} />
                        {course.announcements.length}
                      </span>
                      <span className="activity-item">
                        <MessageSquare size={14} />
                        {activeDiscussions}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAndSortedCourses.length === 0 && (
          <div className="empty-state">
            <AlertCircle size={48} />
            <h3>No courses found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ClassesContent;
