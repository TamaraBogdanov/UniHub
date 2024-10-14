import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Classes.css";
import { courses } from "../Pages/mockData";
import {
  Home,
  BookOpen,
  Calculator,
  Globe,
  Brain,
  Beaker,
  DollarSign,
} from "lucide-react";

function ClassesContent() {
  const [filter, setFilter] = useState("All");
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

  const filteredCourses =
    filter === "All"
      ? courses
      : courses.filter((course) => course.department === filter);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <>
      <h2 className="classes-heading">My Courses</h2>
      <section className="courses">
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => handleCourseClick(course.id)}
            >
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
    </>
  );
}

export default ClassesContent;
