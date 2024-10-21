import React, { useState } from "react";
import { Newspaper } from "lucide-react";
import "../Styles/Home2.css";
import "../Styles/Carousel.css";
import {
	enhancedMockNewsData,
	newsCategories,
} from "../Mockdata/detailedMockData";
import Carousel from "./Carousel"; // Import the Carousel component

// Sample images for the carousel
const carouselImages = [
	"./images/student-unsplash.jpg", // Replace with actual paths
	"./images/image2.png",
	"./images/image3.png",
];

const carouselTitles = [
	"Welcome to the Student Hub",
	"Explore Your Courses",
	"Join Community Events",
];

const carouselParagraphs = [
	"Here you can find resources to enhance your learning experience. Stay updated and get involved!",
	"Discover a variety of courses tailored to your interests.",
	"Participate in events that connect you with peers and professionals.",
];
function HomeContent() {
	const [filter, setFilter] = useState("All");

	const allCategories = [
		{ name: "All", icon: <Newspaper size={20} /> },
		...newsCategories.filter((cat) => cat.name !== "All"),
	];

	const combinedUpdates = [
		...enhancedMockNewsData.map((news) => ({ ...news, type: "news" })),
	].sort((a, b) => new Date(b.date) - new Date(a.date));

	const filteredUpdates = combinedUpdates.filter(
		(update) => filter === "All" || update.category === filter
	);

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
		</>
	);
}

export default HomeContent;
