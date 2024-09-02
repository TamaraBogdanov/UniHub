import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../Styles/Grades.css";

function GradesContent() {
  const [expandedCourse, setExpandedCourse] = useState(null);

  // Sample data - easier to put it hear for now, but we will have to use live data in the future using MongoDB
  const gradesData = [
    {
      id: 1,
      code: "CSC1015F",
      name: "Computer Science 1015",
      score: 75,
      credits: 18,
      year: 1,
      semester: 1,
      breakdown: { Practicals: 82, Tests: 70, Exam: 75 },
    },
    {
      id: 2,
      code: "MAM1000W",
      name: "Mathematics 1000",
      score: 68,
      credits: 36,
      year: 1,
      semester: "Full Year",
      breakdown: { Tutorials: 72, Tests: 65, Exam: 68 },
    },
    {
      id: 3,
      code: "PHY1004W",
      name: "Physics 1004",
      score: 72,
      credits: 36,
      year: 1,
      semester: "Full Year",
      breakdown: { Practicals: 80, Tests: 68, Exam: 71 },
    },
    {
      id: 4,
      code: "CSC1016S",
      name: "Computer Science 1016",
      score: 78,
      credits: 18,
      year: 1,
      semester: 2,
      breakdown: { Practicals: 85, Tests: 75, Exam: 77 },
    },
    {
      id: 5,
      code: "STA1000S",
      name: "Statistics 1000",
      score: 70,
      credits: 18,
      year: 1,
      semester: 2,
      breakdown: { Tutorials: 73, Tests: 68, Exam: 70 },
    },
  ];

  // Calculate weighted average
  const calculateWeightedAverage = () => {
    const totalWeightedScore = gradesData.reduce(
      (sum, course) => sum + course.score * course.credits,
      0
    );
    const totalCredits = gradesData.reduce(
      (sum, course) => sum + course.credits,
      0
    );
    return (totalWeightedScore / totalCredits).toFixed(2);
  };

  // Calculate trend data - nice feature to add and it shows the performance trend of the student over the year
  const weightedAverage = calculateWeightedAverage();

  // Sample trend data - we'll have to use live data here as well using MongoDB
  const trendData = [
    { semester: "Semester 1", average: 71.5 },
    { semester: "Semester 2", average: 74 },
    { semester: "Overall", average: parseFloat(weightedAverage) },
  ];

  // Get score class based on score
  const getScoreClass = (score) => {
    if (score >= 75) return "first";
    if (score >= 70) return "upper-second";
    if (score >= 60) return "lower-second";
    if (score >= 50) return "third";
    return "fail";
  };

  return (
    <div className="grades-content">
      <h2>My Academic Record</h2>

      <div className="overall-average">
        <h3>Weighted Average</h3>

        <div className="average-circle">
          {/* Change the color of the circle based on the score */}
          <span className="average-number">{weightedAverage}%</span>
          <span className="average-label">Overall</span>
        </div>
      </div>

      {/* Added the trend chart to which shows the performance trend as well */}
      <div className="average-trend">
        <h3>Performance Trend</h3>
        {/* Added responsive container */}
        <ResponsiveContainer width="100%" height={200}>
          {/* Added line chart */}
          <LineChart data={trendData}>
            {/* Added x and y axis */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="semester" />
            <YAxis domain={[0, 100]} />
            {/* Added tooltip which shows the score and semester */}
            <Tooltip />
            {/* Added legend which shows the average score for each semester */}
            <Legend />
            {/* Added line chart which also shows the average score */}
            <Line
              type="monotone"
              dataKey="average"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="courses-list">
        <h3>Course Results</h3>
        {/* A card for each course in the list with the course details */}
        {gradesData.map((course) => (
          <div key={course.id} className="course-card">
            <div
              className="course-header"
              style={{ cursor: "pointer" }}
              // Clicking the header will expand or collapse the course details
              onClick={() =>
                setExpandedCourse(
                  expandedCourse === course.id ? null : course.id
                )
              }
            >
              {/* Added icons for course code and score */}
              <div className="course-title">
                <h4>
                  {/* Course code and name - we'll use live data next time */}
                  {course.code}: {course.name}
                </h4>
                <p>
                  {/* Course details - we'll use live data next time */}
                  Credits: {course.credits} | Year {course.year} |{" "}
                  {typeof course.semester === "number"
                    ? `Semester ${course.semester}`
                    : course.semester}
                </p>
              </div>

              <div className="course-score">
                {/* Course score - we'll use live data next time */}
                <span className={`score ${getScoreClass(course.score)}`}>
                  {course.score}%
                </span>
              </div>
              {/* Expanded or collapsed icon */}
              {expandedCourse === course.id ? (
                <ChevronUp size={24} />
              ) : (
                <ChevronDown size={24} />
              )}
            </div>

            {/* Expanded course details */}
            {expandedCourse === course.id && (
              <div className="course-details">
                <h5>Score Breakdown</h5>
                <div className="score-breakdown">
                  {Object.entries(course.breakdown).map(([category, score]) => (
                    <div key={category} className="breakdown-item">
                      <span>{category}</span>
                      <div className="progressGrades-bar">
                        <div
                          className="progress"
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                      <span>{score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GradesContent;
