import React, { useState } from "react";
import { joinableClubsData } from "../Mockdata/JoinableClubs";
import "../Styles/Clubs.css";

const JoinableClubs = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedClub, setSelectedClub] = useState(null);
	const [showPanel, setShowPanel] = useState(false);

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleClubClick = (club) => {
		setSelectedClub(club);
		setShowPanel(true);
	};

	const handleJoinClub = (clubId) => {
		console.log(`Joined club ${clubId}`);
		setShowPanel(false);
	};

	const handleClosePanel = () => {
		setShowPanel(false);
	};

	const handleOverlayClick = (e) => {
		if (e.target.className === "modal-overlay") {
			setShowPanel(false);
		}
	};

	return (
		<div className="joinable-clubs-section">
			<div className="joinable-clubs-header">
				<h2>Clubs You Can Join</h2>
				<p>Explore and join the clubs that interest you!</p>
			</div>

			<input
				type="text"
				placeholder="Search clubs..."
				value={searchTerm}
				onChange={handleSearch}
				className="search-bar"
			/>

			<div className="joinable-clubs-grid">
				{joinableClubsData
					.filter((club) =>
						club.name.toLowerCase().includes(searchTerm.toLowerCase())
					)
					.map((club) => (
						<div
							key={club.id}
							className="joinable-club-card"
							onClick={() => handleClubClick(club)}
						>
							<h3>{club.name}</h3>
							<p>{club.overview}</p>
						</div>
					))}
			</div>

			{showPanel && selectedClub && (
				<div className="modal-overlay" onClick={handleOverlayClick}>
					<div className="club-details-panel">
						<button className="close-button" onClick={handleClosePanel}>
							×
						</button>

						<h2>{selectedClub.name}</h2>

						<div className="overview-section">
							<p>{selectedClub.overview}</p>
						</div>

						<div className="meeting-info">
							<div className="info-row">
								<h4>Schedule</h4>
								<p>{selectedClub.schedule}</p>
							</div>

							<div className="info-row">
								<h4>Location</h4>
								<p>{selectedClub.meetingLocation}</p>
							</div>

							<div className="info-row">
								<h4>Next Meeting</h4>
								<p>{selectedClub.nextMeeting}</p>
							</div>
						</div>

						<div className="description-section">
							<h4>About the Club</h4>
							<p>{selectedClub.description}</p>
						</div>

						<div className="requirements-section">
							<h4>Requirements</h4>
							<p>{selectedClub.requirements}</p>
						</div>

						<button
							className="join-button"
							onClick={() => handleJoinClub(selectedClub.id)}
						>
							Join Club
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default JoinableClubs;
