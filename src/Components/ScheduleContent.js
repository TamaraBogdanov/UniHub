import React, { useState, useMemo } from "react";
import "../Styles/Schedule.css";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  AlertCircle,
  Users,
  BarChart,
  FileText,
  MapPin,
  Monitor,
  Plus,
  X,
  Bell,
  Trash2,
  Edit2,
} from "lucide-react";

// Mock data for schedule events
const mockEvents = [
  {
    id: 1,
    type: "class",
    courseCode: "CS101",
    title: "Introduction to Computer Science",
    startTime: "09:00",
    endTime: "10:30",
    days: ["Monday", "Wednesday"],
    location: "Room 101",
    instructor: "Dr. John Doe",
    isOnline: false,
    description:
      "Introduction to programming concepts and computational thinking",
    materials: ["Textbook Ch. 3", "Lecture Slides"],
    upcoming: "Quiz on Arrays and Loops",
  },
  {
    id: 2,
    type: "assignment",
    courseCode: "MATH201",
    title: "Calculus Problem Set 3",
    dueDate: "2024-03-15",
    dueTime: "23:59",
    status: "pending",
    priority: "high",
    isOnline: false,
    description: "Solve problems from chapter 3 of the textbook",
    materials: ["Textbook Ch. 3", "Lecture Slides"],
    upcoming: "Final Exam",
  },
  {
    id: 3,
    type: "meeting",
    title: "Study Group Session",
    courseCode: "HIST105",
    startTime: "14:00",
    endTime: "15:30",
    day: "Tuesday",
    location: "Library Room 204",
    participants: 5,
    isOnline: false,
    description: "Discuss topics from the textbook",
    materials: ["Textbook Ch. 3", "Lecture Slides"],
    upcoming: "Final Exam",
  },
  {
    id: 4,
    type: "exam",
    courseCode: "PSYC101",
    title: "Midterm Examination",
    date: "2024-03-20",
    startTime: "13:00",
    endTime: "15:00",
    location: "Main Hall",
    priority: "high",
    isOnline: false,
    description: "Take the midterm examination",
    materials: ["Textbook Ch. 3", "Lecture Slides"],
    upcoming: "Final Exam",
  },
  {
    id: 5,
    type: "class",
    courseCode: "CHEM301",
    title: "Organic Chemistry",
    startTime: "11:00",
    endTime: "12:30",
    days: ["Tuesday", "Thursday"],
    location: "Lab 302",
    instructor: "Prof. Charlie Brown",
    isOnline: false,
    description:
      "A study of the structure, properties, composition, reactions, and synthesis of organic compounds.",
    materials: ["Textbook Ch. 3", "Lecture Slides"],
    upcoming: "Final Exam",
  },
  {
    id: 6,
    type: "meeting",
    title: "Virtual Office Hours",
    courseCode: "ECON201",
    startTime: "15:00",
    endTime: "16:00",
    day: "Wednesday",
    isOnline: true,
    meetingLink: "https://zoom.us/j/123456789",
    description: "Discuss topics from the textbook",
    materials: ["Textbook Ch. 3", "Lecture Slides"],
    upcoming: "Final Exam",
  },
];

// Helper function to get dates for the current week
const getWeekDates = (date) => {
  const curr = new Date(date);
  const week = [];

  // Starting from Monday
  curr.setDate(curr.getDate() - curr.getDay() + 1);

  for (let i = 0; i < 7; i++) {
    week.push(new Date(curr));
    curr.setDate(curr.getDate() + 1);
  }

  return week;
};

// Helper function to format time
const formatTime = (time) => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

// New component for event details modal
const EventDetailsModal = ({ event, onClose, onEdit, onDelete }) => {
  if (!event) return null;

  const formatEventTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="schedule-modal-overlay" onClick={onClose}>
      <div
        className="schedule-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="schedule-modal-header">
          <div className={`schedule-modal-type ${event.type}`}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </div>
          <button className="schedule-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="schedule-modal-body">
          <h2 className="schedule-modal-title">{event.title}</h2>
          <div className="schedule-modal-course">{event.courseCode}</div>

          <div className="schedule-modal-details">
            {event.startTime && (
              <div className="schedule-detail-item">
                <Clock size={16} />
                <span>
                  {formatEventTime(event.startTime)} -{" "}
                  {formatEventTime(event.endTime)}
                </span>
              </div>
            )}

            {event.location && (
              <div className="schedule-detail-item">
                {event.isOnline ? <Monitor size={16} /> : <MapPin size={16} />}
                <span>{event.location}</span>
              </div>
            )}

            {event.instructor && (
              <div className="schedule-detail-item">
                <Users size={16} />
                <span>{event.instructor}</span>
              </div>
            )}
          </div>

          {event.description && (
            <div className="schedule-modal-section">
              <h3>Description</h3>
              <p>{event.description}</p>
            </div>
          )}

          {event.materials && event.materials.length > 0 && (
            <div className="schedule-modal-section">
              <h3>Materials</h3>
              <ul className="schedule-materials-list">
                {event.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>
          )}

          {event.upcoming && (
            <div className="schedule-modal-section">
              <h3>Upcoming</h3>
              <div className="schedule-upcoming-alert">
                <Bell size={16} />
                <span>{event.upcoming}</span>
              </div>
            </div>
          )}
        </div>

        <div className="schedule-modal-actions">
          <button
            className="schedule-action-button delete"
            onClick={() => onDelete(event.id)}
          >
            <Trash2 size={16} />
            Delete
          </button>
          <button
            className="schedule-action-button edit"
            onClick={() => onEdit(event)}
          >
            <Edit2 size={16} />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

// New component for event creation/editing
const EventForm = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    event || {
      type: "class",
      title: "",
      courseCode: "",
      startTime: "",
      endTime: "",
      location: "",
      description: "",
      isOnline: false,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="schedule-modal-overlay">
      <div className="schedule-modal-content">
        <div className="schedule-modal-header">
          <h2>{event ? "Edit Event" : "Create Event"}</h2>
          <button className="schedule-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="schedule-event-form">
          <div className="schedule-form-group">
            <label>Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="class">Class</option>
              <option value="assignment">Assignment</option>
              <option value="meeting">Meeting</option>
              <option value="exam">Exam</option>
            </select>
          </div>

          <div className="schedule-form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="schedule-form-group">
            <label>Course Code</label>
            <input
              type="text"
              value={formData.courseCode}
              onChange={(e) =>
                setFormData({ ...formData, courseCode: e.target.value })
              }
              required
            />
          </div>

          <div className="schedule-form-row">
            <div className="schedule-form-group">
              <label>Start Time</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
              />
            </div>

            <div className="schedule-form-group">
              <label>End Time</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
              />
            </div>
          </div>

          <div className="schedule-form-group">
            <label>Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div className="schedule-form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="schedule-form-checkbox">
            <input
              type="checkbox"
              id="isOnline"
              checked={formData.isOnline}
              onChange={(e) =>
                setFormData({ ...formData, isOnline: e.target.checked })
              }
            />
            <label htmlFor="isOnline">Online Event</label>
          </div>

          <div className="schedule-form-actions">
            <button
              type="button"
              className="schedule-button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="schedule-button-primary">
              {event ? "Update" : "Create"} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function ScheduleContent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("week"); // week, day, month
  const [filter, setFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState(mockEvents);

  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);

  // Event handlers
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCreateEvent = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(null);
    setEditingEvent(event);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setSelectedEvent(null);
  };

  const handleSaveEvent = (eventData) => {
    if (eventData.id) {
      // Update existing event
      setEvents(
        events.map((event) =>
          event.id === eventData.id ? { ...event, ...eventData } : event
        )
      );
    } else {
      // Create new event
      setEvents([...events, { ...eventData, id: Date.now() }]);
    }
    setIsCreateModalOpen(false);
    setEditingEvent(null);
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsByDate = (date) => {
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    return mockEvents.filter((event) => {
      if (event.type === "class") {
        return event.days.includes(dayOfWeek);
      }
      if (event.type === "meeting") {
        return event.day === dayOfWeek;
      }
      if (event.type === "assignment" || event.type === "exam") {
        return (
          new Date(event.dueDate || event.date).toDateString() ===
          date.toDateString()
        );
      }
      return false;
    });
  };

  const getEventIcon = (type) => {
    switch (type) {
      case "class":
        return <BookOpen className="event-icon" />;
      case "assignment":
        return <FileText className="event-icon" />;
      case "meeting":
        return <Users className="event-icon" />;
      case "exam":
        return <BarChart className="event-icon" />;
      default:
        return <Calendar className="event-icon" />;
    }
  };

  const getEventClass = (type) => {
    switch (type) {
      case "class":
        return "event-class";
      case "assignment":
        return "event-assignment";
      case "meeting":
        return "event-meeting";
      case "exam":
        return "event-exam";
      default:
        return "";
    }
  };

  const formatDateHeader = (date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    return (
      <div className={`date-header ${isToday ? "today" : ""}`}>
        <span className="day-name">
          {date.toLocaleDateString("en-US", { weekday: "short" })}
        </span>
        <span className="date-number">{date.getDate()}</span>
      </div>
    );
  };

  return (
    <div className="schedule-content">
      <div className="schedule-header">
        <div className="schedule-header-left">
          <h1 className="schedule-heading">Schedule</h1>
          <div className="view-controls">
            <button
              className={`schedule-view-button ${
                view === "week" ? "active" : ""
              }`}
              onClick={() => setView("week")}
            >
              Week
            </button>
            <button
              className={`schedule-view-button ${
                view === "day" ? "active" : ""
              }`}
              onClick={() => setView("day")}
            >
              Day
            </button>
            <button
              className={`schedule-view-button ${
                view === "month" ? "active" : ""
              }`}
              onClick={() => setView("month")}
            >
              Month
            </button>
          </div>
        </div>

        <div className="schedule-header-right">
          <button className="today-button" onClick={goToToday}>
            Today
          </button>
          <div className="navigation-buttons">
            <button className="schedule-nav-button" onClick={goToPreviousWeek}>
              <ChevronLeft size={16} />
            </button>
            <button className="schedule-nav-button" onClick={goToNextWeek}>
              <ChevronRight size={16} />
            </button>
          </div>
          <span className="current-date">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="schedule-toolbar">
        <button className="schedule-add-button" onClick={handleCreateEvent}>
          <Plus size={20} />
          Add Event
        </button>

        <div className="schedule-filters">
          <button
            className={`filter-button ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Events
          </button>
          <button
            className={`filter-button ${filter === "classes" ? "active" : ""}`}
            onClick={() => setFilter("classes")}
          >
            Classes
          </button>
          <button
            className={`filter-button ${
              filter === "assignments" ? "active" : ""
            }`}
            onClick={() => setFilter("assignments")}
          >
            Assignments
          </button>
          <button
            className={`filter-button ${filter === "meetings" ? "active" : ""}`}
            onClick={() => setFilter("meetings")}
          >
            Meetings
          </button>
          <button
            className={`filter-button ${filter === "exams" ? "active" : ""}`}
            onClick={() => setFilter("exams")}
          >
            Exams
          </button>
        </div>
      </div>

      <div className="week-view">
        {weekDates.map((date) => (
          <div key={date.toISOString()} className="day-column">
            {formatDateHeader(date)}
            <div className="events-container">
              {getEventsByDate(date)
                .filter(
                  (event) =>
                    filter === "all" || event.type === filter.slice(0, -1)
                )
                .map((event) => (
                  <div
                    key={event.id}
                    className={`schedule-event-card ${getEventClass(
                      event.type
                    )}`}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="event-header">
                      {getEventIcon(event.type)}
                      <span className="schedule-course-code">
                        {event.courseCode}
                      </span>
                    </div>

                    <h3 className="event-title">{event.title}</h3>

                    <div className="schedule-event-details">
                      {event.startTime && (
                        <div className="event-time">
                          <Clock size={14} />
                          <span>
                            {formatTime(event.startTime)} -{" "}
                            {formatTime(event.endTime)}
                          </span>
                        </div>
                      )}

                      {event.location && (
                        <div className="event-location">
                          {event.isOnline ? (
                            <Monitor size={14} />
                          ) : (
                            <MapPin size={14} />
                          )}
                          <span>{event.location}</span>
                        </div>
                      )}

                      {event.priority === "high" && (
                        <div className="event-priority">
                          <AlertCircle size={14} />
                          <span>High Priority</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {getEventsByDate(date).length === 0 && (
                <div className="empty-day-message">
                  <Calendar size={20} />
                  <p>No events scheduled</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}

      {(isCreateModalOpen || editingEvent) && (
        <EventForm
          event={editingEvent}
          onClose={() => {
            setIsCreateModalOpen(false);
            setEditingEvent(null);
          }}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
}

export default ScheduleContent;
