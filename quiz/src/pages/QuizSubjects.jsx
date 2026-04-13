import React from "react";
import { Link } from "react-router-dom";
import NameModal from "../components/NameModal";
import { useEffect, useState } from "react";

function QuizSubjects() {

  const subjects = ["AWT", "AJT", "COA", "OS", "CN"];

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (!name) {
      setShowModal(true);
    }
  }, []);
  return (


    <div className="quiz-subjects">

      {showModal && <NameModal onClose={() => setShowModal(false)} />}
      {/* <div className="quiz-subjects-page"> */}

      <h2>Select Subject</h2>

      <div className="subjects">
        {subjects.map((sub) => (
          <Link key={sub} to={`/quiz/${sub}`} className="subject-btn">
            {sub}
          </Link>
        ))}
      </div>

    </div>
  );
}

export default QuizSubjects;