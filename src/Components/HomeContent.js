import React, { useState } from "react";
import { Newspaper, Calendar, Clock, Users } from "lucide-react";
import "../Styles/Home2.css";
import "../Styles/Carousel.css";
import { enhancedMockNewsData, Categories } from "../Mockdata/detailedMockData";
import Carousel from "../Shared/Carousel";
import { wellnessEvents } from "../Components/WellnessContent";
import { eventsMockData } from "../Mockdata/eventsMockData"; // Import events data

const carouselImages = [
	"./images/student-unsplash.jpg",
	"./images/image2.png",
	"./images/image3.png",
];

const carouselTitles = [
	"Welcome to the Student Hub",
	"Explore Your Courses",
	"Join Community Events",
];

const carouselParagraphs = [
	"Here you can find resources to enhance your student life. Stay updated and get involved!",
	"Discover a variety of courses tailored to your interests.",
	"Participate in events that connect you with peers and professionals.",
];

function HomeContent() {
	const [filter, setFilter] = useState("All");

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

	// Filter events separately and display only the newer ones
	const filteredEvents = eventsMockData
		.filter((event) => filter === "All" || event.category === filter)
		.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date to get newer events first
		.slice(0, 5); // Adjust the number as needed to limit the number of newer events displayed

	return (
		<>
			<Carousel
				images={carouselImages}
				titles={carouselTitles}
				paragraphs={carouselParagraphs}
			/>
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
				{/* Updates Grid */}
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
								{/* Show extra details for wellness events */}
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

				{/* Events Section */}
				<section className="events-section">
					{filteredEvents.length > 0 && <h2>Upcoming Events</h2>}{" "}
					{/* Only show if there are events */}
					<div className="events-grid">
						{filteredEvents.map((event, index) => (
							<div key={index} className="event-card">
								<img
									src={event.image}
									alt={event.title}
									className="event-image"
								/>
								<h3>{event.title}</h3>
								<p className="event-category">{event.category}</p>
								<p className="event-date">{event.date}</p>

								<p>Location: {event.location}</p>
								{/* Additional details */}
								<p>
									<Calendar size={16} /> {event.date}
								</p>
								<p>
									<Clock size={16} /> {event.time}
								</p>
								<p>
									<Users size={16} /> {event.attendees} attendees
								</p>
							</div>
						))}
					</div>
				</section>
			</section>
		</>
	);
}

export default HomeContent;
