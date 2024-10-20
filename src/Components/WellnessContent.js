import React, { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  Users,
  Heart,
  Brain,
  Utensils,
  Activity,
  Book,
  PhoneCall,
  X,
} from "lucide-react";
import "../Styles/Wellness.css";

// Mock data for wellness resources and events
const wellnessResources = [
  {
    id: 1,
    title: "Meditation Guide",
    category: "Mental Health",
    icon: <Brain size={24} />,
  },
  {
    id: 2,
    title: "Healthy Recipes",
    category: "Nutrition",
    icon: <Utensils size={24} />,
  },
  {
    id: 3,
    title: "Workout Routines",
    category: "Fitness",
    icon: <Activity size={24} />,
  },
  {
    id: 4,
    title: "Sleep Improvement Tips",
    category: "Mental Health",
    icon: <Brain size={24} />,
  },
  {
    id: 5,
    title: "Stress Management Techniques",
    category: "Mental Health",
    icon: <Brain size={24} />,
  },
  {
    id: 6,
    title: "Mindfulness Exercises",
    category: "Mental Health",
    icon: <Brain size={24} />,
  },
];

const wellnessEvents = [
  {
    id: 1,
    title: "Yoga Session",
    date: "2024-05-15",
    time: "10:00 AM",
    location: "Student Center",
    attendees: 20,
  },
  {
    id: 2,
    title: "Nutrition Workshop",
    date: "2024-05-20",
    time: "2:00 PM",
    location: "Health Center",
    attendees: 15,
  },
  {
    id: 3,
    title: "Mental Health Awareness Talk",
    date: "2024-05-25",
    time: "3:30 PM",
    location: "Auditorium",
    attendees: 50,
  },
];

function WellnessContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const filteredResources = wellnessResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || resource.category === selectedCategory)
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const categories = ["All", "Mental Health", "Nutrition", "Fitness"];

  return (
    <div className="wellness-content">
      <section className="wellness-hero">
        <div className="wellness-hero-text">
          <h1>Your Wellness Journey Starts Here</h1>
          <p>
            Discover resources, events, and support for your mental and physical
            well-being.
          </p>
          <button
            className="wellness-primary-button"
            onClick={() => setShowAppointmentModal(true)}
          >
            Book an Appointment
          </button>
        </div>
        <div className="wellness-hero-image">
          <img src="/images/healthcare.png" alt="Wellness" />
        </div>
      </section>

      <section className="wellness-resources">
        <h2>Wellness Resources</h2>
        <div className="wellness-resources-controls">
          <div className="wellness-search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="wellness-category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`wellness-category-button ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="wellness-resources-grid">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="wellness-resource-card">
              {resource.icon}
              <h3>{resource.title}</h3>
              <p>{resource.category}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wellness-events">
        <h2>Upcoming Wellness Events</h2>
        <div className="wellness-events-grid">
          {wellnessEvents.map((event) => (
            <div key={event.id} className="wellness-event-card">
              <h3>{event.title}</h3>
              <div className="wellness-event-details">
                <div>
                  <Calendar size={16} /> {event.date}
                </div>
                <div>
                  <Clock size={16} /> {event.time}
                </div>
                <div>
                  <Users size={16} /> {event.attendees} attendees
                </div>
              </div>
              <button className="wellness-secondary-button">Learn More</button>
            </div>
          ))}
        </div>
      </section>

      <section className="wellness-support">
        <h2>Need Support?</h2>
        <div className="support-options">
          <div className="support-card">
            <PhoneCall size={24} />
            <h3>24/7 Helpline</h3>
            <p>Call us anytime for immediate support</p>
            <a href="tel:1234567890" className="wellness-primary-button">
              Call Now
            </a>
          </div>
          <div className="support-card">
            <Book size={24} />
            <h3>Online Resources</h3>
            <p>Access our library of self-help materials</p>
            <button className="wellness-secondary-button">
              Browse Resources
            </button>
          </div>
          <div className="support-card">
            <Users size={24} />
            <h3>Support Groups</h3>
            <p>Join a group for shared experiences and support</p>
            <button className="wellness-secondary-button">Find a Group</button>
          </div>
        </div>
      </section>

      {showAppointmentModal && (
        <AppointmentModal onClose={() => setShowAppointmentModal(false)} />
      )}
    </div>
  );
}

function AppointmentModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          <X size={24} />
        </button>
        <h2>Book an Appointment</h2>
        <form className="appointment-form">
          <div className="form-group">
            <label htmlFor="appointmentType">Appointment Type</label>
            <select id="appointmentType">
              <option value="">Select an appointment type</option>
              <option value="counseling">Counseling</option>
              <option value="nutrition">Nutrition Consultation</option>
              <option value="fitness">Fitness Assessment</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="appointmentDate">Preferred Date</label>
            <input type="date" id="appointmentDate" />
          </div>
          <div className="form-group">
            <label htmlFor="appointmentTime">Preferred Time</label>
            <input type="time" id="appointmentTime" />
          </div>
          <div className="form-group">
            <label htmlFor="additionalNotes">Additional Notes</label>
            <textarea id="additionalNotes" rows="3"></textarea>
          </div>
          <button type="submit" className="primary-button">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default WellnessContent;
