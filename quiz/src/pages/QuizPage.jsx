import { useEffect } from "react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function QuizPage() {

  const username = localStorage.getItem("username");

  const { subject } = useParams();

  const quizData = {

    AWT: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Text Machine Language",
          "Hyper Tool Markup Language",
          "None"
        ],
        answer: "Hyper Text Markup Language"
      },
      {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: "CSS"
      },
      {
        question: "Which tag is used to insert an image?",
        options: ["<img>", "<image>", "<src>", "<pic>"],
        answer: "<img>"
      },
      {
        question: "Which tag creates a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: "<a>"
      },
      {
        question: "HTML files use which extension?",
        options: [".html", ".css", ".js", ".xml"],
        answer: ".html"
      }
    ],

    AJT: [
      {
        question: "Java is developed by?",
        options: ["Microsoft", "Oracle", "Google", "IBM"],
        answer: "Oracle"
      },
      {
        question: "Which keyword is used to define a class in Java?",
        options: ["class", "define", "object", "struct"],
        answer: "class"
      },
      {
        question: "Which method is entry point of Java program?",
        options: ["start()", "main()", "run()", "init()"],
        answer: "main()"
      },
      {
        question: "Java is a ___ language?",
        options: ["Compiled", "Interpreted", "Both", "None"],
        answer: "Both"
      },
      {
        question: "Which symbol ends a Java statement?",
        options: [":", ";", "!", "."],
        answer: ";"
      }
    ],

    COA: [
      {
        question: "CPU stands for?",
        options: [
          "Central Processing Unit",
          "Computer Processing Unit",
          "Central Power Unit",
          "Control Processing Unit"
        ],
        answer: "Central Processing Unit"
      },
      {
        question: "Which memory is fastest?",
        options: ["RAM", "ROM", "Cache", "Hard Disk"],
        answer: "Cache"
      },
      {
        question: "ALU stands for?",
        options: [
          "Arithmetic Logic Unit",
          "Array Logic Unit",
          "Advanced Logic Unit",
          "Automatic Logic Unit"
        ],
        answer: "Arithmetic Logic Unit"
      },
      {
        question: "Which device stores data permanently?",
        options: ["RAM", "ROM", "Cache", "Register"],
        answer: "ROM"
      },
      {
        question: "Which is input device?",
        options: ["Keyboard", "Monitor", "Printer", "Speaker"],
        answer: "Keyboard"
      }
    ],

    OS: [
      {
        question: "Which is an Operating System?",
        options: ["Windows", "Chrome", "HTML", "Python"],
        answer: "Windows"
      },
      {
        question: "Linux is?",
        options: ["OS", "Browser", "Language", "Editor"],
        answer: "OS"
      },
      {
        question: "Which OS is developed by Microsoft?",
        options: ["Linux", "Windows", "MacOS", "Unix"],
        answer: "Windows"
      },
      {
        question: "Which of these is open source OS?",
        options: ["Linux", "Windows", "IOS", "DOS"],
        answer: "Linux"
      },
      {
        question: "OS manages?",
        options: ["Hardware", "Software", "Both", "None"],
        answer: "Both"
      }
    ],

    CN: [
      {
        question: "IP stands for?",
        options: [
          "Internet Protocol",
          "Internal Program",
          "Input Process",
          "Internet Process"
        ],
        answer: "Internet Protocol"
      },
      {
        question: "Which device connects networks?",
        options: ["Router", "Monitor", "Printer", "Mouse"],
        answer: "Router"
      },
      {
        question: "HTTP stands for?",
        options: [
          "Hyper Text Transfer Protocol",
          "High Text Transfer Protocol",
          "Hyper Transfer Tool Protocol",
          "None"
        ],
        answer: "Hyper Text Transfer Protocol"
      },
      {
        question: "Which topology uses central hub?",
        options: ["Star", "Bus", "Ring", "Mesh"],
        answer: "Star"
      },
      {
        question: "Which device forwards data packets?",
        options: ["Router", "Keyboard", "Scanner", "Speaker"],
        answer: "Router"
      }
    ]

  };

  const questions = quizData[subject];

  const [start, setStart] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (start && !finished && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && !finished) {
      setFinished(true);
    }
  }, [start, finished, timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const handleOption = (opt) => {

    setSelected(opt);

    if (opt === questions[current].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {

      const next = current + 1;

      if (next < questions.length) {
        setCurrent(next);
        setSelected(null);
      } else {
        setFinished(true);
      }

    }, 700);
  };




  //   useEffect(() => {


  //   if (finished) {

  //     const name = localStorage.getItem("username");

  //     fetch("http://localhost:3001/api/result", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         name: name,
  //         subject: subject,
  //         score: score,
  //         total: questions.length
  //       })
  //     })
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //     .catch(err => console.log(err));
  //   }
  // }, [finished]);



  useEffect(() => {

    if (finished) {

      const name = localStorage.getItem("username");
      const email = localStorage.getItem("useremail");
      const timeTaken = 300 - timeLeft;

      fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3001"}/api/result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          score: score,
          total: questions.length,
          timeTaken: timeTaken
        })
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

  }, [finished, score, subject, questions.length, timeLeft]);




  return (
    <div className="quiz-page">
      {/* <div className={`quiz-page ${subject}`}> */}

      <h2>{subject} Quiz</h2>

      {!start && (
        <button onClick={() => setStart(true)}>Start Quiz</button>
      )}

      {start && !finished && (

        <div className="question-box">

          <div className="timer" style={{ fontSize: "24px", color: "rgb(var(--color_45))", marginBottom: "20px" }}>
            Time Left: {formatTime(timeLeft)}
          </div>

          <h3 className="question-number">
            Question {current + 1} / {questions.length}
          </h3>

          <p className="question-text">
            {questions[current].question}
          </p>

          <div className="options-column">

            {questions[current].options.map((opt, index) => (

              <div
                key={opt}
                className={`option ${selected === opt ? "selected" : ""}`}
                onClick={() => handleOption(opt)}
              >

                <span className="option-number">{index + 1}.</span>

                {opt}

                {/* {selected === opt && <span className="tick">✓</span>} */}

              </div>

            ))}

          </div>

        </div>

      )}

      {finished && (
        <div className="result">
          {/* <h2>Your Score: {score} / {questions.length}</h2> */}
          <h2>
            {username}, Your Score: {score} / {questions.length}
          </h2>
          <p style={{ fontSize: "20px", color: "white", marginTop: "15px" }}>
            Time Taken: {formatTime(300 - timeLeft)}
          </p>
        </div>
      )}

    </div>
  );
}

export default QuizPage;