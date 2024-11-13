import React from "react";
import { X } from "lucide-react";

const CreateListingModal = ({ isOpen, onClose, onCreateListing }) => {
	const [formData, setFormData] = React.useState({
		title: "",
		price: "",
		type: "Books",
		description: "",
		image: null,
		imagePreview: "/api/placeholder/150/150", // Update this line to use a placeholder
	});

	const categoryOptions = [
		"Books",
		"Electronics",
		"Furniture",
		"Clothing",
		"Other",
	];

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData((prev) => ({
				...prev,
				image: file,
				imagePreview: URL.createObjectURL(file),
			}));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newListing = {
			id: Date.now(),
			title: formData.title,
			price: parseFloat(formData.price),
			seller: "You",
			type: formData.type,
			image: formData.imagePreview || "/api/placeholder/150/150",
			description: formData.description,
		};

		onCreateListing(newListing);
		onClose();
		setFormData({
			title: "",
			price: "",
			type: "Books",
			description: "",
			image: null,
			imagePreview: null,
		});
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<div className="modal-header">
					<h2>Create New Listing</h2>
					<button onClick={onClose} className="close-button">
						<X className="close-icon" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="listing-form">
					<div className="form-group">
						<label>Title</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleInputChange}
							required
							className="form-input"
						/>
					</div>

					<div className="form-group">
						<label>Price ($)</label>
						<input
							type="number"
							name="price"
							value={formData.price}
							onChange={handleInputChange}
							required
							min="0"
							step="0.01"
							className="form-input"
						/>
					</div>

					<div className="form-group">
						<label>Category</label>
						<select
							name="type"
							value={formData.type}
							onChange={handleInputChange}
							className="form-input"
						>
							{categoryOptions.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>

					<div className="form-group">
						<label>Description</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							className="form-input"
							rows="3"
						/>
					</div>

					<div className="form-group">
						<label>Image</label>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="form-input"
						/>
						{formData.imagePreview && (
							<div className="image-preview">
								<img src={formData.imagePreview} alt="Preview" />
							</div>
						)}
					</div>

					<button type="submit" className="submit-button">
						Create Listing
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateListingModal;
