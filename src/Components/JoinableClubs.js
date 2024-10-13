// JoinableClubs.js
import React, { useState } from "react";
import "../Styles/Clubs.css"; // Import your CSS file
import { joinableClubsData } from "../Mockdata/ClubData"; // Adjust import path as necessary

const JoinableClubs = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	return (
		<div className="joinable-clubs-section">
			<h2>Clubs You Can Join</h2>
			<input
				type="text"
				placeholder="Search clubs..."
				value={searchTerm}
				onChange={handleSearch}
				className="search-bar" // Optional class for styling
			/>
			<div className="joinable-clubs-grid">
				{joinableClubsData
					.filter((club) =>
						club.name.toLowerCase().includes(searchTerm.toLowerCase())
					)
					.map((club) => (
						<div key={club.id} className="joinable-club-card">
							<h3>{club.name}</h3>
							<p>{club.overview}</p>
						</div>
					))}
			</div>
		</div>
	);
};

export default JoinableClubs;
