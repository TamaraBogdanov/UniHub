import React, { useState, useRef, useEffect } from "react";
import {
	Search,
	Book,
	HelpCircle,
	MessageCircle,
	Phone,
	Mail,
	ChevronDown,
	ChevronUp,
	DollarSign,
	CreditCard,
	FileText,
	X,
	Clock,
	CheckCircle,
	Bookmark,
	History,
	ThumbsUp,
	ThumbsDown,
	Tag,
} from "lucide-react";
import "../Styles/Help.css";

// Mock data for help content
const helpCategories = [
	{
		id: 1,
		title: "Getting Started",
		icon: Book,
		articles: [
			{
				id: 101,
				title: "How to Navigate the Student Portal",
				views: 1520,
				tags: ["navigation", "basics"],
				lastUpdated: "2024-03-15",
				helpfulCount: 245,
			},
			{
				id: 102,
				title: "First-Time Login Guide",
				views: 2130,
				tags: ["login", "basics"],
				lastUpdated: "2024-03-14",
				helpfulCount: 312,
			},
			{
				id: 103,
				title: "Understanding Your Dashboard",
				views: 1845,
				tags: ["dashboard", "overview"],
				lastUpdated: "2024-03-13",
				helpfulCount: 189,
			},
		],
	},
	{
		id: 2,
		title: "Registration & Enrollment",
		icon: FileText,
		articles: [
			{
				id: 201,
				title: "Course Registration Process",
				views: 3240,
				tags: ["registration", "courses"],
				lastUpdated: "2024-03-15",
				helpfulCount: 423,
			},
			{
				id: 202,
				title: "Add/Drop Period Guidelines",
				views: 2890,
				tags: ["registration", "deadlines"],
				lastUpdated: "2024-03-14",
				helpfulCount: 256,
			},
			{
				id: 203,
				title: "Prerequisites and Requirements",
				views: 2156,
				tags: ["requirements", "courses"],
				lastUpdated: "2024-03-12",
				helpfulCount: 178,
			},
		],
	},
];

const commonQuestions = {
	Registration: [
		"How do I register for classes?",
		"What's the deadline for course registration?",
		"How do I drop a course?",
		"Where can I find my registration time slot?",
	],
	"Financial Aid": [
		"When is the FAFSA deadline?",
		"How do I check my financial aid status?",
		"What scholarships are available?",
		"How do I accept my financial aid award?",
	],
	"Technical Support": [
		"How do I reset my password?",
		"Why can't I log into my student portal?",
		"How do I update my email address?",
		"What browsers are supported?",
	],
};

// Local storage helpers
const storageHelpers = {
	save: (key, data) => {
		try {
			localStorage.setItem(key, JSON.stringify(data));
		} catch (error) {
			console.error("Error saving to localStorage:", error);
		}
	},
	load: (key, defaultValue = null) => {
		try {
			const data = localStorage.getItem(key);
			return data ? JSON.parse(data) : defaultValue;
		} catch (error) {
			console.error("Error loading from localStorage:", error);
			return defaultValue;
		}
	},
};

function HelpAndSupportContent() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [showChatModal, setShowChatModal] = useState(false);
	const [chatHistory, setChatHistory] = useState([]);
	const [savedArticles, setSavedArticles] = useState([]);
	const [searchSuggestions, setSearchSuggestions] = useState([]);
	const [recentSearches, setRecentSearches] = useState([]);
	const [articleFeedback, setArticleFeedback] = useState({});

	// Load saved data on component mount
	useEffect(() => {
		setChatHistory(storageHelpers.load("chatHistory", []));
		setSavedArticles(storageHelpers.load("savedArticles", []));
		setRecentSearches(storageHelpers.load("recentSearches", []));
		setArticleFeedback(storageHelpers.load("articleFeedback", {}));
	}, []);

	const handleSearch = (e) => {
		const term = e.target.value;
		setSearchTerm(term);

		if (term.length > 2) {
			// Generate suggestions from articles and common questions
			const suggestions = [
				...helpCategories.flatMap((category) =>
					category.articles.filter(
						(article) =>
							article.title.toLowerCase().includes(term.toLowerCase()) ||
							article.tags.some((tag) => tag.includes(term.toLowerCase()))
					)
				),
				...Object.entries(commonQuestions).flatMap(([category, questions]) =>
					questions.filter((q) => q.toLowerCase().includes(term.toLowerCase()))
				),
			].slice(0, 5);

			setSearchSuggestions(suggestions);
		} else {
			setSearchSuggestions([]);
		}
	};

	const handleSaveArticle = (article) => {
		setSavedArticles((prev) => {
			const newSaved = savedArticles.some((saved) => saved.id === article.id)
				? prev.filter((saved) => saved.id !== article.id)
				: [...prev, { ...article, dateSaved: new Date().toISOString() }];
			storageHelpers.save("savedArticles", newSaved);
			return newSaved;
		});
	};

	const handleArticleFeedback = (articleId, isHelpful) => {
		setArticleFeedback((prev) => {
			const newFeedback = {
				...prev,
				[articleId]: {
					helpful: isHelpful,
					timestamp: new Date().toISOString(),
				},
			};
			storageHelpers.save("articleFeedback", newFeedback);
			return newFeedback;
		});
	};

	return (
		<div className="help-content">
			{/* Hero Section */}
			<section className="help-hero">
				<div className="hero-content">
					<h1>How can we help you?</h1>
					<div className="help-search-container">
						<Search size={20} />
						<input
							type="text"
							placeholder="Search for help articles, FAQs, or topics..."
							value={searchTerm}
							onChange={handleSearch}
						/>
						{searchSuggestions.length > 0 && (
							<div className="search-suggestions">
								{searchSuggestions.map((suggestion, index) => (
									<div
										key={index}
										className="suggestion-item"
										onClick={() => {
											if (typeof suggestion === "string") {
												// It's a question
												setShowChatModal(true);
												setChatHistory((prev) => [
													...prev,
													{
														question: suggestion,
														timestamp: new Date().toISOString(),
													},
												]);
											} else {
												// It's an article
												setSelectedCategory(suggestion.categoryId);
												setSearchTerm(suggestion.title);
											}
											setSearchSuggestions([]);
										}}
									>
										{/* {typeof suggestion === "string" ? (
                      <HelpCircle size={16} className="suggestion-icon" />
                    ) : (
                      <FileText size={16} className="suggestion-icon" />
                    )} */}
										<span>
											{typeof suggestion === "string"
												? suggestion
												: suggestion.title}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
					{recentSearches.length > 0 && (
						<div className="recent-searches">
							<Clock size={16} />
							<span>Recent searches:</span>
							{recentSearches.slice(0, 3).map((search, index) => (
								<button
									key={index}
									className="recent-search-tag"
									onClick={() => setSearchTerm(search)}
								>
									{search}
								</button>
							))}
						</div>
					)}
				</div>
			</section>

			{/* Main Content Grid */}
			<div className="form-tabs">
				{/* Left Sidebar - Categories */}
				<aside className="help-categories">
					<h2>Help Topics</h2>
					<nav className="category-nav">
						{helpCategories.map((category) => (
							<div key={category.id}>
								<button
									className={`help-category-button ${
										selectedCategory === category.id ? "active" : ""
									}`}
									onClick={() =>
										setSelectedCategory(
											selectedCategory === category.id ? null : category.id
										)
									}
								>
									<category.icon size={20} />
									<span>{category.title}</span>
									{selectedCategory === category.id ? (
										<ChevronUp size={16} />
									) : (
										<ChevronDown size={16} />
									)}
								</button>
								{selectedCategory === category.id && (
									<div className="category-articles">
										{category.articles.map((article) => (
											<ArticleCard
												key={article.id}
												article={article}
												onSave={() => handleSaveArticle(article)}
												isSaved={savedArticles.some(
													(saved) => saved.id === article.id
												)}
												onFeedback={(isHelpful) =>
													handleArticleFeedback(article.id, isHelpful)
												}
												feedback={articleFeedback[article.id]}
											/>
										))}
									</div>
								)}
							</div>
						))}
					</nav>
				</aside>

				{/* Main Content Area */}
				<main className="help-main">
					<section className="popular-articles">
						<h2>Popular Articles</h2>
						<div className="articles-grid">
							{selectedCategory
								? helpCategories
										.find((c) => c.id === selectedCategory)
										?.articles.map((article) => (
											<ArticleCard
												key={article.id}
												article={article}
												onSave={() => handleSaveArticle(article)}
												isSaved={savedArticles.some(
													(saved) => saved.id === article.id
												)}
												onFeedback={(isHelpful) =>
													handleArticleFeedback(article.id, isHelpful)
												}
												feedback={articleFeedback[article.id]}
											/>
										))
								: helpCategories
										.flatMap((c) => c.articles)
										.sort((a, b) => b.views - a.views)
										.slice(0, 6)
										.map((article) => (
											<ArticleCard
												key={article.id}
												article={article}
												onSave={() => handleSaveArticle(article)}
												isSaved={savedArticles.some(
													(saved) => saved.id === article.id
												)}
												onFeedback={(isHelpful) =>
													handleArticleFeedback(article.id, isHelpful)
												}
												feedback={articleFeedback[article.id]}
											/>
										))}
						</div>
					</section>

					<section className="common-questions">
						<h2>Frequently Asked Questions</h2>
						<div className="questions-grid">
							{Object.entries(commonQuestions).map(([category, questions]) => (
								<div key={category} className="question-category">
									<h3>{category}</h3>
									<div className="questions-list">
										{questions.map((question, index) => (
											<button
												key={index}
												className="question-button"
												onClick={() => {
													setShowChatModal(true);
													setChatHistory((prev) => [
														...prev,
														{
															question,
															timestamp: new Date().toISOString(),
														},
													]);
												}}
											>
												<HelpCircle size={16} />
												<span>{question}</span>
											</button>
										))}
									</div>
								</div>
							))}
						</div>
					</section>
				</main>

				{/* Right Sidebar - Support Options */}
				<aside className="help-support">
					<h2>Need More Help?</h2>
					<div className="support-options">
						<SupportCard
							icon={MessageCircle}
							title="Live Chat"
							description="Chat with our support team"
							action={() => setShowChatModal(true)}
							availability="Available Now"
							status="online"
						/>
						<SupportCard
							icon={Phone}
							title="Call Support"
							description="Call us at +27 (0)12 345 6789"
							action={() => (window.location.href = "tel:+27123456789")}
							availability="Mon-Fri, 8:00-16:00"
							status="available"
						/>
						<SupportCard
							icon={Mail}
							title="Email Support"
							description="Get help via email"
							action={() =>
								(window.location.href = "mailto:support@university.ac.za")
							}
							availability="Response within 24 hours"
							status="available"
						/>
					</div>

					{savedArticles.length > 0 && (
						<div className="saved-articles">
							<h3>Saved Articles</h3>
							<div className="saved-articles-list">
								{savedArticles.map((article) => (
									<div key={article.id} className="saved-article">
										<span>{article.title}</span>
										<button
											className="remove-saved"
											onClick={() => handleSaveArticle(article)}
										>
											<X size={16} />
										</button>
									</div>
								))}
							</div>
						</div>
					)}
				</aside>
			</div>

			{/* Chat Modal */}
			{showChatModal && (
				<ChatModal
					onClose={() => setShowChatModal(false)}
					chatHistory={chatHistory}
					setChatHistory={setChatHistory}
				/>
			)}
		</div>
	);
}

// Helper Components
function ArticleCard({ article, onSave, isSaved, onFeedback, feedback }) {
	return (
		<div className="article-card">
			<div className="article-header">
				<h3>{article.title}</h3>
				<button
					className={`save-button ${isSaved ? "saved" : ""}`}
					onClick={onSave}
				>
					<Bookmark size={16} />
				</button>
			</div>
			<div className="article-meta">
				<span className="views">{article.views} views</span>
				<div className="tags">
					{article.tags.map((tag, index) => (
						<span key={index} className="tag">
							<Tag size={12} />
							{tag}
						</span>
					))}
				</div>
			</div>
			<div className="article-footer">
				<div className="feedback-container">
					{feedback ? (
						<div className="feedback-result">
							<CheckCircle size={16} />
							Thank you for your feedback!
						</div>
					) : (
						<>
							<button
								className="feedback-button"
								onClick={() => onFeedback(true)}
							>
								<ThumbsUp size={16} />
								Helpful
							</button>
							<button
								className="feedback-button"
								onClick={() => onFeedback(false)}
							>
								<ThumbsDown size={16} />
								Not helpful
							</button>
						</>
					)}
				</div>
				<span className="last-updated">
					Updated {new Date(article.lastUpdated).toLocaleDateString()}
				</span>
			</div>
		</div>
	);
}

function SupportCard({
	icon: Icon,
	title,
	description,
	action,
	availability,
	status,
}) {
	return (
		<div className="help-support-card">
			<div className="help-support-icon">
				<Icon size={24} />
			</div>
			<h3>{title}</h3>
			<p>{description}</p>
			<div className="support-status">
				<span className={`status-indicator ${status}`}></span>
				{availability}
			</div>
			<button className="support-action" onClick={action}>
				Get Support
			</button>
		</div>
	);
}

function ChatModal({ onClose, chatHistory, setChatHistory }) {
	const [message, setMessage] = useState("");
	const [currentChat, setCurrentChat] = useState({
		messages: [
			{
				type: "system",
				message: "Welcome to Student Support! How can we help you today?",
				timestamp: new Date().toISOString(),
			},
		],
	});
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [currentChat.messages]);

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (!message.trim()) return;

		const newMessage = {
			type: "user",
			message: message.trim(),
			timestamp: new Date().toISOString(),
		};

		setCurrentChat((prev) => ({
			...prev,
			messages: [...prev.messages, newMessage],
		}));

		// Simulate system response
		setTimeout(() => {
			const systemResponse = {
				type: "system",
				message:
					"Thank you for your message. Our support team will respond shortly.",
				timestamp: new Date().toISOString(),
			};
			setCurrentChat((prev) => ({
				...prev,
				messages: [...prev.messages, systemResponse],
			}));
		}, 1000);

		setMessage("");

		// Save to chat history
		const updatedChat = {
			id: Date.now(),
			timestamp: new Date().toISOString(),
			messages: [...currentChat.messages, newMessage],
		};
		setChatHistory((prev) => {
			const newHistory = [...prev, updatedChat];
			storageHelpers.save("chatHistory", newHistory);
			return newHistory;
		});
	};

	return (
		<div className="chat-modal">
			<div className="chat-container">
				<div className="chat-header">
					<h3>Student Support Chat</h3>
					<button className="help-close-button" onClick={onClose}>
						<X size={20} />
					</button>
				</div>

				<div className="chat-messages">
					{currentChat.messages.map((msg, index) => (
						<div key={index} className={`chat-message ${msg.type}`}>
							<div className="message-content">{msg.message}</div>
							<div className="message-time">
								{new Date(msg.timestamp).toLocaleTimeString()}
							</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>

				<form className="chat-input-container" onSubmit={handleSendMessage}>
					<div className="chat-input-form">
						<input
							type="text"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Type your message..."
							className="chat-input"
						/>
						<button type="submit" className="chat-send-button">
							Send
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

function QuickLinks() {
	const commonLinks = [
		{ title: "Course Registration", icon: FileText },
		{ title: "Financial Aid", icon: DollarSign },
		{ title: "Student Cards", icon: CreditCard },
		{ title: "Exam Information", icon: FileText },
	];

	return (
		<div className="help-quick-links">
			{commonLinks.map((link, index) => (
				<button key={index} className="help-quick-link">
					<link.icon size={16} />
					{link.title}
				</button>
			))}
		</div>
	);
}

function ChatHistoryButton({ onClick, unreadCount = 0 }) {
	return (
		<button className="chat-history-button" onClick={onClick}>
			<History size={20} />
			Chat History
			{unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
		</button>
	);
}

function SavedArticlesButton({ onClick, count = 0 }) {
	return (
		<button className="saved-articles-button" onClick={onClick}>
			<Bookmark size={20} />
			Saved Articles
			{count > 0 && <span className="saved-count">{count}</span>}
		</button>
	);
}

export default HelpAndSupportContent;
