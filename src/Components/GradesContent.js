import React, { useState, useMemo } from "react";
import "../Styles/Grades.css";
import { courses } from "../Mockdata/mockData";
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Award,
  Target,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Clock,
} from "lucide-react";

// Mock grade history data
const gradeHistory = [
  { month: "Sep", average: 85 },
  { month: "Oct", average: 82 },
  { month: "Nov", average: 88 },
  { month: "Dec", average: 86 },
  { month: "Jan", average: 90 },
  { month: "Feb", average: 87 },
  { month: "Mar", average: 92 },
];

const performanceMetrics = {
  currentGPA: 3.7,
  trendDirection: "up",
  trendPercentage: 5.2,
  totalCredits: 45,
  completedAssignments: 78,
  upcomingAssignments: 12,
  bestPerformance: "CS101",
  needsImprovement: "MATH201",
};

function GradesContent() {
  const [selectedTerm, setSelectedTerm] = useState("Spring 2024");
  const [selectedCourse, setSelectedCourse] = useState(null);
  // const [showDetails, setShowDetails] = useState(false);
  const [gradeFilter, setGradeFilter] = useState("all"); // all, high, low

  // Calculate overall statistics
  const stats = useMemo(() => {
    const allGrades = courses.flatMap((course) => course.grades);
    const totalGrades = allGrades.reduce(
      (sum, grade) => sum + grade.grade * grade.weight,
      0
    );
    const totalWeight = allGrades.reduce((sum, grade) => sum + grade.weight, 0);

    return {
      average: (totalGrades / totalWeight).toFixed(1),
      highest: Math.max(...allGrades.map((grade) => grade.grade)),
      lowest: Math.min(...allGrades.map((grade) => grade.grade)),
      total: allGrades.length,
    };
  }, []);

  // Filter and sort courses based on grades
  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    if (gradeFilter === "high") {
      filtered = filtered.filter((course) => {
        const avg =
          course.grades.reduce(
            (sum, grade) => sum + grade.grade * grade.weight,
            0
          ) / course.grades.reduce((sum, grade) => sum + grade.weight, 0);
        return avg >= 85;
      });
    } else if (gradeFilter === "low") {
      filtered = filtered.filter((course) => {
        const avg =
          course.grades.reduce(
            (sum, grade) => sum + grade.grade * grade.weight,
            0
          ) / course.grades.reduce((sum, grade) => sum + grade.weight, 0);
        return avg < 85;
      });
    }

    return filtered.sort((a, b) => {
      const aAvg =
        a.grades.reduce((sum, grade) => sum + grade.grade * grade.weight, 0) /
        a.grades.reduce((sum, grade) => sum + grade.weight, 0);
      const bAvg =
        b.grades.reduce((sum, grade) => sum + grade.grade * grade.weight, 0) /
        b.grades.reduce((sum, grade) => sum + grade.weight, 0);
      return bAvg - aAvg;
    });
  });

  const getGradeColor = (grade) => {
    if (grade >= 90) return "text-emerald-500";
    if (grade >= 80) return "text-blue-500";
    if (grade >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getGradeLetter = (grade) => {
    if (grade >= 90) return "A";
    if (grade >= 80) return "B";
    if (grade >= 70) return "C";
    if (grade >= 60) return "D";
    return "F";
  };

  return (
    <div className="grades-content">
      {/* Header Section */}
      <div className="grades-header">
        <div className="grades-header-left">
          <h1 className="grades-heading">Academic Performance</h1>
          <div className="term-selector">
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="term-select"
            >
              <option value="Spring 2024">Spring 2024</option>
              <option value="Fall 2023">Fall 2023</option>
              <option value="Summer 2023">Summer 2023</option>
            </select>
          </div>
        </div>

        <div className="grades-header-right">
          <div className="gpa-display">
            <div className="gpa-value">{performanceMetrics.currentGPA}</div>
            <div className="gpa-label">
              Current GPA
              <span
                className={`gpa-trend ${
                  performanceMetrics.trendDirection === "up"
                    ? "trend-up"
                    : "trend-down"
                }`}
              >
                {performanceMetrics.trendDirection === "up" ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                )}
                {performanceMetrics.trendPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="performance-metrics">
        <div className="grades-metric-card">
          <div className="metric-icon">
            <Award />
          </div>
          <div className="metric-content">
            <div className="metric-value">{stats.average}%</div>
            <div className="metric-label">Overall Average</div>
          </div>
        </div>

        <div className="grades-metric-card">
          <div className="metric-icon">
            <Target />
          </div>
          <div className="metric-content">
            <div className="metric-value">
              {performanceMetrics.totalCredits}
            </div>
            <div className="metric-label">Credits Completed</div>
          </div>
        </div>

        <div className="grades-metric-card">
          <div className="metric-icon">
            <CheckCircle />
          </div>
          <div className="metric-content">
            <div className="metric-value">
              {performanceMetrics.completedAssignments}
            </div>
            <div className="metric-label">Completed Assignments</div>
          </div>
        </div>

        <div className="grades-metric-card">
          <div className="metric-icon">
            <Clock />
          </div>
          <div className="metric-content">
            <div className="metric-value">
              {performanceMetrics.upcomingAssignments}
            </div>
            <div className="metric-label">Upcoming Assignments</div>
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="performance-charts">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Grade Trends</h3>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-color bg-blue-500"></span>
                Monthly Average
              </span>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={gradeHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[60, 100]}
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
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Course Performance Distribution</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={filteredCourses.map((course) => ({
                  name: course.code,
                  grade:
                    course.grades.reduce(
                      (sum, grade) => sum + grade.grade * grade.weight,
                      0
                    ) /
                    course.grades.reduce((sum, grade) => sum + grade.weight, 0),
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
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
                <Bar dataKey="grade" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Course Grades List */}
      <div className="grades-list-section">
        <div className="grades-list-header">
          <h3>Course Grades</h3>
          <div className="grades-filters">
            <button
              className={`grade-filter-btn ${
                gradeFilter === "all" ? "active" : ""
              }`}
              onClick={() => setGradeFilter("all")}
            >
              All
            </button>
            <button
              className={`grade-filter-btn ${
                gradeFilter === "high" ? "active" : ""
              }`}
              onClick={() => setGradeFilter("high")}
            >
              High Performing
            </button>
            <button
              className={`grade-filter-btn ${
                gradeFilter === "low" ? "active" : ""
              }`}
              onClick={() => setGradeFilter("low")}
            >
              Needs Improvement
            </button>
          </div>
        </div>

        <div className="grades-list">
          {filteredCourses.map((course) => {
            const courseAvg =
              course.grades.reduce(
                (sum, grade) => sum + grade.grade * grade.weight,
                0
              ) / course.grades.reduce((sum, grade) => sum + grade.weight, 0);

            return (
              <div
                key={course.id}
                className={`course-grade-card ${
                  selectedCourse === course.id ? "expanded" : ""
                }`}
                onClick={() => setSelectedCourse(course.id)}
              >
                <div className="course-grade-header">
                  <div className="course-info">
                    <span className="course-code">{course.code}</span>
                    <h4 className="course-title">{course.title}</h4>
                  </div>

                  <div className="grade-info">
                    <div className={`grade-value ${getGradeColor(courseAvg)}`}>
                      {courseAvg.toFixed(1)}%
                    </div>
                    <div className="grade-letter">
                      {getGradeLetter(courseAvg)}
                    </div>
                  </div>
                </div>

                {selectedCourse === course.id && (
                  <div className="course-grade-details">
                    <div className="grade-breakdown">
                      {course.grades.map((grade, index) => (
                        <div key={index} className="grade-item">
                          <div className="grade-item-info">
                            <span className="grade-item-title">
                              {grade.title}
                            </span>
                            <span className="grade-item-weight">
                              {grade.weight}%
                            </span>
                          </div>
                          <div
                            className={`grade-item-value ${getGradeColor(
                              grade.grade
                            )}`}
                          >
                            {grade.grade.toFixed(1)}%
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grade-chart">
                      <ResponsiveContainer width="100%" height={150}>
                        <BarChart
                          data={course.grades}
                          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="title"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                          />
                          <YAxis
                            domain={[0, 100]}
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
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
                            dataKey="grade"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GradesContent;
