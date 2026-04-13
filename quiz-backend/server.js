require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Result = require("./models/Result");

// app init
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("WORKING PERFECT");
});

const User = require("./models/User");

// ✅ AUTHENTICATION API (Login & Auto-Register)
app.post("/api/auth", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists based on email
    let user = await User.findOne({ email });

    if (user) {
      // User exists, verify password
      if (user.password === password) {
        return res.status(200).json({ message: "Login successful", user });
      } else {
        return res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      // User doesn't exist, create a new one (Auto-Register)
      user = new User({ name, email, password });
      await user.save();
      return res.status(201).json({ message: "Registration successful", user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Authentication failed. Server Error." });
  }
});

// ✅ SAVE RESULT API
app.post("/api/result", async (req, res) => {
  try {
    const { name, email, subject, score, total, timeTaken } = req.body;

    const newResult = new Result({
      name,
      email,
      subject,
      score,
      total,
      timeTaken
    });

    await newResult.save();

    res.status(200).json({ message: "Result Saved ✅" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error saving result" });
  }
});

// ✅ GET ALL RESULTS (IMPORTANT - bahar hona chahiye)
app.get("/api/results", async (req, res) => {
  try {
    const { email } = req.query;
    let query = {};

    // Filter results by email if provided
    if (email) {
      query.email = email;
    }

    const results = await Result.find(query).sort({ date: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error fetching results" });
  }
});

// ✅ DELETE RESULT API
app.delete("/api/results/:id", async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Result Deleted ✅" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting result" });
  }
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("ERROR:", err));

// server start
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// app.listen(3001, () => {
//   console.log("Server running on port 3001");
// });