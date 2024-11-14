import React, { useState, useEffect } from "react";
import "../Styles/Clubs.css";
import { clubsData } from "../Mockdata/ClubData";
import JoinableClubs from "./JoinableClubs";
import ClubDetailPanel from "./ClubDetails";
import { Users, Calendar, Trophy, Award } from "lucide-react";

// Define default joined clubs with more detailed information
const defaultJoinedClubs = [
	{
		id: 1,
		name: "Photography Club",
		overview: "Capture moments and master photography techniques.",
		category: "arts",
		memberCount: 42,
		meetingSchedule: "Every Tuesday",
		location: "Arts Building, Room 204",
		nextEvent: "Photo Walk in the Park",
		eventDate: "Next Tuesday, 4 PM",
		recentActivity: "Studio Lightning Workshop",
		tags: ["Creative", "Technical", "Outdoor"],
		upcomingEvents: [
			{
				title: "Photo Walk in the Park",
				date: "Next Tuesday, 4 PM",
				location: "Central Park",
			},
			{
				title: "Portrait Photography Workshop",
				date: "In two weeks, 3 PM",
				location: "Studio 2",
			},
		],
		achievements: [
			"Best Photography Exhibition 2023",
			"Community Documentation Award",
		],
	},
	{
		id: 2,
		name: "Coding Ninjas",
		overview: "A club for aspiring coders.",
		memberCount: 56,
		meetingSchedule: "Every Wednesday",
		location: "Tech Hub, Lab 305",
		nextEvent: "Hackathon Prep Session",
		eventDate: "This Friday, 5 PM",
		recentActivity: "Last week: Web Development Workshop",
		tags: ["Programming", "Technology", "Innovation"],
	},
];

const colors = ["#F49595", "#FFDAB9", "#CDB4DB", "#A9D4EE"];

const ClubsContent = () => {
	const [selectedFilter] = useState("all");

	const [joinedClubs, setJoinedClubs] = useState(() => {
		const savedClubs = localStorage.getItem("joinedClubs");
		return savedClubs ? JSON.parse(savedClubs) : defaultJoinedClubs;
	});

	const [selectedClub, setSelectedClub] = useState(null);

	useEffect(() => {
		localStorage.setItem("joinedClubs", JSON.stringify(joinedClubs));
	}, [joinedClubs]);

	const filteredClubs = clubsData.filter((club) => {
		if (selectedFilter === "all") return true;
		return club.category === selectedFilter;
	});

	const handleJoinClub = (club) => {
		const enrichedClub = {
			...club,
			memberCount: club.memberCount || 0,
			meetingSchedule: club.meetingSchedule || "Schedule TBD",
			location: club.location || "Location TBD",
			nextEvent: club.nextEvent || "No upcoming events",
			eventDate: club.eventDate || "",
			recentActivity: club.recentActivity || "No recent activities",
			tags: club.tags || [],
		};
		setJoinedClubs((prevJoined) => [...prevJoined, enrichedClub]);
	};

	const handleLeaveClub = (clubId) => {
		setJoinedClubs((prevJoined) =>
			prevJoined.filter((club) => club.id !== clubId)
		);
		setSelectedClub(null);
	};

	const remainingJoinableClubs = filteredClubs.filter(
		(club) => !joinedClubs.some((joinedClub) => joinedClub.id === club.id)
	);

	return (
		<div className="clubs-page">
			<header className="clubs-header">
				<h1>My Clubs</h1>
				<p className="clubs-description">Find and join your favorite clubs!</p>
			</header>

			<div className="clubs-container">
				<div className="clubs-grid">
					{joinedClubs.map((club, index) => (
						<div
							key={club.id}
							className="club-card"
							style={{ backgroundColor: colors[index % colors.length] }}
							onClick={() => setSelectedClub(club)}
						>
							<div className="club-content">
								<div className="club-header">
									<h3>{club.name}</h3>
									<p>{club.overview}</p>
								</div>

								<div className="club-info">
									<div className="club-info-item">
										<Users size={18} className="info-icon" />
										<span>{club.memberCount} members</span>
									</div>

									<div className="club-info-item">
										<Calendar size={18} className="info-icon" />
										<span>{club.meetingSchedule}</span>
									</div>
								</div>

								{club.achievements && club.achievements.length > 0 && (
									<div className="achievements-section">
										<div className="section-header">
											<Trophy size={16} className="section-icon" />
											<span>Recent Achievements</span>
										</div>
										<div className="achievements-list">
											{club.achievements.map((achievement, idx) => (
												<div key={idx} className="achievement-item">
													<Award size={14} className="achievement-icon" />
													<span>{achievement}</span>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			{selectedClub && (
				<ClubDetailPanel
					club={selectedClub}
					onLeaveClub={handleLeaveClub}
					onClose={() => setSelectedClub(null)}
				/>
			)}

			<JoinableClubs
				clubs={remainingJoinableClubs}
				onJoinClub={handleJoinClub}
			/>
		</div>
	);
};

export default ClubsContent;
