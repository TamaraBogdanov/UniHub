import React, { useState, useEffect } from "react";
import "../Styles/Events.css";
import { transportData } from "../Mockdata/TransportData";
import "../Styles/Transportation.css";

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
	const [expandedCard, setExpandedCard] = useState(null);
	const [currentTime, setCurrentTime] = useState(new Date());
	const [availableNow, setAvailableNow] = useState([]);
	const [comingNext, setComingNext] = useState([]);

	// Update current time every minute
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 60000);
		return () => clearInterval(timer);
	}, []);

	// Helper function to check if a vehicle is available now
	const isVehicleAvailableNow = (startTime, endTime) => {
		const [startHour, startMinute] = startTime.split(":").map(Number);
		const [endHour, endMinute] = endTime.split(":").map(Number);
		const currentHour = currentTime.getHours();
		const currentMinute = currentTime.getMinutes();

		const isAfterStart =
			currentHour > startHour ||
			(currentHour === startHour && currentMinute >= startMinute);
		const isBeforeEnd =
			currentHour < endHour ||
			(currentHour === endHour && currentMinute <= endMinute);

		return isAfterStart && isBeforeEnd;
	};

	// Update available vehicles and coming next based on current time and current day only
	useEffect(() => {
		const currentHour = currentTime.getHours();
		const currentMinute = currentTime.getMinutes();

		// Filter vehicles available now for current day only
		const nowAvailable = transportData.filter(
			(item) =>
				item.days.includes(currentDay) &&
				item.routes.some((route) =>
					isVehicleAvailableNow(route.startTime, route.endTime)
				)
		);

		// Filter vehicles coming next for current day only
		const upcomingVehicles = [];
		transportData.forEach((item) => {
			if (item.days.includes(currentDay)) {
				item.routes.forEach((route) => {
					if (!isVehicleAvailableNow(route.startTime, route.endTime)) {
						const [startHour, startMinute] = route.startTime
							.split(":")
							.map(Number);
						if (
							startHour > currentHour ||
							(startHour === currentHour && startMinute > currentMinute)
						) {
							upcomingVehicles.push({ ...item, nextRoute: route });
						}
					}
				});
			}
		});

		// Sort upcoming vehicles by time
		upcomingVehicles.sort((a, b) => {
			const [hourA, minuteA] = a.nextRoute.startTime.split(":").map(Number);
			const [hourB, minuteB] = b.nextRoute.startTime.split(":").map(Number);
			return hourA - hourB || minuteA - minuteB;
		});

		setAvailableNow(nowAvailable);
		setComingNext(upcomingVehicles);
	}, [currentTime, currentDay]);

	const handleDayChange = (day) => {
		setSelectedDay(day);
	};

	const toggleExpandCard = (id) => {
		setExpandedCard(expandedCard === id ? null : id);
	};

	const getTimeRemaining = (startTime) => {
		const [startHour, startMinute] = startTime.split(":").map(Number);
		const startDateTime = new Date();
		startDateTime.setHours(startHour, startMinute, 0, 0);
		const timeDiff = startDateTime - currentTime;
		const totalMinutes = Math.floor(timeDiff / (1000 * 60));
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return [hours, minutes];
	};

	return (
		<div className="transportation-page">
			<div className="header">
				<h1>Transportation Arrivals</h1>
				<p className="current-time">
					Current time:{" "}
					{currentTime.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
				<p className="current-date">{currentDate}</p>
			</div>

			{/* Real-time info section - Shows data only for current day */}
			<div className="real-time-info">
				<h2>Today's Schedule ({currentDay})</h2>
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
							{comingNext.slice(0, 1).map((item, index) => {
								const [hours, minutes] = getTimeRemaining(
									item.nextRoute.startTime
								);
								return (
									<li key={index}>
										{item.vehicle} - {item.nextRoute.startTime} to{" "}
										{item.nextRoute.endTime} at {item.nextRoute.location} in{" "}
										{hours > 0 ? `${hours} hour(s) ` : ""}
										{minutes} minute(s)
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</div>

			{/* Day filter section - Controls only the transport cards below */}
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

			{/* Transport cards - Filtered by selected day */}
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
								onClick={() => toggleExpandCard(item.id)}
							>
								{expandedCard === item.id ? "Hide Schedule" : "Show Schedule"}
							</button>

							{expandedCard === item.id && (
								<div className="schedule">
									<h3>Schedule:</h3>
									<ul>
										{item.routes.map((route, index) => (
											<li key={index}>
												{route.startTime} to {route.endTime} - {route.location}
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					))}
			</div>

			<div className="order-cab">
				<button className="order-cab-btn">Order Cab</button>
			</div>
		</div>
	);
}

export default TransportationContent;
