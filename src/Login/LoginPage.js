import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

//sets username and password state as null until input is enetered.
function LoginPage({ setUserRole }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	//Login function, checks if username and password match hardcoded student/admin credentials. If they match, navigate to /home according to user.
	function handleLogin() {
		if (username === "student" && password === "studentpass") {
			setUserRole("student");
			navigate("/home");
		} else if (username === "admin" && password === "adminpass") {
			setUserRole("admin");
			navigate("/home");
		} else {
			alert("Invalid credentials");
		}
	}

	//On enter key, log you in
	function handleKeyPress(event) {
		if (event.key === "Enter") {
			handleLogin();
		}
	}

	return (
		//Left side of login page
		<div className="login-container">
			<aside className="left-section">
				<header className="header">
					<img className="logologin" src="logosymbol.png" alt="Logo" />
				</header>
				<section className="text-container">
					<h2>Welcome to</h2>
					<h1>UniHub!</h1>
					<p>To keep connected with us sign in with your student info</p>
				</section>
			</aside>

			{/* Right side of login page */}
			<main className="right-section">
				<h2 className="login-heading">Sign in</h2>
				<div className="login-box">
					{/* Username input */}
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						onKeyDown={handleKeyPress}
					/>
					{/* Password input */}
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onKeyDown={handleKeyPress}
					/>
					<button onClick={handleLogin}>Log in</button>
				</div>
			</main>
		</div>
	);
}

export default LoginPage;
