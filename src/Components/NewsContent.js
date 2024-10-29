import React, { useState, useEffect } from "react";
import "../Styles/News.css";
import { Search, ChevronDown, ThumbsUp } from "lucide-react";
import {
	enhancedMockNewsData,
	newsSubcategories,
} from "../Mockdata/detailedMockData";
import NewsModal from "./NewsModal";

function NewsContent() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory] = useState("All");
	const [selectedSubcategory, setSelectedSubcategory] = useState("All");
	const [sortBy, setSortBy] = useState("date");
	const [expandedNewsId, setExpandedNewsId] = useState(null);
	const [modalNews, setModalNews] = useState(null);
	const [newsData, setNewsData] = useState(enhancedMockNewsData);
	const [visibleNews, setVisibleNews] = useState(6);

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const filteredNews = newsData
		.filter(
			(news) =>
				news.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
				(selectedCategory === "All" || news.category === selectedCategory) &&
				(selectedSubcategory === "All" ||
					news.subcategory === selectedSubcategory)
		)
		.sort((a, b) => {
			if (sortBy === "date") {
				return new Date(b.date) - new Date(a.date);
			} else if (sortBy === "likes") {
				return b.likes - a.likes;
			} else {
				return a.title.localeCompare(b.title);
			}
		});

	const featuredNews = filteredNews.filter((news) => news.featured);

	const toggleNewsExpansion = (id) => {
		setExpandedNewsId(expandedNewsId === id ? null : id);
	};

	const openModal = (news) => {
		setModalNews(news);
	};

	const closeModal = () => {
		setModalNews(null);
	};

	const handleLike = (id) => {
		setNewsData(
			newsData.map((news) =>
				news.id === id ? { ...news, likes: (news.likes || 0) + 1 } : news
			)
		);
	};

	const loadMoreNews = () => {
		setVisibleNews((prevVisible) => prevVisible + 6);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop !==
				document.documentElement.offsetHeight
			)
				return;
			loadMoreNews();
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="news-content">
			<h2>Featured Headlines</h2>
			<div className="featured-news">
				{featuredNews.map((news) => (
					<div key={news.id} className="featured-news-card">
						<img
							src={news.image}
							alt={news.title}
							className="featured-news-image"
						/>
						<div className="featured-news-content">
							<div className="featured-news-icon">{news.icon}</div>
							<div className="featured-news-info">
								<h3>{news.title}</h3>
								<p>
									{news.category} - {news.subcategory}
								</p>
								<p className="news-date">{news.date}</p>
								<p>
									<strong>Author:</strong> {news.author}
								</p>
								<p>
									<strong>Publisher:</strong> {news.publisher}
								</p>
								<p>{news.content}</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<h2>Current Headlines</h2>
			<div className="news-controls">
				<div className="search-bar">
					<Search size={20} />
					<input
						type="text"
						placeholder="Search news..."
						value={searchTerm}
						onChange={handleSearch}
					/>
				</div>
				<select
					value={selectedSubcategory}
					onChange={(e) => setSelectedSubcategory(e.target.value)}
					className="subcategory-select"
				>
					{newsSubcategories.map((subcategory) => (
						<option key={subcategory} value={subcategory}>
							{subcategory}
						</option>
					))}
				</select>
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
					className="sort-select"
				>
					<option value="date">Sort by Date</option>
					<option value="title">Sort by Title</option>
				</select>
			</div>

			<div className="news-grid">
				{filteredNews.slice(0, visibleNews).map((news) => (
					<div key={news.id} className="news-card">
						<div className="news-icon" onClick={() => openModal(news)}>
							{news.icon}
						</div>
						<div className="news-info" onClick={() => openModal(news)}>
							<h3>{news.title}</h3>
							<p>
								{news.category} - {news.subcategory}
							</p>
							<p className="news-date">{news.date}</p>
						</div>
						<div className="news-actions">
							<button
								className="like-button"
								onClick={() => handleLike(news.id)}
							>
								<ThumbsUp size={16} />
								<span>{news.likes || 0}</span>
							</button>
							<ChevronDown
								className={`expand-icon ${
									expandedNewsId === news.id ? "expanded" : ""
								}`}
								onClick={() => toggleNewsExpansion(news.id)}
							/>
						</div>
						{expandedNewsId === news.id && (
							<div className="news-details">
								<p>
									<strong>Author:</strong> {news.author}
								</p>
								<p>
									<strong>Publisher:</strong> {news.publisher}
								</p>
								<p>
									{news.content.substring(0, 100)}...{" "}
									<span className="read-more" onClick={() => openModal(news)}>
										Read more
									</span>
								</p>
							</div>
						)}
					</div>
				))}
			</div>

			{visibleNews < filteredNews.length && (
				<button className="load-more-button" onClick={loadMoreNews}>
					Load More
				</button>
			)}

			<NewsModal news={modalNews} onClose={closeModal} />
		</div>
	);
}

export default NewsContent;
