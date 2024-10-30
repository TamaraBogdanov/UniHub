// Inside src/Pages/Schedule.js
import React from "react";

const Schedule = ({ transportData, selectedDay }) => {
	const filteredTransport = transportData.filter((item) =>
		item.days.includes(selectedDay)
	);

	return (
		<div className="schedule-container">
			<h2>Transportation Schedule for {selectedDay}</h2>
			{filteredTransport.length === 0 ? (
				<p>No transport available for {selectedDay}</p>
			) : (
				filteredTransport.map((item) => (
					<div key={item.id} className="schedule-item">
						<h3>
							{item.vehicle} ({item.type})
						</h3>
						<ul>
							{item.routes.map((route, index) => (
								<li key={index}>
									{route.time} - {route.location}
								</li>
							))}
						</ul>
					</div>
				))
			)}
		</div>
	);
};

export default Schedule;
