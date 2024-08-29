import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import HomePage from "./Pages/HomePage";

function App() {
	const [userRole, setUserRole] = useState(null);

	return (
		<Router>
			<Routes>
				<Route
					path="/login"
					element={<LoginPage setUserRole={setUserRole} />}
				/>
				<Route path="/home" element={<HomePage userRole={userRole} />} />
			</Routes>
		</Router>
	);
}

export default App;
