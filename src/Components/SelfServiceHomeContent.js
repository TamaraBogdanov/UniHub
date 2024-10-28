import React from "react";
import {
  BookOpen,
  DollarSign,
  User,
  Calendar,
  FileText,
  Bell,
  GraduationCap,
  ClipboardList,
  Settings,
  HelpCircle,
} from "lucide-react";

function SelfServiceHomeContent() {
  const quickLinks = [
    {
      icon: <BookOpen size={20} />,
      title: "Academic Records",
      description: "Access grades, transcripts, and academic progress",
    },
    {
      icon: <DollarSign size={20} />,
      title: "Financial Services",
      description: "View fees, make payments, and check financial aid",
    },
    {
      icon: <Calendar size={20} />,
      title: "Registration",
      description: "Register for classes, view schedules, and manage courses",
    },
    {
      icon: <User size={20} />,
      title: "Personal Info",
      description: "Update your profile and contact information",
    },
    {
      icon: <FileText size={20} />,
      title: "Forms & Requests",
      description: "Submit and track various academic requests",
    },
    {
      icon: <HelpCircle size={20} />,
      title: "Help & Support",
      description: "Get assistance and find answers to common questions",
    },
  ];

  const featuredServices = [
    {
      title: "Course Registration",
      description:
        "Registration for Fall 2024 is now open. Complete your registration early to secure your preferred classes.",
      deadline: "Closes: July 15, 2024",
      action: "Register Now",
    },
    {
      title: "Financial Aid",
      description:
        "Submit your financial aid application for the upcoming academic year. Early submission is recommended.",
      deadline: "Deadline: June 30, 2024",
      action: "Apply Now",
    },
    {
      title: "Transcript Request",
      description:
        "Request an official transcript of your academic record. Complete the transcript request form.",
      deadline: "Until: June 30, 2024",
      action: "Request Now",
    },
  ];

  return (
    <>
      <section className="student-hero">
        <div className="student-hero-text">
          <h1>Welcome to your Self-Service Portal</h1>
          <h2>Your one-stop hub for managing your academic journey</h2>
          <p className="hero-description">
            Access all aspects of your student life - from course registration
            to financial services.
          </p>
          <div className="student-hero-buttons">
            <button className="student-primary-button">Take a Tour</button>
            <button className="student-secondary-button">
              View Getting Started Guide
            </button>
          </div>
        </div>
        <div className="student-hero-image">
          <img
            src="./images/online-learning.png"
            alt="Student Services Illustration"
          />
        </div>
      </section>

      <section className="quick-links-section">
        <h2>What You Can Do Here</h2>
        <p className="section-description">
          Explore the various services available to help you manage your
          academic journey efficiently.
        </p>
        <div className="quick-links-grid">
          {quickLinks.map((link, index) => (
            <a key={index} href={link.link} className="quick-link-card">
              <div className="quick-link-icon">{link.icon}</div>
              <h3>{link.title}</h3>
              <p>{link.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="announcements-section">
        <h2>Featured Services</h2>
        <p className="section-description">
          Important services and deadlines that require your attention.
        </p>
        <div className="announcements-list">
          {featuredServices.map((service, index) => (
            <div key={index} className="announcement-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="announcement-footer">
                <span className="deadline">{service.deadline}</span>
                <button className="primary-button">{service.action}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="announcements-section">
        <h2>Need Help Getting Started?</h2>
        <p className="section-description">
          Below are some quick links to help you get started.
        </p>
        <div className="help-cards">
          <div className="help-card">
            <GraduationCap size={24} />
            <h3>New Student Guide</h3>
            <p>Check out our comprehensive guide for new students.</p>
            <button className="help-button">View Guide</button>
          </div>
          <div className="help-card">
            <ClipboardList size={24} />
            <h3>Quick Start Checklist</h3>
            <p>
              Follow our step-by-step checklist to make the most of your
              Self-Service portal.
            </p>
            <button className="help-button">View Checklist</button>
          </div>
          <div className="help-card">
            <HelpCircle size={24} />
            <h3>Support Center</h3>
            <p>
              Need assistance? Our support team is here to help you with any
              questions.
            </p>
            <button className="help-button">Get Help</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-description {
          color: #666;
          margin: 1rem 0;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .section-description {
          color: #666;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .quick-link-card {
          padding: 1.5rem;
        }

        .quick-link-card p {
          color: #666;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        .announcement-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }

        .deadline {
          color: #666;
          font-size: 0.9rem;
        }

        .action-button {
          background-color: #1b065e;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }

        .help-section {
          margin-top: 2rem;
        }

        .help-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .help-card {
          background-color: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .help-card h3 {
          margin: 1rem 0;
        }

        .help-card p {
          color: #666;
          margin-bottom: 1rem;
        }

        .help-button {
          background: none;
          color: #3b82f6;
          padding: 0.5rem 1rem;
          border-style: solid;
          border-color: #3b82f6;
          border-radius: 8px;
          transition: background-color 0.3s, color 0.3s, transform 0.3s;
        }

        .help-button:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}

export default SelfServiceHomeContent;
