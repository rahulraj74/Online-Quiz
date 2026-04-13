// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import "./styles/style.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import QuizSubjects from "./pages/QuizSubjects";
import QuizPage from "./pages/QuizPage";
import ExamLogin from "./pages/ExamLogin";
import Services from "./pages/Services";
import StudentLogin from "./pages/StudentLogin";
import ResultHistory from "./pages/ResultHistory";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizSubjects />} />
        <Route path="/quiz/:subject" element={<QuizPage />} />
        <Route path="/exam" element={<ExamLogin />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/results" element={<ResultHistory />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
