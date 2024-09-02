import React, { useState } from "react";
import { Plus, X, Edit2, CheckSquare, Clock } from "lucide-react";
import "../Styles/Schedule.css";
import { useTodo } from "../Components/TodoContext";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM

// Mock data for demo purposes - schedule
const initialSchedule = [
  {
    id: 1,
    day: "Monday",
    startTime: 9,
    endTime: 11,
    title: "Computer Science Lecture",
    type: "lecture",
  },
  {
    id: 2,
    day: "Tuesday",
    startTime: 14,
    endTime: 16,
    title: "Mathematics Tutorial",
    type: "tutorial",
  },
  {
    id: 3,
    day: "Wednesday",
    startTime: 10,
    endTime: 12,
    title: "Physics Lab",
    type: "lab",
  },
  {
    id: 4,
    day: "Thursday",
    startTime: 13,
    endTime: 15,
    title: "Study Group",
    type: "study",
  },
  {
    id: 5,
    day: "Friday",
    startTime: 11,
    endTime: 13,
    title: "Research Meeting",
    type: "meeting",
  },
];

// Schedule component
function ScheduleContent() {
  // State hooks for schedule and modal
  const [schedule, setSchedule] = useState(initialSchedule);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    day: "",
    startTime: 7,
    endTime: 8,
    title: "",
    type: "lecture",
  });

  // Context hooks for todos
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodo();
  const [newTodo, setNewTodo] = useState("");

  // Helper functions for modal
  const openModal = (event = null) => {
    if (event) {
      setSelectedEvent(event);
      setNewEvent(event);
    } else {
      setSelectedEvent(null);
      setNewEvent({
        day: "",
        startTime: 7,
        endTime: 8,
        title: "",
        type: "lecture",
      });
    }
    setIsModalOpen(true);
  };

  // Modal functions and event handlers
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]:
        name === "startTime" || name === "endTime" ? parseInt(value) : value,
    });
  };

  // Event handlers for modal buttons
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEvent) {
      setSchedule(
        schedule.map((event) =>
          event.id === selectedEvent.id
            ? { ...newEvent, id: selectedEvent.id }
            : event
        )
      );
    } else {
      setSchedule([...schedule, { ...newEvent, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDeleteEvent = () => {
    setSchedule(schedule.filter((event) => event.id !== selectedEvent.id));
    closeModal();
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  // Rendering functions
  const renderEvent = (event, day) => {
    // Calculate top and height based on startTime and endTime
    const top = (event.startTime - 7) * 60; // 7 is the starting hour
    const height = (event.endTime - event.startTime) * 60;
    return (
      <div
        key={event.id}
        className={`event ${event.type}`}
        style={{
          top: `${top}px`,
          height: `${height}px`,
        }}
        onClick={() => openModal(event)}
      >
        {event.title}
      </div>
    );
  };

  return (
    <div className="schedule-content">
      <h2>My Schedule</h2>
      <div className="schedule-grid">
        <div className="time-column">
          <div className="day-header"></div>
          {timeSlots.map((time) => (
            <div key={time} className="time-slot">
              {time}:00
            </div>
          ))}
        </div>
        {daysOfWeek.map((day) => (
          <div key={day} className="day-column">
            <div className="day-header">{day}</div>
            <div className="day-slots">
              {schedule
                .filter((event) => event.day === day)
                .map((event) => renderEvent(event, day))}
              {timeSlots.map((time) => (
                <div
                  key={`${day}-${time}`}
                  className="time-slot"
                  onClick={() =>
                    openModal({
                      day,
                      startTime: time,
                      endTime: time + 1,
                      title: "",
                      type: "lecture",
                    })
                  }
                >
                  <span className="add-event">+</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="todo-section">
        <h3>To-Do List</h3>
        {/* Form for adding new tasks and list of tasks */}
        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
          />
          <button type="submit">
            <Plus size={20} />
          </button>
        </form>

        {/* List of tasks */}
        <ul className="todo-list">
          {/* Render each task as a list item */}
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <span onClick={() => toggleTodo(todo.id)}>
                <CheckSquare size={20} />
                {todo.title}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{selectedEvent ? "Edit Event" : "Add New Event"}</h3>
            {/* Form for editing or adding new events */}
            <form onSubmit={handleSubmit}>
              <select
                name="day"
                value={newEvent.day}
                onChange={handleEventChange}
                required
              >
                {/* Add an option for each day of the week */}
                <option value="">Select Day</option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              {/* Input fields for start and end time and title */}
              <div className="time-inputs">
                <label>
                  Start Time:
                  <input
                    type="number"
                    name="startTime"
                    min="7"
                    max="20"
                    value={newEvent.startTime}
                    onChange={handleEventChange}
                    required
                  />
                </label>

                <label>
                  End Time:
                  <input
                    type="number"
                    name="endTime"
                    min="8"
                    max="21"
                    value={newEvent.endTime}
                    onChange={handleEventChange}
                    required
                  />
                </label>
              </div>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleEventChange}
                placeholder="Event Title"
                required
              />
              <select
                name="type"
                value={newEvent.type}
                onChange={handleEventChange}
              >
                {/* Added an option for each event type */}
                <option value="lecture">Lecture</option>
                <option value="tutorial">Tutorial</option>
                <option value="lab">Lab</option>
                <option value="study">Study</option>
                <option value="meeting">Meeting</option>
              </select>

              {/* Added buttons for submitting and canceling the form */}
              <div className="modal-actions">
                <button type="submit">
                  {selectedEvent ? "Update" : "Add"} Event
                </button>
                {selectedEvent && (
                  <button type="button" onClick={handleDeleteEvent}>
                    Delete Event
                  </button>
                )}

                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduleContent;
