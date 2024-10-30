// ClubsContent.js
import React, { useState, useEffect } from "react";
import "../Styles/Clubs.css";
import { clubsData } from "../Mockdata/ClubData";
import JoinableClubs from "./JoinableClubs";
import ClubDetailPanel from "./ClubDetails"; // Import the ClubDetailPanel component

const colors = ["#F49595", "#FFDAB9", "#CDB4DB", "#A9D4EE"];

// Define default joined clubs
const defaultJoinedClubs = [
	{
		id: 1,
		name: "Photography Club",
		overview: "A club for photography enthusiasts.",
	},
	{ id: 2, name: "Coding Ninjas", overview: "A club for aspiring coders." },
];

const ClubsContent = () => {
	const [selectedFilter] = useState("all");
	const [joinedClubs, setJoinedClubs] = useState(() => {
		const savedClubs = localStorage.getItem("joinedClubs");
		return savedClubs ? JSON.parse(savedClubs) : defaultJoinedClubs;
	});
	const [selectedClub, setSelectedClub] = useState(null); // State for selected club

	// Save joined clubs to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem("joinedClubs", JSON.stringify(joinedClubs));
	}, [joinedClubs]);

	// Function to filter clubs based on the selected category
	const filteredClubs = clubsData.filter((club) => {
		if (selectedFilter === "all") return true;
		return club.category === selectedFilter;
	});

	const handleJoinClub = (club) => {
		setJoinedClubs((prevJoined) => [...prevJoined, club]); // Add club to joined clubs
	};

	const handleLeaveClub = (clubId) => {
		setJoinedClubs((prevJoined) =>
			prevJoined.filter((club) => club.id !== clubId)
		); // Remove club from joined clubs
		setSelectedClub(null); // Close the detail panel
	};

	const remainingJoinableClubs = filteredClubs.filter(
		(club) => !joinedClubs.some((joinedClub) => joinedClub.id === club.id)
	);

	return (
		<div className="clubs-page">
			<header className="clubs-header">
				<h1>My Clubs</h1>
			</header>
			<p>Find and join your favorite clubs!</p>

			<div className="clubs-container">
				<div className="clubs-grid">
					{/* Render default joined clubs */}
					{joinedClubs.map((club, index) => (
						<div
							key={club.id}
							className="club-card"
							style={{ backgroundColor: colors[index % colors.length] }}
							onClick={() => setSelectedClub(club)} // Set the selected club on click
						>
							<h3>{club.name}</h3>
							<p>{club.overview}</p>
						</div>
					))}
				</div>
			</div>

			{/* Show the detail panel for the selected club */}
			{selectedClub && (
				<ClubDetailPanel
					club={selectedClub}
					onLeaveClub={handleLeaveClub}
					onClose={() => setSelectedClub(null)} // Close panel handler
				/>
			)}

			<JoinableClubs
				clubs={remainingJoinableClubs} // Pass remaining clubs as props
				onJoinClub={handleJoinClub} // Pass join club handler
			/>
		</div>
	);
};

export default ClubsContent;
