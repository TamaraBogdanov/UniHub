import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setUserRole }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = () => {
		if (username === "student" && password === "studentpass") {
			setUserRole("student");
			navigate("/home");
		} else if (username === "admin" && password === "adminpass") {
			setUserRole("admin");
			navigate("/home");
		} else {
			alert("Invalid credentials");
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
}

export default LoginPage;
