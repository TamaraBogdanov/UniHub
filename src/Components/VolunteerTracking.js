import React from "react";
import {
	LineChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Line,
	ResponsiveContainer,
} from "recharts";
import { Award, Clock, Star, Calendar, Target } from "lucide-react";
import "../Styles/VolunteerTracking.css";

const VolunteerTracking = () => {
	// Mock data for the volunteer history
	const volunteerHistory = [
		{ month: "Jan", hours: 8, events: 2 },
		{ month: "Feb", hours: 12, events: 3 },
		{ month: "Mar", hours: 15, events: 4 },
		{ month: "Apr", hours: 10, events: 2 },
		{ month: "May", hours: 18, events: 5 },
		{ month: "Jun", hours: 20, events: 4 },
	];

	// Mock data for completed volunteering activities
	const completedActivities = [
		{
			id: 1,
			title: "Tutorial Support Programme",
			date: "15 Mar 2024",
			hours: 10,
			credits: 2,
			status: "Completed",
		},
		{
			id: 2,
			title: "Soweto Community Garden",
			date: "22 Apr 2024",
			hours: 8,
			credits: 1.5,
			status: "Completed",
		},
		{
			id: 3,
			title: "Health Awareness Campaign",
			date: "5 May 2024",
			hours: 12,
			credits: 2.5,
			status: "In Progress",
		},
	];

	// Calculate total statistics
	const totalHours = completedActivities.reduce(
		(sum, activity) => sum + activity.hours,
		0
	);
	const totalCredits = completedActivities.reduce(
		(sum, activity) => sum + activity.credits,
		0
	);

	return (
		<div className="tracking-dashboard">
			<h2 className="tracking-title">Your Volunteer Journey</h2>

			{/* Stats Cards */}
			<div className="stats-grid">
				<div className="stat-card">
					<Clock className="stat-icon" />
					<div className="stat-content">
						<h3>Total Hours</h3>
						<p className="stat-value">{totalHours}</p>
					</div>
				</div>

				<div className="stat-card">
					<Award className="stat-icon" />
					<div className="stat-content">
						<h3>Credits Earned</h3>
						<p className="stat-value">{totalCredits.toFixed(1)}</p>
					</div>
				</div>

				<div className="stat-card">
					<Target className="stat-icon" />
					<div className="stat-content">
						<h3>Activities</h3>
						<p className="stat-value">{completedActivities.length}</p>
					</div>
				</div>

				<div className="stat-card">
					<Star className="stat-icon" />
					<div className="stat-content">
						<h3>Achievement Level</h3>
						<p className="stat-value">Silver</p>
					</div>
				</div>
			</div>

			{/* Activity Chart */}
			<div className="chart-container">
				<h3>Activity Overview</h3>
				<div className="chart-wrapper">
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={volunteerHistory}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis yAxisId="left" />
							<YAxis yAxisId="right" orientation="right" />
							<Tooltip />
							<Line
								yAxisId="left"
								type="monotone"
								dataKey="hours"
								stroke="#3b82f6"
								name="Hours"
							/>
							<Line
								yAxisId="right"
								type="monotone"
								dataKey="events"
								stroke="#10b981"
								name="Events"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Recent Activities */}
			<div className="activities-section">
				<h3>Recent Activities</h3>
				<div className="activities-list">
					{completedActivities.map((activity) => (
						<div key={activity.id} className="activity-card">
							<div className="activity-header">
								<h4>{activity.title}</h4>
								<span
									className={`status-badge ${activity.status.toLowerCase()}`}
								>
									{activity.status}
								</span>
							</div>
							<div className="activity-details">
								<div className="activity-meta">
									<Calendar className="activity-icon" />
									<span>{activity.date}</span>
								</div>
								<div className="activity-meta">
									<Clock className="activity-icon" />
									<span>{activity.hours} hours</span>
								</div>
								<div className="activity-meta">
									<Award className="activity-icon" />
									<span>{activity.credits} credits</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default VolunteerTracking;
