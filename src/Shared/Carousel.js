import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const Carousel = ({ images, titles, paragraphs }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [slideDirection, setSlideDirection] = useState(null);

	const handleTransition = useCallback(
		(newIndex, direction) => {
			if (isTransitioning) return;

			setIsTransitioning(true);
			setSlideDirection(direction);
			setCurrentIndex(newIndex);

			setTimeout(() => {
				setIsTransitioning(false);
				setSlideDirection(null);
			}, 500);
		},
		[isTransitioning]
	);

	const nextSlide = useCallback(() => {
		const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
		handleTransition(newIndex, "left");
	}, [currentIndex, images.length, handleTransition]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (!isTransitioning) {
				nextSlide();
			}
		}, 5000);

		return () => clearInterval(intervalId);
	}, [nextSlide, isTransitioning]);

	const getSlideStyle = (index) => {
		const isActive = index === currentIndex;
		let transform = "translateX(100%)";
		let opacity = 0;
		let zIndex = 0;

		if (isActive) {
			transform = "translateX(0)";
			opacity = 1;
			zIndex = 2;
		} else if (
			slideDirection === "left" &&
			index === (currentIndex - 1 + images.length) % images.length
		) {
			transform = "translateX(-100%)";
			opacity = 0;
			zIndex = 1;
		} else if (
			slideDirection === "right" &&
			index === (currentIndex + 1) % images.length
		) {
			transform = "translateX(100%)";
			opacity = 0;
			zIndex = 1;
		}

		return {
			transform,
			opacity,
			zIndex,
			transition: isTransitioning
				? "transform 500ms ease-in-out, opacity 500ms ease-in-out"
				: "none",
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "center",
		};
	};

	return (
		<div className="carousel">
			{images.map((image, index) => (
				<div key={index} style={getSlideStyle(index)}>
					<div
						className={`carousel-background ${isTransitioning ? "fade" : ""}`}
						style={{
							backgroundImage: `url(${image})`,
							opacity: 0.5,
						}}
					/>
					<div className={`carousel-content ${isTransitioning ? "fade" : ""}`}>
						<h2>{titles[index]}</h2>
						<p>{paragraphs[index]}</p>
					</div>
				</div>
			))}

			<div className="carousel-dots">
				{images.map((_, index) => (
					<span
						key={index}
						className={`dot ${index === currentIndex ? "active" : ""}`}
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
