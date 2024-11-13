import React from "react";
import "../community/Styles/ImageModal.css";

const ImageModal = ({ image, onClose }) => {
	if (!image) return null;

	return (
		<div className="image-overlay" onClick={onClose}>
			<div className="image-content" onClick={(e) => e.stopPropagation()}>
				<img src={image} alt="Selected" className="modal-image" />
				<button onClick={onClose} className="image-close-button">
					X
				</button>
			</div>
		</div>
	);
};

export default ImageModal;
