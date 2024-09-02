import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import HomePage from "./Pages/HomePage";
import { TodoProvider } from "./Components/TodoContext";

function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <TodoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage setUserRole={setUserRole} />} />
          <Route
            path="/login?"
            element={<LoginPage setUserRole={setUserRole} />}
          />
          <Route path="/home" element={<HomePage userRole={userRole} />} />
        </Routes>
      </Router>
    </TodoProvider>
  );
}

export default App;
