const mongoose = require("mongoose");

const tweeterProfileSchema = new mongoose.Schema({
  profilePic: String,
  fullName: String,
  username: String,
  bio: String,
  companyName: String,
  city: String,
  portfolioLink: String,
  handle: String,
  followersCount: Number,
  followingCount: Number,
  isOnline: Boolean,
});

const TwitterProfile = mongoose.model("TwitterProfile", tweeterProfileSchema);

module.exports = TwitterProfile;
