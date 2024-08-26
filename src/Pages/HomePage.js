import React from "react";

function HomePage({ userRole }) {
  return (
    <div>
      <h2>Welcome Page</h2>
      {userRole === "student" && <p>This content is for students.</p>}
      {userRole === "admin" && <p>Content for admins.</p>}
    </div>
  );
}
export default HomePage;
