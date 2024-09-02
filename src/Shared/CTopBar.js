import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logouni.png";
import "../Shared/Styling/CTopBar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Allow the Topbar component to display the current date, manage dropdown visibility, and change login based on user role.
function Topbar({ currentPage, userRole }) {
  const [date, setDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

    updateDate(); // Set the initial date
    const timer = setInterval(updateDate, 1000); // Update the date every second
    return () => clearInterval(timer);
  }, []);

  //The toggleDropdown function toggles the state of dropdownOpen between true and false each time it is called
  // Toggle the state of dropdownOpen between true and false
  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  function handleLogout() {
    // Navigate to the login page
    navigate("/login");
  }

  return (
    <nav className="topbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="topbar-content">
        <span className="topbar-page">{currentPage}</span>
        <span className="topbar-date">{date}</span>
      </div>
      {/* Icons and Profile Container */}
      <div className="icons">
        <i className="fas fa-envelope"></i> {/* Email icon */}
        <i className="fas fa-bell"></i> {/* Notification icon */}
        <div className="profile-container">
          <i className="fas fa-user-circle"></i> {/* Profile icon */}
          <span className="user-role">
            {/* User role (student or admin) display "Admin" if userRole is "admin", and "Student" if it is not */}
            {userRole === "admin" ? "Admin" : "Student"}
          </span>
          <i
            className="fas fa-caret-down dropdown-icon"
            onClick={toggleDropdown}
            aria-hidden="true"
          ></i>
          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
