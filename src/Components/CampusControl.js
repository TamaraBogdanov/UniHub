import React, { useState, useEffect } from "react";

const CampusControl = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [bookingTime, setBookingTime] = useState("");
	const [bookingLocation, setBookingLocation] = useState("");
	const [bookings, setBookings] = useState([]);
	const [isServiceActive, setIsServiceActive] = useState(false);

	const locations = [
		"Main Campus",
		"North Residence",
		"South Residence",
		"Library",
		"Student Center",
		"Sports Complex",
	];

	// Generate available time slots between 7 PM and 5 AM (hourly only)
	const generateTimeSlots = () => {
		const slots = [];
		for (let hour = 19; hour <= 23; hour++) {
			slots.push(`${hour}:00`);
		}
		for (let hour = 0; hour <= 5; hour++) {
			slots.push(`${hour.toString().padStart(2, "0")}:00`);
		}
		return slots;
	};

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date();
			setCurrentTime(now);

			// Check if service is active (between 7 PM and 5 AM)
			const hour = now.getHours();
			setIsServiceActive(hour >= 19 || hour < 5);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handleBooking = () => {
		if (!bookingTime || !bookingLocation) {
			alert("Please select both time and location");
			return;
		}

		const newBooking = {
			id: Date.now(),
			time: bookingTime,
			location: bookingLocation,
			timestamp: new Date().toLocaleString(),
		};

		setBookings([...bookings, newBooking]);
		setBookingTime("");
		setBookingLocation("");
	};

	const cancelBooking = (bookingId) => {
		setBookings(bookings.filter((booking) => booking.id !== bookingId));
	};

	return (
		<div className="book-card">
			<div className="book-card-header">
				<h2 className="book-card-title">Campus Control Night Bus Service</h2>
				<div className="text-sm text-gray">
					<p>
						Secure Your Spot For Our Nightly Bus Services, Available From
						19:00pm to 05:00am
					</p>
				</div>
			</div>
			<div className="book-card-content">
				<div className={`alert ${isServiceActive ? "success" : "warning"}`}>
					<div className="alert-description">
						{isServiceActive
							? "Night Bus Service is currently ACTIVE"
							: "Night Bus Service starts at 7:00 PM"}
					</div>
				</div>

				<div className="space-y">
					<div className="booking-form">
						<h3>Book Your Ride</h3>

						<div className="grid">
							<div className="select-container">
								<label>Select Time</label>
								<select
									value={bookingTime}
									onChange={(e) => setBookingTime(e.target.value)}
								>
									<option value="">Choose time</option>
									{generateTimeSlots().map((time) => (
										<option key={time} value={time}>
											{time}
										</option>
									))}
								</select>
							</div>

							<div className="select-container">
								<label>Select Location</label>
								<select
									value={bookingLocation}
									onChange={(e) => setBookingLocation(e.target.value)}
								>
									<option value="">Choose location</option>
									{locations.map((location) => (
										<option key={location} value={location}>
											{location}
										</option>
									))}
								</select>
							</div>
						</div>

						<button
							onClick={handleBooking}
							className="button button-primary w-full"
						>
							Book Night Bus
						</button>
					</div>

					<div className="booking-list">
						<h3>Your Bookings</h3>
						{bookings.length === 0 ? (
							<p className="text-gray">No current bookings</p>
						) : (
							<div>
								{bookings.map((booking) => (
									<div key={booking.id} className="booking-item">
										<div className="booking-info">
											<div className="booking-time">
												{booking.time} - {booking.location}
											</div>
											<div className="text-sm text-gray">
												Booked: {booking.timestamp}
											</div>
										</div>
										<button
											onClick={() => cancelBooking(booking.id)}
											className="button button-destructive"
										>
											Cancel
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CampusControl;
