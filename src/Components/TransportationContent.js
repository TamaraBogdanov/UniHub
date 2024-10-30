import React, { useState, useEffect } from "react";
import "../Styles/Events.css";
import "../Styles/Transportation.css";
import CampusControl from "./CampusControl"; // Import the CampusControl component
import { transportData } from "../Mockdata/TransportData";

const getToday = () => {
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const today = new Date();
	return {
		day: days[today.getDay()],
		date: today.toLocaleDateString(),
	};
};

function TransportationContent() {
	const { day: currentDay, date: currentDate } = getToday();
	const [selectedDay, setSelectedDay] = useState(currentDay);
	const [currentTime, setCurrentTime] = useState(new Date());
	const [availableNow, setAvailableNow] = useState([]);
	const [comingNext, setComingNext] = useState([]);
	const [scheduleModal, setScheduleModal] = useState(null);

	const timeToMinutes = (timeStr) => {
		const [hours, minutes] = timeStr.split(":").map(Number);
		return hours * 60 + minutes;
	};

	const isVehicleAvailableNow = (startTime, endTime) => {
		const currentMinutes =
			currentTime.getHours() * 60 + currentTime.getMinutes();
		const startMinutes = timeToMinutes(startTime);
		const endMinutes = timeToMinutes(endTime);

		return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
	};

	useEffect(() => {
		setCurrentTime(new Date());
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const updateVehicles = () => {
			const currentMinutes =
				currentTime.getHours() * 60 + currentTime.getMinutes();

			const nowAvailable = transportData.filter(
				(item) =>
					item.days.includes(currentDay) &&
					item.routes.some((route) =>
						isVehicleAvailableNow(route.startTime, route.endTime)
					)
			);

			const upcomingVehicles = [];
			transportData.forEach((item) => {
				if (item.days.includes(currentDay)) {
					item.routes.forEach((route) => {
						const startMinutes = timeToMinutes(route.startTime);

						if (startMinutes > currentMinutes) {
							upcomingVehicles.push({
								...item,
								nextRoute: route,
								minutesUntilStart: startMinutes - currentMinutes,
							});
						}
					});
				}
			});

			upcomingVehicles.sort(
				(a, b) => a.minutesUntilStart - b.minutesUntilStart
			);

			setAvailableNow(nowAvailable);
			setComingNext(upcomingVehicles);
		};

		updateVehicles();
	}, [currentTime, currentDay]);

	const handleDayChange = (day) => {
		setSelectedDay(day);
	};

	const formatTimeRemaining = (minutesUntilStart) => {
		const hours = Math.floor(minutesUntilStart / 60);
		const minutes = minutesUntilStart % 60;

		if (hours > 0) {
			return `${hours} hour${hours > 1 ? "s" : ""} and ${minutes} minute${
				minutes !== 1 ? "s" : ""
			}`;
		}
		return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
	};

	const openScheduleModal = (item) => {
		setScheduleModal(item);
	};

	const closeScheduleModal = () => {
		setScheduleModal(null);
	};

	return (
		<div className="transportation-page">
			<div className="header">
				<h2>Transportation Schedule ({currentDay})</h2>
				<p className="current-time">
					Current time:{" "}
					{currentTime.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
			</div>

			<div className="real-time-info">
				{availableNow.length > 0 ? (
					<div>
						<h3>Available Now</h3>
						<ul>
							{availableNow.map((item, index) => (
								<li key={index}>
									{item.vehicle} -{" "}
									{
										item.routes.find((route) =>
											isVehicleAvailableNow(route.startTime, route.endTime)
										).startTime
									}{" "}
									to{" "}
									{
										item.routes.find((route) =>
											isVehicleAvailableNow(route.startTime, route.endTime)
										).endTime
									}{" "}
									-{" "}
									{
										item.routes.find((route) =>
											isVehicleAvailableNow(route.startTime, route.endTime)
										).location
									}
								</li>
							))}
						</ul>
					</div>
				) : (
					<p>No vehicles available right now.</p>
				)}

				{comingNext.length > 0 && (
					<div>
						<h3>Coming Next</h3>
						<ul>
							{comingNext.slice(0, 1).map((item, index) => (
								<li key={index}>
									{item.vehicle} - {item.nextRoute.startTime} to{" "}
									{item.nextRoute.endTime} at {item.nextRoute.location} in{" "}
									{formatTimeRemaining(item.minutesUntilStart)}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>

			<div className="day-filter">
				{[
					"Sunday",
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
				].map((day) => (
					<button
						key={day}
						className={`day-button ${day === selectedDay ? "active" : ""}`}
						onClick={() => handleDayChange(day)}
					>
						{day}
					</button>
				))}
			</div>

			<div className="transport-list">
				{transportData
					.filter((item) => item.days.includes(selectedDay))
					.map((item) => (
						<div key={item.id} className="transport-card">
							<h2>{item.vehicle}</h2>
							<p>Type: {item.type}</p>
							<p>Arrival Time: {item.arrivalTime}</p>
							<button
								className="book-btn"
								onClick={() => openScheduleModal(item)}
							>
								Show Schedule
							</button>
						</div>
					))}
			</div>

			{scheduleModal && (
				<div className="modal-overlay" onClick={closeScheduleModal}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<h2>{scheduleModal.vehicle} Schedule</h2>
						<ul>
							{scheduleModal.routes.map((route, index) => (
								<li key={index}>
									{route.startTime} to {route.endTime} - {route.location}
								</li>
							))}
						</ul>
						<button className="close-btn" onClick={closeScheduleModal}>
							Close
						</button>
					</div>
				</div>
			)}
			{/* Display CampusControl component */}
			<CampusControl />
		</div>
	);
}

export default TransportationContent;
