import "../Styles/ClubBar.css"; // Change CSS import to ClubBar.css

const ClubBar = () => {
	const studentName = "John Doe"; // Example student name
	const clubs = ["Art Club", "Science Club"]; // Example clubs
	const notifications = [
		"New event in Art Club",
		"Science Club meeting tomorrow",
	]; // Example notifications

	return (
		<div className="club-bar">
			{" "}
			{/* Removed toggle functionality */}
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
		</div>
	);
};

export default ClubBar; // Export the renamed component
