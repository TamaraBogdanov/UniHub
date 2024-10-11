import React, { useState } from "react";
import {
  Calendar,
  Newspaper,
  Users,
  Heart,
  MessageCircle,
  BookOpen,
  Zap,
  Coffee,
  Trophy,
  Globe,
} from "lucide-react";
import "../Styles/Home2.css";
import { enhancedMockNewsData, newsCategories } from "../detailedMockData";
// import { eventsMockData, eventCategories } from "../eventsMockData";

function HomeContent() {
  const [filter, setFilter] = useState("All");

  const allCategories = [
    { name: "All", icon: <Newspaper size={20} /> },
    ...newsCategories.filter((cat) => cat.name !== "All"),
  ];

  const combinedUpdates = [
    ...enhancedMockNewsData.map((news) => ({ ...news, type: "news" })),
    // ...eventsMockData.map((event) => ({ ...event, type: "event" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredUpdates = combinedUpdates.filter(
    (update) => filter === "All" || update.category === filter
  );

  return (
    <div className="home-content">
      <section className="student-hero">
        <div className="student-hero-text">
          <h1>Welcome to Student Hub!</h1>
          <h2>Get to explore your student experience</h2>
          <div className="student-hero-buttons">
            <button className="student-primary-button">
              Update Preferences
            </button>
            <button className="student-secondary-button">
              View Hub Profile
            </button>
          </div>
        </div>
        <div className="student-hero-image">
          <img src="./images/online-learning.png" alt="Student-Hero" />
        </div>
      </section>

      <section className="updates-section">
        <h2>Latest Updates</h2>
        <div className="filter-system">
          {allCategories.map(({ name, icon }) => (
            <button
              key={name}
              className={`filter-button ${filter === name ? "active" : ""}`}
              onClick={() => setFilter(name)}
            >
              {icon} {name}
            </button>
          ))}
        </div>
        <div className="updates-grid">
          {filteredUpdates.map((update, index) => (
            <div key={index} className={`update-card ${update.type}`}>
              <div className="update-icon">{update.icon}</div>
              <div className="update-content">
                <h3>{update.title}</h3>
                <p className="update-category">{update.category}</p>
                <p className="update-date">{update.date}</p>
                <p className="update-description">
                  {update.description
                    ? update.description.substring(0, 100)
                    : update.content.substring(0, 100)}
                  ...
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomeContent;
