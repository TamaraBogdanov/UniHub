import React, { useState, useEffect } from "react";

const CampusControl = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [bookingTime, setBookingTime] = useState("");
	const [bookingLocation, setBookingLocation] = useState("");
	const [bookings, setBookings] = useState([]);
	const [isServiceActive, setIsServiceActive] = useState(false);
	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const [bookingToCancel, setBookingToCancel] = useState(null);

	const locations = [
		"Main Campus",
		"North Residence",
		"South Residence",
		"Library",
		"Student Center",
		"Sports Complex",
	];

	const generateTimeSlots = () => {
		const slots = [];
		const now = new Date();
		const currentHour = now.getHours();

		for (let hour = 19; hour <= 23; hour++) {
			if (hour >= currentHour) slots.push(`${hour}:00`);
		}
		for (let hour = 0; hour <= 5; hour++) {
			if (hour >= currentHour || hour < 5)
				slots.push(`${hour.toString().padStart(2, "0")}:00`);
		}
		return slots;
	};

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date();
			setCurrentTime(now);

			const hour = now.getHours();
			setIsServiceActive(hour >= 19 || hour < 5);
			checkBookingExpiration();
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		// Load booking from local storage
		const savedBookings = JSON.parse(localStorage.getItem("userBookings"));
		if (savedBookings && savedBookings.length > 0) {
			setBookings(savedBookings);
		}
	}, []);

	const checkBookingExpiration = () => {
		const now = new Date();
		const updatedBookings = bookings.filter((booking) => {
			const [hour] = booking.time.split(":").map(Number);
			const bookingDate = new Date(now);
			bookingDate.setHours(hour, 0, 0, 0);
			return bookingDate > now;
		});

		if (updatedBookings.length !== bookings.length) {
			setBookings(updatedBookings);
			localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
		}
	};

	const handleBookingRequest = () => {
		if (bookings.length > 0) {
			alert("You can only book one ride at a time.");
			return;
		}

		if (!bookingTime || !bookingLocation) {
			alert("Please select both time and location.");
			return;
		}

		setShowConfirmationModal(true);
	};

	const confirmBooking = () => {
		const newBooking = {
			id: Date.now(),
			time: bookingTime,
			location: bookingLocation,
			timestamp: new Date().toLocaleString(),
		};

		const updatedBookings = [...bookings, newBooking];
		setBookings(updatedBookings);
		setBookingTime("");
		setBookingLocation("");
		setShowConfirmationModal(false);
		setShowSuccessMessage(true);
		setConfirmationMessage(
			`Booking confirmed for ${newBooking.time} at ${newBooking.location}.`
		);

		// Save booking to local storage
		localStorage.setItem("userBookings", JSON.stringify(updatedBookings));

		setTimeout(() => setShowSuccessMessage(false), 3000);
	};

	const initiateCancelBooking = (booking) => {
		setBookingToCancel(booking);
		setShowCancelModal(true);
	};

	const confirmCancelBooking = () => {
		const updatedBookings = bookings.filter(
			(booking) => booking.id !== bookingToCancel.id
		);
		setBookings(updatedBookings);
		setShowCancelModal(false);
		setBookingToCancel(null);

		// Update local storage
		localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
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

						{bookings.length > 0 && (
							<p className="text-warning">
								You have an active booking and cannot make another.
							</p>
						)}

						<div className="grid">
							<div className="select-container">
								<label>Select Time</label>
								<select
									value={bookingTime}
									onChange={(e) => setBookingTime(e.target.value)}
									disabled={bookings.length > 0}
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
									disabled={bookings.length > 0}
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
							onClick={handleBookingRequest}
							className="button button-primary w-full"
							disabled={bookings.length > 0}
						>
							Book Night Bus
						</button>
					</div>

					{showSuccessMessage && (
						<div className="success-message">
							<p>{confirmationMessage}</p>
						</div>
					)}

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
											onClick={() => initiateCancelBooking(booking)}
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

			{/* Confirmation Modal for Booking */}
			{showConfirmationModal && (
				<div className="modal-overlay">
					<div className="modal-content">
						<h3>Confirm Your Booking</h3>
						<p>
							Confirm booking for {bookingTime} at {bookingLocation}?
						</p>
						<div className="modal-actions">
							<button
								onClick={confirmBooking}
								className="button button-primary"
							>
								Confirm
							</button>
							<button
								onClick={() => setShowConfirmationModal(false)}
								className="button button-secondary"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Cancellation Confirmation Modal */}
			{showCancelModal && (
				<div className="modal-overlay">
					<div className="modal-content">
						<h3>Confirm Cancellation</h3>
						<p>
							Are you sure you want to cancel the booking for{" "}
							{bookingToCancel.time} at {bookingToCancel.location}?
						</p>
						<div className="modal-actions">
							<button
								onClick={confirmCancelBooking}
								className="button button-destructive"
							>
								Confirm
							</button>
							<button
								onClick={() => setShowCancelModal(false)}
								className="button button-secondary"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CampusControl;
