import React, { useState, useEffect } from "react";
import "../Styles/Events.css";
import {
	Search,
	Calendar,
	MapPin,
	Clock,
	Users,
	Share2,
	X,
} from "lucide-react";
import { eventsMockData, eventCategories } from "../Mockdata/eventsMockData";

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

function EventsContent() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedSubcategory, setSelectedSubcategory] = useState("All");
	const [visibleEvents, setVisibleEvents] = useState(6);
	const [rsvpedEvents, setRsvpedEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const filteredEvents = eventsMockData.filter((event) => {
		const lowerSearchTerm = searchTerm.toLowerCase();
		const lowerSelectedSubcategory = selectedSubcategory.toLowerCase();

		return (
			// Title filter (case insensitive)
			event.title.toLowerCase().includes(lowerSearchTerm) &&
			// Category filter (case insensitive)
			(selectedCategory === "All" || event.category === selectedCategory) &&
			// Subcategory filter (case insensitive)
			(selectedSubcategory === "All" ||
				event.subcategory.toLowerCase() === lowerSelectedSubcategory) // Exact match for subcategory
		);
	});

	const loadMoreEvents = () => {
		setVisibleEvents((prevVisible) => prevVisible + 3);
	};

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

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop ===
				document.documentElement.offsetHeight
			) {
				loadMoreEvents();
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="events-content">
			<h1 className="events-title">Upcoming University Events</h1>

			<div className="events-controls">
				<div className="search-bar">
					<Search size={20} />
					<input
						type="text"
						placeholder="Search events..."
						value={searchTerm}
						onChange={handleSearch}
					/>
				</div>
				<div className="event-category-filters">
					{eventCategories.map((category) => (
						<div key={category.name}>
							<button
								className={`event-category-button ${
									selectedCategory === category.name ? "active" : ""
								}`}
								onClick={() => {
									setSelectedCategory(category.name);
									setSelectedSubcategory("All"); // Reset subcategory when changing category
								}}
							>
								{category.icon}
								<span>{category.name}</span>
							</button>
							{selectedCategory === category.name && category.subcategories && (
								<div className="subcategory-filter">
									{category.subcategories.map((subcategory) => (
										<button
											key={subcategory}
											className={`event-subcategory-button ${
												selectedSubcategory === subcategory ? "active" : ""
											}`}
											onClick={() => setSelectedSubcategory(subcategory)}
										>
											{subcategory}
										</button>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</div>

			<div className="featured-events">
				{filteredEvents
					.filter((event) => event.featured)
					.map((event) => (
						<div
							key={event.id}
							className="featured-event-card"
							onClick={() => openEventModal(event)}
						>
							<div
								className="featured-event-image"
								style={{ backgroundImage: `url(${event.image})` }}
							>
								<div className="featured-event-overlay">
									<h3>{event.title}</h3>
									<p>{event.description}</p>
								</div>
							</div>
							<div className="featured-event-details">
								<div className="event-info">
									<Calendar size={16} />
									<span>{event.date}</span>
								</div>
								<div className="event-info">
									<MapPin size={16} />
									<span>{event.location}</span>
								</div>
								<div className="event-info">
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
					))}
			</div>

			<h2 className="section-title">All Events</h2>
			<div className="events-grid">
				{filteredEvents.slice(0, visibleEvents).map((event) => (
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
							<p className="event-category">{event.subcategory}</p>{" "}
							{/* Update to show subcategory */}
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

			{visibleEvents < filteredEvents.length && (
				<button className="load-more-button" onClick={loadMoreEvents}>
					Load More Events
				</button>
			)}

			{/* Event Modal */}
			{selectedEvent && (
				<EventModal event={selectedEvent} onClose={closeEventModal} />
			)}
		</div>
	);
}

export default EventsContent;
