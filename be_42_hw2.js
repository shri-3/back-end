const express = require("express");
const app = express();

const connectDB = require("./db/db.connect");
const Hotels = require("./models/hotel.model");

// Connect to the database
connectDB();

/**
 * Creates a new hotel in the database
 */
app.post("/hotels", async (req, res) => {
  const newHotel = req.body;
  if (
    !newHotel.name ||
    !newHotel.category ||
    !newHotel.location ||
    !newHotel.rating ||
    !newHotel.phoneNumber
  ) {
    res.status(400).json({
      error:
        "Name, category, location, rating and phone number are required to create a hotel.",
    });
  } else {
    try {
      const createdHotel = await Hotels.create(newHotel);
      res.status(201).json({
        message: "Hotel created successfully.",
        hotel: createdHotel,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create hotel." });
    }
  }
});

/**
 * Fetches a hotel from the database
 */
app.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotels.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
});

/**
 * Fetches a hotel by its id from the database and deletes it
 */
app.delete("/hotels/:id", async (req, res) => {
  const hotelId = req.params.id;

  if (!hotelId) {
    return res.status(400).json({ error: "Invalid hotel ID." });
  } else {
    try {
      const deletedHotel = await Hotels.findByIdAndDelete(hotelId);
      if (deletedHotel) {
        res.json({
          message: "Hotel deleted successfully.",
          hotel: deletedHotel,
        });
      } else {
        res.status(404).json({ error: "Hotel not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the hotel." });
    }
  }
});

/**
 * Fetches a hotel by its id from the database and updates all the details of the hotel
 */
app.put("/hotels/:id", async (req, res) => {
  const hotelId = req.params.id;
  const updatedHotel = req.body;

  if (!hotelId) {
    return res.status(400).json({ error: "Invalid hotel ID." });
  } else {
    try {
      const updatedHotelDoc = await Hotels.findByIdAndUpdate(
        hotelId,
        updatedHotel,
        { new: true },
      );
      if (updatedHotelDoc) {
        res.json({
          message: "Hotel updated successfully.",
          hotel: updatedHotelDoc,
        });
      } else {
        res.status(404).json({ error: "Hotel not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the hotel." });
    }
  }
});

/**
 * Fetches a hotel by its hotelName
 * @param {string} hotelName - The name of the hotel to fetch.
 */
app.get("/hotels/:hotelName", async (req, res) => {
  const hotelName = req.params.hotelName;
  try {
    const hotel = await Hotels.findOne({ name: hotelName });
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the hotel." });
  }
});

/**
 * Fetches hotels by its phoneNumber
 * @param {string} phoneNumber - The phone number of the hotel to fetch.
 */
app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  try {
    const hotels = await Hotels.find({ phoneNumber: phoneNumber });
    if (hotels.length > 0) {
      res.json(hotels);
    } else {
      res
        .status(404)
        .json({ error: "No hotels found with that phone number." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the hotels." });
  }
});

/**
 * Fetches hotels by its rating
 * @param {number} rating - The rating of the hotels to fetch.
 *
 */
app.get("/hotels/rating/:rating", async (req, res) => {
  const rating = parseFloat(req.params.rating);
  try {
    const hotels = await Hotels.find({ rating: rating });
    if (hotels.length > 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "No hotels found with that rating." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the hotels." });
  }
});

/**
 * Fetches hotels by its category
 * @param {string} category - The category of the hotels to fetch.
 */
app.get("/hotels/category/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const hotels = await Hotels.find({ category: category });
    if (hotels.length > 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "No hotels found with that category." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the hotels." });
  }
});

module.exports = app;
