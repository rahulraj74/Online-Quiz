import React, { useState } from "react";
// import "./styles/style.css";

// import "./styles/nameModal.css";
import "../styles/nameModal.css";

function NameModal({ onClose }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3001"}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user data
        localStorage.setItem("username", data.user.name);
        localStorage.setItem("useremail", data.user.email);
        
        // Dispatch event for other components like Navbar to update correctly
        window.dispatchEvent(new Event("storage"));

        onClose();
      } else {
        alert(data.error || "Login Failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server. Please try again later.");
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <h2>Student Login</h2>

        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginBottom: '10px' }}
          />

          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: '10px' }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: '10px' }}
          />

          <button type="submit">Login / Start Quiz</button>
        </form>

      </div>

    </div>
  );
}

export default NameModal;