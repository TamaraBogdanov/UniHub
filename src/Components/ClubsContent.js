// ClubsContent.js
import React, { useState } from "react";
import "../Styles/Clubs.css";

import { clubsData } from "../Mockdata/ClubData";
import JoinableClubs from "./JoinableClubs";

const colors = ["#F49595", "#FFDAB9", "#CDB4DB", "#A9D4EE"];

const ClubsContent = () => {
	const [selectedFilter, setSelectedFilter] = useState("all");

	// Function to filter clubs based on the selected category
	const filteredClubs = clubsData.filter((club) => {
		if (selectedFilter === "all") return true;
		return club.category === selectedFilter;
	});

	return (
		<div className="clubs-page">
			<header className="clubs-header">
				<h1>My Clubs</h1>
			</header>
			<p>Find and join your favorite clubs!</p>
			{/* Filter buttons */}
			<div className="clubs-filters">
				<button
					className={`filter-button ${
						selectedFilter === "all" ? "active" : ""
					}`}
					onClick={() => setSelectedFilter("all")}
				>
					All
				</button>
				<button
					className={`filter-button ${
						selectedFilter === "academic" ? "active" : ""
					}`}
					onClick={() => setSelectedFilter("academic")}
				>
					Academic
				</button>
				<button
					className={`filter-button ${
						selectedFilter === "sports" ? "active" : ""
					}`}
					onClick={() => setSelectedFilter("sports")}
				>
					Sports
				</button>
				<button
					className={`filter-button ${
						selectedFilter === "arts" ? "active" : ""
					}`}
					onClick={() => setSelectedFilter("arts")}
				>
					Arts
				</button>
				{/* Add more filters as needed */}
			</div>
			<div className="clubs-container">
				<div className="clubs-grid">
					{filteredClubs.map((club, index) => (
						<div
							key={club.id}
							className="club-card"
							style={{ backgroundColor: colors[index % colors.length] }}
						>
							<h3>{club.name}</h3>
							<p>{club.overview}</p>
						</div>
					))}
				</div>
			</div>
			<JoinableClubs />
		</div>
	);
};

export default ClubsContent;
