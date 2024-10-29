import React, { useState } from "react";
import "../Styles/Clubs.css";

const JoinableClubs = ({ clubs, onJoinClub }) => {
	const [selectedClub, setSelectedClub] = useState(null);
	const [showPanel, setShowPanel] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		surname: "",
		studentNumber: "",
	});
	const [formSubmitted, setFormSubmitted] = useState(false);

	const handleClubClick = (club) => {
		setSelectedClub(club);
		setShowPanel(true);
		setShowForm(false); // Reset the form state when a new club is selected
		setFormSubmitted(false); // Reset the form submitted state
	};

	const handleClosePanel = () => {
		setShowPanel(false);
		setShowForm(false);
		setFormData({ name: "", surname: "", studentNumber: "" });
		setFormSubmitted(false);
	};

	const handleOverlayClick = (e) => {
		if (e.target.className === "modal-overlay") {
			handleClosePanel();
		}
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(`Joined club ${selectedClub.id} with data:`, formData);
		setFormSubmitted(true); // Set form submitted state to true
		setShowForm(false); // Hide form after submission
		onJoinClub(selectedClub); // Call the join club handler
	};

	return (
		<div className="joinable-clubs-section">
			<div className="joinable-clubs-header">
				<h2>Clubs You Can Join</h2>
				<p>Explore and join the clubs that interest you!</p>
			</div>

			{clubs.map((club) => (
				<div
					key={club.id}
					className="joinable-club-card"
					onClick={() => handleClubClick(club)}
				>
					<h3>{club.name}</h3>
					<p>{club.overview}</p>
				</div>
			))}

			{showPanel && selectedClub && (
				<div className="modal-overlay" onClick={handleOverlayClick}>
					<div className="club-details-panel">
						<button className="close-button" onClick={handleClosePanel}>
							×
						</button>

						<h2>{selectedClub.name}</h2>

						{!showForm ? (
							<>
								<div className="overview-section">
									<p>{selectedClub.overview}</p>
								</div>

								{!formSubmitted && (
									<button
										className="join-button"
										onClick={() => setShowForm(true)}
									>
										Join Club
									</button>
								)}
							</>
						) : (
							<form onSubmit={handleSubmit} className="join-club-form">
								<h3>Join {selectedClub.name}</h3>
								<div>
									<label htmlFor="name">Name:</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div>
									<label htmlFor="surname">Surname:</label>
									<input
										type="text"
										id="surname"
										name="surname"
										value={formData.surname}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div>
									<label htmlFor="studentNumber">Student Number:</label>
									<input
										type="text"
										id="studentNumber"
										name="studentNumber"
										value={formData.studentNumber}
										onChange={handleInputChange}
										required
									/>
								</div>
								<button type="submit" className="join-button">
									Submit
								</button>
							</form>
						)}

						{/* Show success message after form submission */}
						{formSubmitted && <p>Successfully joined the club!</p>}
					</div>
				</div>
			)}
		</div>
	);
};

export default JoinableClubs;
