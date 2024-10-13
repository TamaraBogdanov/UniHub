// ClubsContent.js
import React, { useState } from "react";
import "../Styles/Clubs.css";
import ClubBar from "./SideBarComp"; // Adjust the import path as necessary
import { clubsData } from "../Mockdata/ClubData"; // Ensure clubsData has categories
import JoinableClubs from "./JoinableClubs";

const colors = [
	"#F49595", // Color for the first club
	"#FFDAB9", // Color for the second club
	"#CDB4DB", // Color for the third club
	"#A9D4EE", // Color for the fourth club
];

const ClubsContent = () => {
	const [selectedFilter, setSelectedFilter] = useState("all"); // Initialize filter state

	// Function to filter clubs based on the selected category
	const filteredClubs = clubsData.filter((club) => {
		if (selectedFilter === "all") return true; // Show all clubs
		return club.category === selectedFilter; // Filter by selected category
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
							style={{ backgroundColor: colors[index % colors.length] }} // Assign color based on index
						>
							<h3>{club.name}</h3>
							<p>{club.overview}</p>
						</div>
					))}
				</div>
			</div>
			<JoinableClubs /> {/* Include the Joinable Clubs component here */}
			<ClubBar /> {/* Include the Sidebar component here */}
		</div>
	);
};

export default ClubsContent;
