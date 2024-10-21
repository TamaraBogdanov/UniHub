// Carousel.js
import React, { useState } from "react";
import PropTypes from "prop-types";

const Carousel = ({ images, titles, paragraphs }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	return (
		<div className="carousel">
			<div
				className="carousel-background"
				style={{ backgroundImage: `url(${images[currentIndex]})` }}
			/>
			<div className="carousel-content">
				<h2>{titles[currentIndex]}</h2>
				{currentIndex === 0 && paragraphs.length > 0 && <p>{paragraphs[0]}</p>}
			</div>
			<div className="carousel-arrow left" onClick={prevSlide}>
				&#10094; {/* Left arrow */}
			</div>
			<div className="carousel-arrow right" onClick={nextSlide}>
				&#10095; {/* Right arrow */}
			</div>

			{/* Dots Indicator */}
			<div className="carousel-dots">
				{images.map((_, index) => (
					<span
						key={index}
						className={`dot ${index === currentIndex ? "active" : ""}`}
						onClick={() => setCurrentIndex(index)}
					/>
				))}
			</div>
		</div>
	);
};

Carousel.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string).isRequired,
	titles: PropTypes.arrayOf(PropTypes.string).isRequired,
	paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;
