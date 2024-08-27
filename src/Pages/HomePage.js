import React from "react";
import Topbar from "../Shared/CTopBar";

function HomePage({ userRole }) {
	return (
		<div className="HomePage">
			{/* Added a topbar that changes depending on which page youre on and which user youre logged in as */}
			<Topbar currentPage={"Dashboard"} userRole={userRole} />
			<div>
				<h2>Welcome to the Dashboard</h2>
				{userRole === "student" && <p>This content is for students.</p>}
				{userRole === "admin" && <p>This content is for admins.</p>}
			</div>
		</div>
	);
}

export default HomePage;
