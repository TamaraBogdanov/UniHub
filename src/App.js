import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import HomePage from "./Pages/HomePage";
import SelfServicePage from "./Pages/SelfServicePage";
import StudentHubPage from "./Pages/StudentHubPage";
import CourseDetailPage from "./Pages/CourseDetailPage";
import ChatPage from "./Components/chat/ChatPage";
import { TodoProvider } from "./Components/TodoContext";

function App() {
	const [userRole, setUserRole] = useState(null);

	return (
		<TodoProvider>
			<BrowserRouter basename="/UniHub">
				<Routes>
					<Route path="/" element={<LoginPage setUserRole={setUserRole} />} />
					<Route
						path="/login"
						element={<LoginPage setUserRole={setUserRole} />}
					/>
					<Route path="/home" element={<HomePage userRole={userRole} />} />
					<Route path="/self-service" element={<SelfServicePage />} />
					<Route path="/student-hub" element={<StudentHubPage />} />
					<Route path="/courses/:courseId" element={<CourseDetailPage />} />
					<Route path="/messages" element={<ChatPage />} />
				</Routes>
			</BrowserRouter>
		</TodoProvider>
	);
}

export default App;
