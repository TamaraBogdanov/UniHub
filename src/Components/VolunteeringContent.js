import React, { useState } from "react";
import {
	Search,
	Calendar,
	Users,
	MapPin,
	ArrowRight,
	Award,
	Clock,
	BookOpen,
	Heart,
	Globe,
} from "lucide-react";

import "../Styles/Volunteering.css";
import VolunteerTracking from "./VolunteerTracking";

const VolunteerPage = () => {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [searchQuery] = useState("");
	const [activeView, setActiveView] = useState("opportunities");

	const categories = [
		{ id: "all", name: "All Opportunities", icon: Globe },
		{ id: "education", name: "Education", icon: BookOpen },
		{ id: "community", name: "Community Outreach", icon: Heart },
		{ id: "campus", name: "Campus Events", icon: MapPin },
		{ id: "health", name: "Health & Wellness", icon: Award },
		{ id: "research", name: "Research Aid", icon: Search },
	];

	const benefits = [
		{
			title: "Academic Credits",
			description: "Earn Service Learning credits towards your degree",
			icon: BookOpen,
		},
		{
			title: "Skills Development",
			description: "Gain practical experience and leadership skills",
			icon: Award,
		},
		{
			title: "Community Impact",
			description: "Make a real difference in South African communities",
			icon: Heart,
		},
	];

	const volunteerOpportunities = [
		{
			id: 1,
			title: "Tutorial Support Programme",
			category: "education",
			location: "Wits Main Campus",
			date: "Ongoing",
			participants: "20 needed",
			description:
				"Help fellow students excel in their studies by becoming a peer tutor in various subjects.",
			image: "/api/placeholder/400/200",
			hours: "5-10 hours/week",
			faculty: "All Faculties",
		},
		{
			id: 2,
			title: "Soweto Community Garden Project",
			category: "community",
			location: "Soweto",
			date: "Every Saturday",
			participants: "15 needed",
			description:
				"Join us in maintaining community gardens and teaching sustainable farming practices.",
			image: "/api/placeholder/400/200",
			hours: "4 hours/week",
			faculty: "Science, Agriculture",
		},
		{
			id: 3,
			title: "Wits Open Day Guides",
			category: "campus",
			location: "All Wits Campuses",
			date: "July 2024",
			participants: "50 needed",
			description:
				"Guide prospective students and their families during the annual Wits Open Day.",
			image: "/api/placeholder/400/200",
			hours: "8 hours/day",
			faculty: "All Faculties",
		},
		{
			id: 4,
			title: "Alexandra Health Awareness Campaign",
			category: "health",
			location: "Alexandra Township",
			date: "Monthly",
			participants: "10 needed",
			description:
				"Assist in health education and awareness programs in partnership with local clinics.",
			image: "/api/placeholder/400/200",
			hours: "6 hours/month",
			faculty: "Health Sciences",
		},
		{
			id: 5,
			title: "COVID-19 Research Support",
			category: "research",
			location: "Wits Medical School",
			date: "Ongoing",
			participants: "5 needed",
			description:
				"Support ongoing COVID-19 research projects by assisting with data collection and analysis.",
			image: "/api/placeholder/400/200",
			hours: "10 hours/week",
			faculty: "Health Sciences, Science",
		},
		{
			id: 6,
			title: "Tshimologong Digital Skills Workshop",
			category: "education",
			location: "Braamfontein",
			date: "Weekends",
			participants: "8 needed",
			description:
				"Teach basic digital skills to youth from surrounding communities at Wits Digital Innovation Hub.",
			image: "/api/placeholder/400/200",
			hours: "4 hours/weekend",
			faculty: "Engineering, Science",
		},
		{
			id: 7,
			title: "Origins Centre Tour Guide",
			category: "campus",
			location: "Origins Centre Museum",
			date: "Flexible",
			participants: "6 needed",
			description:
				"Guide visitors through South Africa's remarkable journey of human development at the Origins Centre.",
			image: "/api/placeholder/400/200",
			hours: "Flexible",
			faculty: "Science, Humanities",
		},
		{
			id: 8,
			title: "Hillbrow Youth Mentorship",
			category: "community",
			location: "Hillbrow",
			date: "Weekday Afternoons",
			participants: "12 needed",
			description:
				"Mentor high school students in Hillbrow, helping with academics and life skills.",
			image: "/api/placeholder/400/200",
			hours: "3 hours/week",
			faculty: "All Faculties",
		},
	];

	const filteredOpportunities = volunteerOpportunities
		.filter(
			(opp) => selectedCategory === "all" || opp.category === selectedCategory
		)
		.filter(
			(opp) =>
				searchQuery === "" ||
				opp.title.toLowerCase().includes(searchQuery.toLowerCase())
		);

	return (
		<div className="container">
			{/* Benefits Section - Always Visible */}
			<div className="benefits-section">
				<h2>Why Volunteer at Wits?</h2>
				<div className="benefits-grid">
					{benefits.map((benefit, index) => (
						<div key={index} className="benefit-card">
							<benefit.icon className="benefit-icon" />
							<h3>{benefit.title}</h3>
							<p>{benefit.description}</p>
						</div>
					))}
				</div>
			</div>

			{/* View Toggle Buttons - Always Visible */}
			<div className="view-toggle">
				<button
					className={`view-button ${
						activeView === "opportunities" ? "active" : ""
					}`}
					onClick={() => setActiveView("opportunities")}
				>
					Browse Opportunities
				</button>
				<button
					className={`view-button ${activeView === "tracking" ? "active" : ""}`}
					onClick={() => setActiveView("tracking")}
				>
					Track My Hours
				</button>
			</div>

			{/* Conditional Rendering of Main Content */}
			{activeView === "opportunities" ? (
				<>
					{/* Categories */}
					<div className="categories">
						{categories.map((category) => (
							<button
								key={category.id}
								className={`category-button ${
									selectedCategory === category.id ? "active" : ""
								}`}
								onClick={() => setSelectedCategory(category.id)}
							>
								<category.icon className="category-icon" />
								{category.name}
							</button>
						))}
					</div>

					{/* Opportunities Grid */}
					<div className="opportunities-grid">
						{filteredOpportunities.map((opportunity) => (
							<div key={opportunity.id} className="card">
								<img
									src={opportunity.image}
									alt={opportunity.title}
									className="card-image"
								/>
								<div className="card-header">
									<h3 className="card-title">{opportunity.title}</h3>
									<div className="card-meta">
										<MapPin className="icon" />
										<span>{opportunity.location}</span>
									</div>
									<div className="card-meta">
										<Calendar className="icon" />
										<span>{opportunity.date}</span>
									</div>
									<div className="card-meta">
										<Users className="icon" />
										<span>{opportunity.participants}</span>
									</div>
									<div className="card-meta">
										<Clock className="icon" />
										<span>{opportunity.hours}</span>
									</div>
								</div>
								<div className="card-content">
									<p className="card-description">{opportunity.description}</p>
									<p className="card-faculty">
										Suitable for: {opportunity.faculty}
									</p>
								</div>
								<div className="button-container">
									<button className="button">
										Apply Now
										<ArrowRight className="icon" />
									</button>
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<VolunteerTracking />
			)}

			{/* Bottom CTA Section - Always Visible */}
			<div className="cta-section">
				<h2>Can't find what you're looking for?</h2>
				<p>
					Contact the Wits Citizenship and Outreach Programme to discuss
					creating new volunteer opportunities.
				</p>
				<button className="button-secondary">Contact WCCO</button>
			</div>
		</div>
	);
};

export default VolunteerPage;
