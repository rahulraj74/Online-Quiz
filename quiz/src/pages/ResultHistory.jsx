import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function ResultHistory() {
  const [results, setResults] = useState([]);

  const useremail = localStorage.getItem("useremail");

  useEffect(() => {
    if (!useremail) {
      setResults([]);
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3001"}/api/results?email=${useremail}`)
      .then(res => res.json())
      .then(data => {
        setResults(data);
      })
      .catch(err => console.log("ERROR:", err));
  }, [useremail]);

  if (!useremail) {
    return (
      <div className="results-page">
        <h2 className="results-header">Result History & Analytics</h2>
        <p style={{ textAlign: "center", marginTop: "20px" }}>Please log in to view your results.</p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3001"}/api/results/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setResults(results.filter(r => r._id !== id));
      } else {
        alert("Database delete failed! Please make sure you restarted your backend server.");
      }
    } catch (err) {
      console.log("ERROR DELETING:", err);
    }
  };

  const formatTime = (seconds) => {
    if (seconds == null || isNaN(seconds)) return "N/A";
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min} min ${sec} sec`;
  };

  // Format data for Recharts, taking the person's name, subject, numeric score, and time taken
  // Reverse the array so the graph displays left-to-right sequentially
  const chartData = [...results].reverse().map((r, i) => ({
    name: `${r.name} - ${r.subject}`,
    score: r.score,
    timeTaken: r.timeTaken || 0
  }));

  return (
    <div className="results-page">
      <h2 className="results-header">Result History & Analytics</h2>

      <div className="results-split-layout">

        {/* Left Side: Traditional List */}
        <div className="results-list">
          {results.map((r, index) => (
            <div key={r._id || index} className="result-card">
              <p><b>Name:</b> {r.name}</p>
              <p><b>Subject:</b> {r.subject}</p>
              <p><b>Score:</b> {r.score} / {r.total}</p>
              <p><b>Time Taken:</b> {formatTime(r.timeTaken)}</p>
              {/* <button onClick={() => handleDelete(r._id)} className="delete-btn">
                Delete
              </button> */}
            </div>
          ))}
        </div>

        {/* Right Side: Graph Analytics */}
        <div className="results-graph-container">
          {results.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="rgb(var(--color_45))" tick={{ fontSize: 12 }} />
                <YAxis stroke="rgb(var(--color_45))" />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid rgb(var(--color_45))' }}
                  itemStyle={{ color: 'rgb(var(--color_45))' }}
                  labelStyle={{ display: 'none' }}
                  formatter={(value) => [formatTime(value), ""]}
                  separator=""
                />
                <Legend />
                <Bar dataKey="timeTaken" fill="rgb(var(--color_45))" name="Time Taken" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data-msg">No results available to graph.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default ResultHistory;