import React from "react";

function ExamLogin() {
  return (
    <div className="center-form">
      <h2>Exam Login</h2>

      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Enrollment" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button>Login</button>
    </div>
  );
}

export default ExamLogin;