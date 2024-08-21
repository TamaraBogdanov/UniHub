import React from "react";

function HomePage({ userRole }) {
	return (
		<div>
			<h2>Welcome to the Home Page</h2>
			{userRole === "student" && <p>This content is for students.</p>}
			{userRole === "admin" && <p>This content is for admins.</p>}
		</div>
	);
}

export default HomePage;
