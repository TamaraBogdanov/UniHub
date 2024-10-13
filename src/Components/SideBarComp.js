import React, { useState } from "react";
import "../Styles/ClubBar.css"; // Ensure the correct path for your CSS file

const ClubBar = () => {
	const [isOpen, setIsOpen] = useState(true); // Toggle state for the sidebar
	const studentName = "John Doe"; // Example student name
	const clubs = ["Art Club", "Science Club"]; // Example clubs
	const notifications = [
		"New event in Art Club",
		"Science Club meeting tomorrow",
	]; // Example notifications

	const toggleClubBar = () => {
		setIsOpen(!isOpen); // Toggle the open state
	};

	return (
		<div className={`club-bar ${isOpen ? "open" : "closed"}`}>
			<div className="club-bar-toggle" onClick={toggleClubBar}></div>
			{isOpen && (
				<>
					<div className="club-bar-header">
						<h3>{studentName}</h3>
					</div>
					<div className="club-bar-content">
						<h4>Your Clubs:</h4>
						<ul>
							{clubs.map((club, index) => (
								<li key={index}>{club}</li>
							))}
						</ul>
						<h4>Notifications:</h4>
						<ul>
							{notifications.map((notification, index) => (
								<li key={index}>{notification}</li>
							))}
						</ul>
					</div>
				</>
			)}
		</div>
	);
};

export default ClubBar;
