const express = require("express");
const app = express();

const connectDB = require("./db/db.connect");
const Meetups = require("./models/meetupApp.model");

// Connect to the database
connectDB();

/**
 * Fetches a meetup by its title and eventType from the database
 * Query parameters:
 * - @title: (optional) The title of the meetup to search for (case-insensitive).
 * - @eventType: (optional) The type of the meetup to filter by (e.g., "online", "in-person").
 *
 * If both query parameters are provided, the endpoint will return meetups that match both criteria.
 * If only one query parameter is provided, it will filter based on that parameter alone.
 * If no query parameters are provided, it will return all meetups.
 */
app.get("/meetups/search", async (req, res) => {
  const { title, eventType } = req.query;

  let filter = {};

  // Search by title (case-insensitive)
  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }

  // Filter by eventType
  if (eventType) {
    filter.eventType = eventType.toLowerCase();
  }

  try {
    const meetups = await Meetups.find(filter);
    if (meetups.length === 0) {
      return res
        .status(404)
        .json({ error: "No meetups found matching the criteria." });
    }
    res.json(meetups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Fetches a meetup from the database
 */
app.get("/meetups/:id", async (req, res) => {
  try {
    const meetup = await Meetups.findById(req.params.id);
    if (!meetup) {
      return res.status(404).json({ error: "Meetup not found." });
    }
    res.json(meetup);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meetup." });
  }
});

/**
 * Creates a new meetup in the database
 */
app.post("/meetups", async (req, res) => {
  const newMeetup = req.body;
  if (!Array.isArray(newMeetup) || newMeetup.length === 0) {
    return res
      .status(400)
      .json({ error: "Request body must be a non-empty array of meetups." });
  } else {
    try {
      const createdMeetup = await Meetups.insertMany(newMeetup);
      res.status(201).json({
        message: "Meetup created successfully.",
        count: createdMeetup.length,
        meetup: createdMeetup,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || "Failed to create meetup." });
    }
  }
});

/**
 * Fetches a meetup all the data from the database
 *
 */
app.get("/meetups", async (req, res) => {
  try {
    const meetups = await Meetups.find();
    res.json(meetups);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meetups." });
  }
});

module.exports = app;
