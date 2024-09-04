// Pages/mockData.js
const classesData = [
	{
		id: 1,
		title: "System Maintenance",
		message: "The system will be down for maintenance on 9th Sept.",
		date: "2024-09-09",
		alertType: "newest",
	},
	{
		id: 2,
		title: "Exam Results",
		message: "Your exam results are now available.",
		date: "2024-09-02",
		alertType: "oldest",
	},
	{
		id: 3,
		title: "New Course Enrollment",
		message: "Enrollment for the new courses is now open.",
		date: "2024-09-05",
		alertType: "newest",
	},
	{
		id: 4,
		title: "Library Due Date",
		message: "Your library book is due on 15th Sept.",
		date: "2024-09-01",
		alertType: "oldest",
	},
];

// Optional: If you want to add the alertType dynamically, you can do it here as well.
classesData.forEach((alert, index) => {
	alert.alertType = index % 2 === 0 ? "newest" : "oldest";
});

export default classesData;
