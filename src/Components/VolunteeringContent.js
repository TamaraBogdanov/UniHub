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
import VolunteerApplicationForm from "./VolunteerApplication";

const VolunteerPage = () => {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [searchQuery] = useState("");
	const [activeView, setActiveView] = useState("opportunities");
	const [activeApplication, setActiveApplication] = useState(null); // Track the active form's ID

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
			image: "./images/meeting.jpg",
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
			image: "./images/garden.jpg",
			hours: "4 hours/week",
			faculty: "Science, Agriculture",
		},
		{
			id: 3,
			title: "Hillbrow Youth Mentorship",
			category: "community",
			location: "Hillbrow",
			date: "Weekday Afternoons",
			participants: "12 needed",
			description:
				"Mentor high school students in Hillbrow, helping with academics and life skills.",
			image: "./images/students.jpg",
			hours: "3 hours/week",
			faculty: "All Faculties",
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
			image: "./images/covid.jpg",
			hours: "10 hours/week",
			faculty: "Health Sciences, Science",
		},
		{
			id: 6,
			title: "Digital Skills Workshop",
			category: "education",
			location: "Braamfontein",
			date: "Weekends",
			participants: "8 needed",
			description:
				"Teach basic digital skills to youth from surrounding communities at Wits Digital Innovation Hub.",
			image: "./images/digital.jpg",
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
			image: "./images/origin.jpg",
			hours: "Flexible",
			faculty: "Science, Humanities",
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

			{activeView === "opportunities" ? (
				<>
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
									<button
										className="button"
										onClick={() => setActiveApplication(opportunity.id)}
									>
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

			{/* Application Form Modal */}
			{activeApplication && (
				<div className="application-modal">
					<div className="modal-content">
						<button
							className="close-button"
							onClick={() => setActiveApplication(null)}
						>
							Close
						</button>
						<VolunteerApplicationForm
							opportunity={volunteerOpportunities.find(
								(opportunity) => opportunity.id === activeApplication
							)}
						/>
					</div>
				</div>
			)}

			{/* Bottom CTA Section - Always Visible */}
			<div className="cta-section">
				<h2>Can't find what you're looking for?</h2>
				<p>
					Contact the Wits Citizenship and Outreach Programme to discuss
					creating new volunteer opportunities.
				</p>
				<button className="vol-button-secondary">Contact WCCO</button>
			</div>
		</div>
	);
};

export default VolunteerPage;
