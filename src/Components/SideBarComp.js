import React, { useState } from "react";
import "../Styles/ClubBar.css";

const ClubBar = () => {
	const [isOpen, setIsOpen] = useState(true);
	const studentName = "John Doe";
	const clubs = ["Art Club", "Science Club"];
	const notifications = [
		"New event in Art Club",
		"Science Club meeting tomorrow",
	];

	const toggleClubBar = () => {
		setIsOpen(!isOpen);
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
