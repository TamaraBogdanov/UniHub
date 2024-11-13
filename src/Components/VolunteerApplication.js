import React, { useState } from "react";

const VolunteerApplicationForm = ({ opportunity }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add your form submission logic here
		console.log("Volunteer application submitted:", { name, email, message });
		// Reset form fields
		setName("");
		setEmail("");
		setMessage("");
	};

	return (
		<div className="volunteer-application-form">
			<div className="form-header">
				<h2 className="form-title">Apply for "{opportunity.title}"</h2>
			</div>
			<form className="form-content" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						type="text"
						id="name"
						className="form-input"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="form-input"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="message" className="form-label">
						Why are you interested in this opportunity?
					</label>
					<textarea
						id="message"
						className="form-textarea"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required
					></textarea>
				</div>
				<div className="form-actions">
					<button type="submit" className="form-submit-button">
						Submit Application
					</button>
				</div>
			</form>
		</div>
	);
};

export default VolunteerApplicationForm;
