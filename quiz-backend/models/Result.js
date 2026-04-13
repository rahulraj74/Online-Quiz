const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  score: Number,
  total: Number,
  timeTaken: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Result", resultSchema);