const mongoose = require("mongoose");

const meetupAppSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    eventType: {
      type: String,
      enum: ["offline", "online"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
    hostBy: {
      type: String,
      required: true,
    },
    dressCode: {
      type: String,
    },
    ageRestriction: {
      type: Number,
      min: 18,
    },
    eventTags: [
      {
        type: String,
      },
    ],
    eventImage: {
      type: String,
    },
    attendees: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

const MeetupApp = mongoose.model("MeetupApp", meetupAppSchema);

module.exports = MeetupApp;
