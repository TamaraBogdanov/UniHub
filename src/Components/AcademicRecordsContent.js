import React, { useState } from "react";
import {
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { studentData } from "../Mockdata/studentData";
import "../Styles/AcademicRecords.css";

function AcademicRecordsContent() {
  const [activeTab, setActiveTab] = useState("overview");
  const student = studentData;

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab student={student} />;
      case "modules":
        return <ModulesTab modules={student.modules} />;
      case "transcript":
        return <TranscriptTab transcript={student.transcript} />;
      case "progress":
        return <ProgressTab progress={student.degreeProgress} />;
      default:
        return <OverviewTab student={student} />;
    }
  };

  return (
    <div className="academic-records-content">
      <h1>Academic Records</h1>
      <div className="student-info">
        <img
          src={student.personalInfo.profilePic}
          alt={student.personalInfo.name}
          className="profile-pic"
        />
        <div>
          <h2>{student.personalInfo.name}</h2>
          <p>Student Number: {student.personalInfo.studentNumber}</p>
          <p>Programme: {student.academicInfo.programme}</p>
        </div>
      </div>
      <div className="forms-tabs">
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <BookOpen size={20} />
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === "modules" ? "active" : ""}`}
          onClick={() => setActiveTab("modules")}
        >
          <Calendar size={20} />
          Modules
        </button>
        <button
          className={`tab-button ${activeTab === "transcript" ? "active" : ""}`}
          onClick={() => setActiveTab("transcript")}
        >
          <Award size={20} />
          Transcript
        </button>
        <button
          className={`tab-button ${activeTab === "progress" ? "active" : ""}`}
          onClick={() => setActiveTab("progress")}
        >
          <TrendingUp size={20} />
          Degree Progress
        </button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}

function OverviewTab({ student }) {
  const { academicInfo, personalInfo } = student;

  return (
    <div className="overview-tab">
      <div className="quick-stats">
        <div className="stat-card">
          <h3>Current GPA</h3>
          <p className="stat-value">{academicInfo.gpa}</p>
        </div>
        <div className="stat-card">
          <h3>Credits Earned</h3>
          <p className="stat-value">{academicInfo.creditsEarned}</p>
        </div>
        <div className="stat-card">
          <h3>Year of Study</h3>
          <p className="stat-value">{academicInfo.yearOfStudy}</p>
        </div>
      </div>
      <div className="recent-achievements">
        <h3>Recent Achievements</h3>
        <ul>
          {academicInfo.recentAchievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>
      <div className="upcoming-deadlines">
        <h3>Upcoming Deadlines</h3>
        <ul>
          {academicInfo.upcomingDeadlines.map((deadline, index) => (
            <li key={index}>
              <strong>{deadline.date}:</strong> {deadline.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ModulesTab({ modules }) {
  const [expandedModule, setExpandedModule] = useState(null);

  const toggleModule = (moduleCode) => {
    setExpandedModule(expandedModule === moduleCode ? null : moduleCode);
  };

  return (
    <div className="modules-tab">
      <h3>Current Modules</h3>
      {modules.map((module) => (
        <div key={module.code} className="module-card">
          <div
            className="module-header"
            onClick={() => toggleModule(module.code)}
          >
            <h4>
              {module.code}: {module.name}
            </h4>
            {expandedModule === module.code ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>
          {expandedModule === module.code && (
            <div className="module-details">
              <p>
                <strong>Lecturer:</strong> {module.lecturer}
              </p>
              <p>
                <strong>Credits:</strong> {module.credits}
              </p>
              <p>
                <strong>Description:</strong> {module.description}
              </p>
              <h5>Assessments:</h5>
              <ul>
                {module.assessments.map((assessment, index) => (
                  <li key={index}>
                    {assessment.name}: {assessment.weight}%
                    {assessment.grade && ` - Grade: ${assessment.grade}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TranscriptTab({ transcript }) {
  return (
    <div className="transcript-tab">
      <div className="transcript-header">
        <h3>Academic Transcript</h3>
        <button className="academic-download-button">
          <Download size={20} />
          Download Official Transcript
        </button>
      </div>
      <table className="transcript-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Semester</th>
            <th>Module Code</th>
            <th>Module Name</th>
            <th>Credits</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {transcript.map((entry, index) => (
            <tr key={index}>
              <td>{entry.year}</td>
              <td>{entry.semester}</td>
              <td>{entry.moduleCode}</td>
              <td>{entry.moduleName}</td>
              <td>{entry.credits}</td>
              <td>{entry.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProgressTab({ progress }) {
  return (
    <div className="progress-tab">
      <h3>Degree Progress</h3>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress.overall}%` }}>
          {progress.overall}%
        </div>
      </div>
      <div className="progress-details">
        <div className="progress-card">
          <h4>Core Modules</h4>
          <p>
            {progress.coreModules.completed} / {progress.coreModules.total}{" "}
            completed
          </p>
          <div className="mini-progress-bar">
            <div
              className="progress"
              style={{
                width: `${
                  (progress.coreModules.completed /
                    progress.coreModules.total) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
        <div className="progress-card">
          <h4>Elective Modules</h4>
          <p>
            {progress.electiveModules.completed} /{" "}
            {progress.electiveModules.total} completed
          </p>
          <div className="mini-progress-bar">
            <div
              className="progress"
              style={{
                width: `${
                  (progress.electiveModules.completed /
                    progress.electiveModules.total) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
        <div className="progress-card">
          <h4>Total Credits</h4>
          <p>
            {progress.credits.earned} / {progress.credits.required} credits
          </p>
          <div className="mini-progress-bar">
            <div
              className="progress"
              style={{
                width: `${
                  (progress.credits.earned / progress.credits.required) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicRecordsContent;
