import React, { useState } from "react";
import {
	Newspaper,
	Calendar,
	Clock,
	Users,
	MapPin,
	Share2,
	X,
} from "lucide-react";
import "../Styles/Home2.css";

import { enhancedMockNewsData, Categories } from "../Mockdata/detailedMockData";
import { wellnessEvents } from "../Components/WellnessContent";
import { eventsMockData } from "../Mockdata/eventsMockData";

// Event Modal Component
function EventModal({ event, onClose }) {
	if (!event) return null;

	const handleShare = () => {
		if (navigator.share) {
			navigator
				.share({
					title: event.title,
					text: event.description,
					url: window.location.href,
				})
				.then(() => {
					console.log("Thanks for sharing!");
				})
				.catch(console.error);
		} else {
			alert(
				`Share this event: ${event.title}\n${event.description}\n${window.location.href}`
			);
		}
	};

	return (
		<div className="event-modal-overlay">
			<div className="event-modal">
				<button className="close-modal" onClick={onClose}>
					<X size={24} />
				</button>
				<img src={event.image} alt={event.title} className="modal-image" />
				<div className="modal-content">
					<h2>{event.title}</h2>
					<p className="event-category">{event.category}</p>
					<div className="event-details">
						<div className="detail">
							<Calendar size={16} /> <span>{event.date}</span>
						</div>
						<div className="detail">
							<Clock size={16} /> <span>{event.time}</span>
						</div>
						<div className="detail">
							<MapPin size={16} /> <span>{event.location}</span>
						</div>
						<div className="detail">
							<Users size={16} /> <span>{event.attendees} attending</span>
						</div>
					</div>
					<p className="event-description">{event.description}</p>
					<button className="share-button" onClick={handleShare}>
						<Share2 size={16} /> Share Event
					</button>
				</div>
			</div>
		</div>
	);
}

function HomeContent() {
	const [filter, setFilter] = useState("All");
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [rsvpedEvents, setRsvpedEvents] = useState([]);

	// Combine news data and wellness events
	const combinedUpdates = [
		...enhancedMockNewsData.map((news) => ({
			...news,
			type: "news",
			category: "News",
		})),
		...wellnessEvents.map((event) => ({
			...event,
			type: "wellness",
			category: "Wellness",
		})),
	].sort((a, b) => new Date(b.date) - new Date(a.date));

	// Filter updates based on category
	const filteredUpdates = combinedUpdates.filter(
		(update) => filter === "All" || update.category === filter
	);

	// Filter and sort events
	const filteredEvents = eventsMockData
		.filter((event) => filter === "All" || event.category === filter)
		.sort((a, b) => new Date(b.date) - new Date(a.date))
		.slice(0, 5);

	const handleRSVP = (eventId) => {
		setRsvpedEvents((prev) =>
			prev.includes(eventId)
				? prev.filter((id) => id !== eventId)
				: [...prev, eventId]
		);
	};

	const openEventModal = (event) => {
		setSelectedEvent(event);
	};

	const closeEventModal = () => {
		setSelectedEvent(null);
	};

	return (
		<>
			<section className="hero">
				<div className="hero-text">
					<h1>Welcome, Student!</h1>
					<h2>Ready to continue your academic journey?</h2>
					<div className="hero-buttons">
						<button className="schedule-button">View Schedule</button>
						<button className="course-button">Explore Courses</button>
					</div>
				</div>
				<div className="hero-image">
					<img src="./images/portal.png" alt="Hero" />
				</div>
			</section>

			<section className="updates-section">
				<h2>Latest Updates</h2>
				<div className="filter-system">
					{Categories.map(({ name, icon }) => (
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
							<div className="update-icon">
								{update.icon || <Newspaper size={24} />}
							</div>
							<div className="update-content">
								<h3>{update.title}</h3>
								<p className="update-category">
									{update.category || "General"}
								</p>
								<p className="update-date">{update.date}</p>
								<p className="update-description">
									{update.description
										? update.description.substring(0, 100)
										: update.content
										? update.content.substring(0, 100)
										: ""}{" "}
									...
								</p>
								{update.type === "wellness" && (
									<div className="wellness-event-details">
										<p>
											<Calendar size={16} /> {update.date}
										</p>
										<p>
											<Clock size={16} /> {update.time}
										</p>
										<p>
											<Users size={16} /> {update.attendees} attendees
										</p>
									</div>
								)}
							</div>
						</div>
					))}
				</div>

				{filteredEvents.length > 0 && (
					<section className="events-section">
						<h2>Upcoming Events</h2>
						<div className="events-grid">
							{filteredEvents.map((event) => (
								<div
									key={event.id}
									className="event-card"
									onClick={() => openEventModal(event)}
								>
									<div
										className="event-image"
										style={{ backgroundImage: `url(${event.image})` }}
									></div>
									<div className="event-content">
										<h3>{event.title}</h3>
										<p className="event-category">{event.category}</p>
										<div className="event-details">
											<div className="detail">
												<Calendar size={16} />
												<span>{event.date}</span>
											</div>
											<div className="detail">
												<MapPin size={16} />
												<span>{event.location}</span>
											</div>
											<div className="detail">
												<Users size={16} />
												<span>{event.attendees} attending</span>
											</div>
										</div>
										<button
											className={`event-rsvp ${
												rsvpedEvents.includes(event.id) ? "rsvped" : ""
											}`}
											onClick={(e) => {
												e.stopPropagation();
												handleRSVP(event.id);
											}}
										>
											{rsvpedEvents.includes(event.id) ? "Cancel RSVP" : "RSVP"}
										</button>
									</div>
								</div>
							))}
						</div>
					</section>
				)}
			</section>

			<EventModal event={selectedEvent} onClose={closeEventModal} />
		</>
	);
}

export default HomeContent;
