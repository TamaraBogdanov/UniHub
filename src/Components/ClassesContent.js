import React, { useState } from "react";
import "../Styles/Classes.css";
import { courses } from "../Mockdata/mockData";
import {
	Home,
	BookOpen,
	Calculator,
	Globe,
	Brain,
	Beaker,
	DollarSign,
} from "lucide-react";

function ClassesContent() {
	const [filter, setFilter] = useState("All");

	const filters = [
		{ name: "All", icon: BookOpen },
		{ name: "Computer Science", icon: Home },
		{ name: "Mathematics", icon: Calculator },
		{ name: "History", icon: Globe },
		{ name: "Psychology", icon: Brain },
		{ name: "Chemistry", icon: Beaker },
		{ name: "Economics", icon: DollarSign },
	];

	// Filters courses based on their major
	const filteredCourses =
		filter === "All"
			? courses
			: courses.filter((course) => course.department === filter);

	return (
		<>
			<h2 className="classes-heading">My Courses</h2>

			{/* Filter Buttons */}
			<div className="filter-buttons">
				{filters.map((f) => (
					<button
						key={f.name}
						className={`filter-button ${filter === f.name ? "active" : ""}`}
						onClick={() => setFilter(f.name)}
					>
						<f.icon size={20} />
						<span>{f.name}</span>
					</button>
				))}
			</div>

			<section className="courses">
				{/* The grid of courses that will be displayed */}
				<div className="course-grid">
					{/* Map over the courses array and render a card for each course */}
					{filteredCourses.map((course) => (
						<div key={course.id} className="course-card">
							<img
								src={course.image}
								alt={course.title}
								className="course-image"
							/>

							{/* Course info */}
							<div className="course-info">
								<h4>{course.title}</h4>
								<p>{course.instructor}</p>
								<p>
									{course.department} • {course.credits} credits
								</p>
								<div className="course-progress">
									<div
										className="progress-bar"
										style={{ width: `${course.progress}%` }}
									></div>
								</div>
								<span className="progress-text">
									{course.progress}% Complete
								</span>
							</div>
						</div>
					))}
				</div>
			</section>
		</>
	);
}

export default ClassesContent;
