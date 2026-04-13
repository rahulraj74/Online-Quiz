import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    setUsername(null);
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        Online Quiz
      </div>

      <div className="nav-pill-container">
        <div className="nav-links pill">
          <Link to="/quiz"> Quiz </Link>
          <Link to="/exam">Exam</Link>
          <Link to="/services">Services</Link>
          <Link to="/results">Results</Link>
        </div>

        <div className="nav-right pill" style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'white' }}>
          {username ? (
            <>
              <span style={{ fontWeight: '500' }}>Hey, {username}</span>
              <button 
                onClick={handleLogout} 
                style={{ 
                  background: 'red', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px', 
                  borderRadius: '5px', 
                  cursor: 'pointer' 
                }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </div>
      </div>

    </nav>
  );
}

export default Navbar;