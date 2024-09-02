import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import "../Styles/Classes.css";

function ClassesContent() {
  const [expandedClass, setExpandedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const classesData = [
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Computer Science",
      instructor: "Dr. John Doe",
      schedule: "Mon, Wed 10:00 AM - 11:30 AM",
      room: "Tech Building 101",
      credits: 3,
    },
    {
      id: 2,
      code: "MATH201",
      name: "Calculus I",
      instructor: "Prof. Jane Smith",
      schedule: "Tue, Thu 1:00 PM - 2:30 PM",
      room: "Science Hall 305",
      credits: 4,
    },
    {
      id: 3,
      code: "HIST150",
      name: "World History",
      instructor: "Dr. Bob Johnson",
      schedule: "Mon, Wed, Fri 9:00 AM - 10:00 AM",
      room: "Humanities 210",
      credits: 3,
    },
    {
      id: 4,
      code: "PSYCH101",
      name: "Introduction to Psychology",
      instructor: "Dr. Alice Williams",
      schedule: "Tue, Thu 3:00 PM - 4:30 PM",
      room: "Social Sciences 102",
      credits: 3,
    },
    {
      id: 5,
      code: "CHEM202",
      name: "Organic Chemistry",
      instructor: "Prof. Charlie Brown",
      schedule: "Mon, Wed, Fri 11:00 AM - 12:00 PM",
      room: "Science Hall 405",
      credits: 4,
    },
  ];

  const filteredClasses = classesData.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="classes-content">
      <h2>My Classes</h2>
      <div className="search-bar">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search for a class..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="classes-list">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="class-card">
            <div
              className="class-header"
              onClick={() =>
                setExpandedClass(expandedClass === cls.id ? null : cls.id)
              }
            >
              <div className="class-title">
                <h3>
                  {cls.code}: {cls.name}
                </h3>
                <p>{cls.instructor}</p>
              </div>
              {expandedClass === cls.id ? (
                <ChevronUp size={24} />
              ) : (
                <ChevronDown size={24} />
              )}
            </div>
            {expandedClass === cls.id && (
              <div className="class-details">
                <p>
                  <strong>Schedule:</strong> {cls.schedule}
                </p>
                <p>
                  <strong>Room:</strong> {cls.room}
                </p>
                <p>
                  <strong>Credits:</strong> {cls.credits}
                </p>
                <div className="class-actions">
                  <button className="btn-primary">View Syllabus</button>
                  <button className="btn-secondary">Contact Instructor</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassesContent;
