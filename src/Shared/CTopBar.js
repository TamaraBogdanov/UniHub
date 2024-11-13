import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logouni.png";
import "../Shared/Styling/CTopBar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MessageSquare, Bell } from "lucide-react";

function Topbar({ currentPage, userRole, topbarColor }) {
  const [date, setDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count
  const navigate = useNavigate();

  useEffect(() => {
    function updateDate() {
      const now = new Date();
      const optionsDay = { weekday: "long" };
      const optionsDate = { day: "numeric", month: "long", year: "numeric" };

      const day = now.toLocaleDateString("en-GB", optionsDay);
      const rest = now.toLocaleDateString("en-GB", optionsDate);

      const formattedDate = `${day}, ${rest}`;
      setDate(formattedDate);
    }

    updateDate();
    const timer = setInterval(updateDate, 60000); // Update every minute instead of every second
    return () => clearInterval(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownOpen && !event.target.closest(".profile-container")) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="topbar">
      <div className="logo">
        <img src={logo} alt="University Logo" />
      </div>

      <div className="topbar-content">
        <span className="topbar-page">{currentPage}</span>
        <span className="topbar-date">{date}</span>
      </div>

      <div className="icons">
        <button
          className="nav-icon-button"
          onClick={() => navigate("/messages")}
        >
          <MessageSquare size={25} color="white" />
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </button>

        <button className="nav-icon-button">
          <Bell size={25} color="white" />
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </button>

        <div
          className="profile-container"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <i className="fas fa-user-circle"></i>
          <span className="user-role">
            {userRole === "admin" ? "Administrator" : "Student"}
          </span>
          <i className={`fas fa-chevron-${dropdownOpen ? "up" : "down"}`}></i>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/profile")}>
                <i className="fas fa-user"></i>
                Profile
              </button>
              <button onClick={() => navigate("/settings")}>
                <i className="fas fa-cog"></i>
                Settings
              </button>
              <button onClick={handleLogout} className="logout-button">
                <i className="fas fa-sign-out-alt"></i>
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
