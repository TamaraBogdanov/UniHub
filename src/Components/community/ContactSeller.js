import React, { useState } from "react";
import "../community/Styles/ContactSeller.css";

const ContactSellerModal = ({ isOpen, onClose, seller, itemTitle }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Here you would typically send the message to your backend
		alert(`Message sent to ${seller} about "${itemTitle}"`);
		setFormData({ name: "", email: "", message: "" });
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="contact-modal-overlay">
			<div className="contact-modal-content">
				<div className="contact-modal-header">
					<h2>Contact Seller</h2>
					<button className="contact-close-button" onClick={onClose}>
						&times;
					</button>
				</div>

				<div className="contact-modal-body">
					<p className="contact-item-info">
						Item: <span>{itemTitle}</span>
						<br />
						Seller: <span>{seller}</span>
					</p>

					<form onSubmit={handleSubmit} className="contact-form">
						<div className="contact-form-group">
							<label htmlFor="name">Your Name:</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="contact-form-group">
							<label htmlFor="email">Your Email:</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="contact-form-group">
							<label htmlFor="message">Message:</label>
							<textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								required
								rows="4"
							/>
						</div>

						<div className="contact-form-actions">
							<button
								type="button"
								className="contact-cancel-button"
								onClick={onClose}
							>
								Cancel
							</button>
							<button type="submit" className="contact-send-button">
								Send Message
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ContactSellerModal;
