import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  CreditCard,
  Calendar,
  Video,
  Heart,
  MessageCircle,
  Newspaper,
  BookOpen,
  Zap,
  Coffee,
  Trophy,
  Globe,
} from "lucide-react";
import Topbar from "../Shared/CTopBar";
// import "../Styles/Home.css";
import "../Styles/Home2.css";
import HomeContent from "../Components/HomeContent";
import NewsContent from "../Components/NewsContent";
import ClubsContent from "../Components/ClubsContent";
import EventsContent from "../Components/EventsContent";
import WellnessContent from "../Components/WellnessContent";
import CommunityContent from "../Components/CommunityContent";
import VolunteeringContent from "../Components/VolunteeringContent";
import TransportationContent from "../Components/TransportationContent";

function StudentHubPage({ userRole }) {
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <HomeContent />;
      case "news":
        return <NewsContent />;
      case "clubs":
        return <ClubsContent />;
      case "events":
        return <EventsContent />;
      case "wellness":
        return <WellnessContent />;
      case "community":
        return <CommunityContent />;
      case "volunteering":
        return <VolunteeringContent />;
      case "transportation":
        return <TransportationContent />;
      default:
        return <HomeContent />;
    }
  };

  const handleNavigation = (page) => {
    if (page === "self-service") {
      navigate("/self-service");
    } else if (page === "home") {
      navigate("/home");
    } else {
      setActiveSection(page);
    }
  };

  return (
    <div className="HomePage">
      <Topbar currentPage={activeSection} userRole={userRole} />

      <div className="dashboard">
        <nav className="sidebar">
          <div className="sidebar-content topnav">
            <button
              className="nav-button"
              onClick={() => handleNavigation("self-service")}
            >
              <Home size={25} />
              <h3>Self-Service</h3>
            </button>
            <button
              className="nav-button"
              onClick={() => handleNavigation("home")}
            >
              <Users size={25} />
              <h3>Student-Dash</h3>
            </button>
          </div>

          <div className="sidebar-content midnav">
            <button
              className={`nav-button ${
                activeSection === "home" ? "active" : ""
              }`}
              onClick={() => setActiveSection("home")}
            >
              <Home size={25} />
              <h3>Home</h3>
            </button>
            <button
              className={`nav-button ${
                activeSection === "news" ? "active" : ""
              }`}
              onClick={() => setActiveSection("news")}
            >
              <Newspaper size={25} />
              <h3>News</h3>
            </button>
            <button
              className={`nav-button ${
                activeSection === "clubs" ? "active" : ""
              }`}
              onClick={() => setActiveSection("clubs")}
            >
              <Users size={25} />
              <h3>Clubs</h3>
            </button>
            <button
              className={`nav-button ${
                activeSection === "events" ? "active" : ""
              }`}
              onClick={() => setActiveSection("events")}
            >
              <Calendar size={25} />
              <h3>Events</h3>
            </button>
            <button
              className={`nav-button ${
                activeSection === "wellness" ? "active" : ""
              }`}
              onClick={() => setActiveSection("wellness")}
            >
              <Heart size={25} />
              <h3>Wellness</h3>
            </button>
            <button
              className={`nav-button ${
                activeSection === "community" ? "active" : ""
              }`}
              onClick={() => setActiveSection("community")}
            >
              <MessageCircle size={25} />
              <h3>Community</h3>
            </button>
            <button
              className={`nav-button ${
                activeSection === "volunteering" ? "active" : ""
              }`}
              onClick={() => setActiveSection("volunteering")}
            >
              <Heart size={25} />
              <h3>Volunteering</h3>
            </button>
            <button
              className={`nav-button ${
                activeSection === "transportation" ? "active" : ""
              }`}
              onClick={() => setActiveSection("transportation")}
            >
              <CreditCard size={25} />
              <h3>Transportation</h3>
            </button>
          </div>
        </nav>

        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
}

export default StudentHubPage;
