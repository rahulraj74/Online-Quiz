import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentLogin({ onLoginSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
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

        if (onLoginSuccess) {
           onLoginSuccess();
        } else {
           navigate("/");
        }
      } else {
        alert(data.error || "Login Failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server. Please try again later.");
    }
  };

  return (
    <div className="center-form">
      <h2>Student Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input 
          type="email" 
          placeholder="Email ID" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ marginTop: '15px', width: '100px', alignSelf: 'center' }}>Login</button>
      </form>
    </div>
  );
}

export default StudentLogin;

