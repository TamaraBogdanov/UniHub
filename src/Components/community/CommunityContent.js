import React, { useEffect, useState } from "react";
import "../../Styles/CommunityPage.css";
import CreateListingModal from "./CreateListing";
import ImageModal from "./ImageModal";
import ContactSellerModal from "./ContactSeller";

const CommunityContent = () => {
	const [activeTab, setActiveTab] = useState("marketplace");
	const [selectedDiscussion, setSelectedDiscussion] = useState(null);
	const discussionRef = React.useRef(null);
	const [newComment, setNewComment] = useState("");
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [isContactModalOpen, setIsContactModalOpen] = useState(false);
	const [selectedSeller, setSelectedSeller] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);

	const getInitialListings = () => {
		return [
			{
				id: 1,
				title: "Calculus Textbook",
				price: 250,
				seller: "Alex",
				type: "Books",
				image: "./images/calc.jpg",
			},
			{
				id: 2,
				title: "Scientific Calculator",
				price: 300,
				seller: "Sarah",
				type: "Electronics",
				image: "./images/calculator.jpg",
			},
			{
				id: 3,
				title: "Study Desk",
				price: 500,
				seller: "Mike",
				type: "Furniture",
				image: "./images/desk.jpg",
			},
		];
	};

	const [listings, setListings] = useState(getInitialListings());

	const [events] = useState([
		{
			id: 1,
			title: "Study Group: Advanced Physics",
			date: "2024-11-01",
			location: "Library Room 204",
		},
		{
			id: 2,
			title: "Campus Volunteer Day",
			date: "2024-11-05",
			location: "Main Quad",
		},
	]);

	const [discussions, setDiscussions] = useState([
		{
			id: 1,
			title: "Tips for Remote Learning",
			author: "Emma",
			comments: 15,
			content:
				"Remote learning can be challenging, but with the right strategies, you can make it work effectively. Here are some key tips I've gathered from my experience:",
			tips: [
				"Create a dedicated study space",
				"Stick to a regular schedule",
				"Take active breaks every 45 minutes",
				"Use productivity apps to stay focused",
				"Join virtual study groups",
			],
			commentsList: [
				{
					id: 1,
					author: "Michael",
					text: "The dedicated study space tip really helped me! I converted a corner of my room into a mini office and my productivity doubled.",
					likes: 12,
					timestamp: "2 days ago",
				},
				{
					id: 2,
					author: "Sophie",
					text: "I'd add that having good lighting is crucial for remote learning. I got a desk lamp and it helped reduce eye strain during long study sessions.",
					likes: 8,
					timestamp: "1 day ago",
				},
				{
					id: 3,
					author: "David",
					text: "The Pomodoro Technique (25 min work, 5 min break) works great for me. I use the Forest app to stay focused.",
					likes: 15,
					timestamp: "12 hours ago",
				},
			],
		},
		{
			id: 2,
			title: "Best Study Spots on Campus",
			author: "John",
			comments: 23,
			content:
				"After exploring every corner of our campus, I've found some amazing study spots that I want to share with everyone.",
			locations: [
				"Third floor library - silent study area",
				"Science building café",
				"Garden courtyard",
				"Student union building rooftop",
				"Engineering building study pods",
			],
			commentsList: [
				{
					id: 1,
					author: "Lisa",
					text: "The garden courtyard is amazing during spring! Just remember to bring sunscreen.",
					likes: 7,
					timestamp: "3 days ago",
				},
				{
					id: 2,
					author: "Alex",
					text: "Don't forget about the 24/7 computer lab in the basement of the library. It's a lifesaver during finals!",
					likes: 19,
					timestamp: "2 days ago",
				},
			],
		},
	]);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const handleCreateListing = (newListing) => {
		setListings((prevListings) => [newListing, ...prevListings]);
	};

	const handleImageClick = (image) => {
		setSelectedImage(image);
		setIsImageModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsImageModalOpen(false);
		setSelectedImage(null);
	};

	// Add useEffect to save listings to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem("listings", JSON.stringify(listings));
	}, [listings]);

	// Add delete listing handler
	const handleDeleteListing = (listingId) => {
		setListings((prevListings) =>
			prevListings.filter((listing) => listing.id !== listingId)
		);
	};
	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				discussionRef.current &&
				!discussionRef.current.contains(event.target)
			) {
				setSelectedDiscussion(null);
			}
		};

		// Only add the event listener if a discussion is selected
		if (selectedDiscussion) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [selectedDiscussion]);

	const handleDiscussionClick = (discussion) => {
		if (selectedDiscussion?.id === discussion.id) {
			setSelectedDiscussion(null);
		} else {
			setSelectedDiscussion(discussion);
		}
	};

	const handleAddComment = (discussionId) => {
		if (!newComment.trim()) return;

		const updatedDiscussions = discussions.map((discussion) => {
			if (discussion.id === discussionId) {
				return {
					...discussion,
					comments: discussion.comments + 1,
					commentsList: [
						{
							id: discussion.commentsList.length + 1,
							author: "You",
							text: newComment,
							likes: 0,
							timestamp: "Just now",
						},
						...discussion.commentsList,
					],
				};
			}
			return discussion;
		});

		setDiscussions(updatedDiscussions);
		setNewComment("");
	};

	return (
		<div className="community-page">
			<header>
				<h1 className="page-title">Student Community Hub</h1>
				<nav className="nav-tabs">
					<button
						className={`nav-button ${
							activeTab === "marketplace" ? "active" : ""
						}`}
						onClick={() => setActiveTab("marketplace")}
					>
						Marketplace
					</button>
					<button
						className={`nav-button ${activeTab === "events" ? "active" : ""}`}
						onClick={() => setActiveTab("events")}
					>
						Events
					</button>
					<button
						className={`nav-button ${
							activeTab === "discussions" ? "active" : ""
						}`}
						onClick={() => setActiveTab("discussions")}
					>
						Discussions
					</button>
				</nav>
			</header>

			<main>
				{activeTab === "marketplace" && (
					<section>
						<section className="discussions-section">
							<div className="section-header">
								<h2 className="section-title">Student Marketplace</h2>
								<button
									className="create-button"
									onClick={() => setIsCreateModalOpen(true)}
								>
									+ New Listing
								</button>
							</div>
							<div className="listings-container">
								{listings.map((listing) => (
									<article key={listing.id} className="listing-card">
										<div className="listing-content">
											<img
												src={listing.image}
												alt={listing.title}
												className="listing-image"
												onClick={() => handleImageClick(listing.image)}
											/>
											<div className="listing-details">
												<h3 className="listing-title">{listing.title}</h3>
												<p className="listing-seller">
													Seller: {listing.seller}
												</p>
												<p className="listing-price">R{listing.price}</p>
												<span className="listing-tag">{listing.type}</span>
												<div className="listing-actions">
													<button
														className="contact-seller"
														onClick={(e) => {
															e.stopPropagation();
															setSelectedSeller(listing.seller);
															setSelectedItem(listing.title);
															setIsContactModalOpen(true);
														}}
													>
														Contact Seller
													</button>
													<button className="save-listing">
														Save for Later
													</button>
													{listing.seller === "You" && (
														<button
															className="delete-listing"
															onClick={(e) => {
																e.stopPropagation();
																if (
																	window.confirm(
																		"Are you sure you want to delete this listing?"
																	)
																) {
																	handleDeleteListing(listing.id);
																}
															}}
														>
															Delete Listing
														</button>
													)}
												</div>
											</div>
										</div>
									</article>
								))}
							</div>
						</section>
					</section>
				)}

				{activeTab === "events" && (
					<section>
						<section className="discussions-section">
							<div className="section-header">
								<h2 className="section-title">Campus Events</h2>
								<button className="create-button">+ Create Event</button>
							</div>
							<div className="events-list">
								{events.map((event) => (
									<article key={event.id} className="event-card">
										<h3 className="event-title">{event.title}</h3>
										<p className="event-info">Date: {event.date}</p>
										<p className="event-info">Location: {event.location}</p>
										<button className="join-button">Join Event</button>
									</article>
								))}
							</div>
						</section>
					</section>
				)}

				{activeTab === "discussions" && (
					<section className="discussions-section">
						<div className="section-header">
							<h2 className="section-title">Community Discussions</h2>
							<button className="create-button">+ New Discussion</button>
						</div>
						<div className="discussions-list">
							{discussions.map((discussion) => (
								<div key={discussion.id} className="discussion-container">
									<article
										ref={
											selectedDiscussion?.id === discussion.id
												? discussionRef
												: null
										}
										className={`discussion-card ${
											selectedDiscussion?.id === discussion.id ? "expanded" : ""
										}`}
										onClick={() => handleDiscussionClick(discussion)}
									>
										<div className="discussion-header">
											<h3 className="discussion-title">{discussion.title}</h3>
											<div className="discussion-meta">
												<span className="discussion-author">
													Posted by: {discussion.author}
												</span>
												<span className="discussion-comments">
													{discussion.comments} comments
												</span>
											</div>
										</div>

										{selectedDiscussion?.id === discussion.id && (
											<div
												className="discussion-expanded"
												onClick={(e) => e.stopPropagation()}
											>
												<p className="discussion-content">
													{discussion.content}
												</p>

												{discussion.tips && (
													<div className="tips-section">
														<h4>Key Tips:</h4>
														<ul className="tips-list">
															{discussion.tips.map((tip, index) => (
																<li key={index} className="tip-item">
																	{tip}
																</li>
															))}
														</ul>
													</div>
												)}

												{discussion.locations && (
													<div className="locations-section">
														<h4>Recommended Locations:</h4>
														<ul className="locations-list">
															{discussion.locations.map((location, index) => (
																<li key={index} className="location-item">
																	{location}
																</li>
															))}
														</ul>
													</div>
												)}

												<div className="comments-section">
													<h4>Comments</h4>
													<div className="comment-input-container">
														<input
															type="text"
															value={newComment}
															onChange={(e) => setNewComment(e.target.value)}
															placeholder="Add a comment..."
															className="comment-input"
														/>
														<button
															className="comment-submit"
															onClick={() => handleAddComment(discussion.id)}
														>
															Post
														</button>
													</div>

													<div className="comments-list">
														{discussion.commentsList.map((comment) => (
															<div key={comment.id} className="comment-card">
																<div className="comment-header">
																	<span className="comment-author">
																		{comment.author}
																	</span>
																	<span className="comment-timestamp">
																		{comment.timestamp}
																	</span>
																</div>
																<p className="comment-text">{comment.text}</p>
																<div className="comment-footer">
																	<span className="comment-likes">
																		♥ {comment.likes} likes
																	</span>
																</div>
															</div>
														))}
													</div>
												</div>
											</div>
										)}
									</article>
								</div>
							))}
						</div>
					</section>
				)}
				<CreateListingModal
					isOpen={isCreateModalOpen}
					onClose={() => setIsCreateModalOpen(false)}
					onCreateListing={handleCreateListing}
				/>

				{/* Render the ImageModal if an image is selected */}
				{isImageModalOpen && (
					<ImageModal image={selectedImage} onClose={handleCloseModal} />
				)}

				<ContactSellerModal
					isOpen={isContactModalOpen}
					onClose={() => setIsContactModalOpen(false)}
					seller={selectedSeller}
					itemTitle={selectedItem}
				/>
			</main>
		</div>
	);
};

export default CommunityContent;
