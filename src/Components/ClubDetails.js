import React from "react";
import "../Styles/ClubDetails.css";
const ClubDetailPanel = ({ club, onLeaveClub, onClose }) => {
	// Custom schedule for each club based on club ID
	const getClubSchedule = (clubId) => {
		const schedules = {
			1: [
				{ day: "Monday", time: "3 PM - 5 PM", room: "Science Lab 101" },
				{ day: "Thursday", time: "4 PM - 6 PM", room: "Science Lab 102" },
			],
			2: [
				{ day: "Wedneday", time: "3 PM - 5 PM", room: "Science Lab 101" },
				{ day: "Thursday", time: "4 PM - 6 PM", room: "Science Lab 102" },
			],
		};
		return schedules[clubId] || [];
	};

	const schedule = getClubSchedule(club.id);

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="club-details-panel" onClick={(e) => e.stopPropagation()}>
				<button className="close-button" onClick={onClose}>
					×
				</button>

				<div className="overview-section">
					<div>
						<h2>{club.name}</h2>
						<span className="club-category">{club.category || "General"}</span>
					</div>
					<div className="member-count">
						<span>Active Members: 42</span>
						<span className="status-active">● Active</span>
					</div>
				</div>

				<div className="description-section">
					<h4>About the Club</h4>
					<p className="club-description">
						{club.overview}
						Lorem ipsum dolor sit amet, consectetur adipiscing elit...
					</p>
				</div>

				<div className="meeting-info">
					<h4>Meeting Schedule</h4>
					{schedule.map((slot, index) => (
						<div key={index} className="schedule-slot">
							<p className="day">{slot.day}</p>
							<p className="time">{slot.time}</p>
							<p className="room">{slot.room}</p>
						</div>
					))}
				</div>

				<div className="requirements-section">
					<div>
						<h4>Requirements</h4>
						<ul>
							<li>Must be a full-time student</li>
							<li>Maintain 2.5 GPA or higher</li>
							<li>Attend at least 75% of meetings</li>
						</ul>
					</div>
					<div>
						<h4>Equipment Needed</h4>
						<ul>
							<li>Personal laptop (recommended)</li>
							<li>Notebook and writing materials</li>
							<li>Club-specific materials will be provided</li>
						</ul>
					</div>
				</div>

				<div className="join-club-form">
					<button className="join-button" onClick={() => onLeaveClub(club.id)}>
						Leave Club
					</button>
				</div>
			</div>
		</div>
	);
};

export default ClubDetailPanel;
