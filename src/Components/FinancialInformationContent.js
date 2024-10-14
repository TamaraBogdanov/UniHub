import React from "react";
import {
  BookOpen,
  DollarSign,
  User,
  Calendar,
  FileText,
  Bell,
} from "lucide-react";

function FinancialInformationContent() {
  const quickLinks = [
    { icon: <BookOpen size={20} />, title: "View Grades", link: "#" },
    { icon: <DollarSign size={20} />, title: "Pay Tuition", link: "#" },
    { icon: <User size={20} />, title: "Update Profile", link: "#" },
    { icon: <Calendar size={20} />, title: "Class Schedule", link: "#" },
    { icon: <FileText size={20} />, title: "Transcript Request", link: "#" },
    { icon: <Bell size={20} />, title: "Notifications", link: "#" },
  ];

  return (
    <>
      <section className="student-hero">
        <div className="student-hero-text">
          <h1>Welcome to your Self-Service</h1>
          <h2>Manage your academic journey with ease</h2>
          <div className="student-hero-buttons">
            <button className="student-primary-button">Check dealines</button>
            <button className="student-secondary-button">
              View To-Do List
            </button>
          </div>
        </div>
        <div className="student-hero-image">
          <img src="./images/online-learning.png" alt="Student-Hero" />
        </div>
      </section>

      <section className="quick-links-section">
        <h2>Quick Links</h2>
        <div className="quick-links-grid">
          {quickLinks.map((link, index) => (
            <a key={index} href={link.link} className="quick-link-card">
              <div className="quick-link-icon">{link.icon}</div>
              <h3>{link.title}</h3>
            </a>
          ))}
        </div>
      </section>

      <section className="announcements-section">
        <h2>Important Announcements</h2>
        <div className="announcements-list">
          <div className="announcement-card">
            <h3>Registration for Fall 2024 Now Open</h3>
            <p>
              Registration for the Fall 2024 semester is now open. Please check
              your appointment time and register for classes.
            </p>
          </div>
          <div className="announcement-card">
            <h3>Financial Aid Deadline Approaching</h3>
            <p>
              The deadline for submitting financial aid applications for the
              upcoming academic year is June 30, 2024.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default FinancialInformationContent;
