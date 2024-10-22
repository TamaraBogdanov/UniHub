import React from "react";
import {
	Newspaper,
	Users,
	Heart,
	MessageCircle,
	BookOpen,
	Award,
	Globe,
} from "lucide-react";

export const enhancedMockNewsData = [
	{
		id: 1,
		title: "University Launches New AI Research Center",
		category: "Academic",
		subcategory: "Research",
		date: "2024-07-15",
		author: "Dr. Emily Chen",
		publisher: "University Press",
		content:
			"The university has announced the opening of a state-of-the-art AI research center...",
		icon: <BookOpen color="#1e40af" />,
		featured: true,
		image: "./images/online-learning.png",
	},
	{
		id: 2,
		title: "Student-Led Climate Initiative Gains National Recognition",
		category: "News",
		subcategory: "Environment",
		date: "2024-07-18",
		author: "Sarah Johnson",
		publisher: "Campus Chronicle",
		content:
			"A group of dedicated students has put our university on the map with their innovative climate change project...",
		icon: <Newspaper color="#047857" />,
		featured: true,
		image: "/images/online-learning.png",
	},
	{
		id: 3,
		title: "New Student Club: Tech for Social Good",
		category: "Clubs",
		subcategory: "Technology",
		date: "2024-07-20",
		author: "Michael Lee",
		publisher: "Student Affairs",
		content:
			"A new student club focusing on using technology for social impact has been formed...",
		icon: <Users color="#7c3aed" />,
		featured: false,
		image: "/images/online-learning.png",
	},
	{
		id: 4,
		title: "Mental Health Awareness Week Kicks Off",
		category: "Wellness",
		subcategory: "Health",
		date: "2024-07-22",
		author: "Dr. Lisa Park",
		publisher: "Wellness Center",
		content:
			"The annual Mental Health Awareness Week begins with a series of workshops and events...",
		icon: <Heart color="#be123c" />,
		featured: true,
		image: "/images/online-learning.png",
	},
	{
		id: 5,
		title: "Alumni Spotlight: Tech Entrepreneur Returns as Guest Lecturer",
		category: "Community",
		subcategory: "Alumni",
		date: "2024-07-25",
		author: "Alex Rivera",
		publisher: "Alumni Association",
		content:
			"Renowned tech entrepreneur and alumnus, Jane Doe, is set to deliver a guest lecture...",
		icon: <MessageCircle color="#ea580c" />,
		featured: false,
		image: "/images/online-learning.png",
	},
	{
		id: 6,
		title: "University Ranks in Top 10 for Sustainability Efforts",
		category: "News",
		subcategory: "Rankings",
		date: "2024-07-28",
		author: "Chris Taylor",
		publisher: "University Communications",
		content:
			"In a recent global assessment of universities' sustainability initiatives...",
		icon: <Award color="#0369a1" />,
		featured: false,
		image: "/images/online-learning.png",
	},
	{
		id: 7,
		title: "International Exchange Program Expands to New Countries",
		category: "Academic",
		subcategory: "Global",
		date: "2024-08-01",
		author: "Prof. Maria Garcia",
		publisher: "International Office",
		content:
			"The university's popular international exchange program has added five new partner institutions...",
		icon: <Globe color="#0891b2" />,
		featured: false,
		image: "/images/online-learning.png",
	},
	// Add more news items as needed...
];

export const newsCategories = [
	{ name: "All", icon: <Newspaper size={20} /> },
	{ name: "News", icon: <Newspaper size={20} /> }, // This now reflects all news items
	{ name: "Clubs", icon: <Users size={20} /> },
	{ name: "Wellness", icon: <Heart size={20} /> },
	{ name: "Community", icon: <MessageCircle size={20} /> },
];

export const Categories = [
	{ name: "All", icon: <Newspaper size={20} /> },
	{ name: "News", icon: <Newspaper size={20} /> }, // This now reflects all news items
	{ name: "Clubs", icon: <Users size={20} /> },
	{ name: "Wellness", icon: <Heart size={20} /> },
	{ name: "Events", icon: <MessageCircle size={20} /> },
];

export const newsSubcategories = [
	"All",
	"Research",
	"Environment",
	"Technology",
	"Health",
	"Alumni",
	"Rankings",
	"Global",
	// Add more subcategories as needed...
];
