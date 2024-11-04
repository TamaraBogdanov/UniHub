import React from "react";
import "../Styles/ClubDetails.css";
import {
	Users,
	Calendar,
	MapPin,
	Clock,
	Trophy,
	Tags,
	Activity,
	Award,
} from "lucide-react";

const ClubDetailPanel = ({ club, onLeaveClub, onClose }) => {
	// Custom schedule for each club based on club ID

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="club-details-panel" onClick={(e) => e.stopPropagation()}>
				<button className="close-button" onClick={onClose}>
					×
				</button>

				<div className="overview-section">
					<h2>{club.name}</h2>
					<span className="club-category">{club.category || "General"}</span>
					<div className="member-count">
						<span>Active Members: {club.memberCount}</span>
						<span className="status-active">● Active</span>
					</div>
				</div>

				{/* Club Info Section */}
				<div className="club-info">
					<div className="info-item">
						<Users size={18} className="info-icon" />
						<span>{club.memberCount} members</span>
					</div>
					<div className="info-item">
						<Calendar size={18} className="info-icon" />
						<span>{club.meetingSchedule}</span>
					</div>
					<div className="info-item">
						<MapPin size={18} className="info-icon" />
						<span>{club.location}</span>
					</div>
					<div className="info-item">
						<Clock size={18} className="info-icon" />
						<span>Next: {club.nextEvent}</span>
					</div>
					<div className="info-item">
						<Activity size={18} className="info-icon" />
						<span>Category: {club.category}</span>
					</div>
				</div>

				{/* Achievements Section */}
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

				{/* Recent Activity Section */}
				<div className="recent-activity">
					<div className="section-header">
						<Activity size={16} className="section-icon" />
						<span>Recent Activity</span>
					</div>
					<p className="activity-text">{club.recentActivity}</p>
				</div>

				{/* Tags Section */}
				{club.tags && club.tags.length > 0 && (
					<div className="tags-section">
						<div className="section-header">
							<Tags size={16} className="section-icon" />
							<span>Tags</span>
						</div>
						<div className="tags-container">
							{club.tags.map((tag, tagIndex) => (
								<span key={tagIndex} className="tag">
									{tag}
								</span>
							))}
						</div>
					</div>
				)}

				<div className="join-club-form">
					<button className="join-button" onClick={() => onLeaveClub(club.id)}>
						Leave Club
					</button>
				</div>
			</div>
		</div>
	);
};

export default ClubDetailPanel;
