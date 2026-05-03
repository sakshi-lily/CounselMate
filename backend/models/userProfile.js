const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  age: Number,
  email: String,
  phone: String,
  education: String,
  stream: String,
  aptitudeScore: Number,
  profilePic: String,
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
