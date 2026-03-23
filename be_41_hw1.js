const express = require("express");
const app = express();

const connectDB = require("./db/db.connect");
const Restaurants = require("./models/restaurants.model");

// Connect to the database
connectDB();

/**
 * Creates a new restaurant in the database
 */
app.post("/restaurants", async (req, res) => {
  const newRestaurant = req.body;
  if (
    !newRestaurant.name ||
    !newRestaurant.cuisine ||
    !newRestaurant.location
  ) {
    res.status(400).json({
      error: "Name, cuisine and location are required to create a restaurant.",
    });
  } else {
    try {
      const createdRestaurant = await Restaurants.create(newRestaurant);
      res.status(201).json({
        message: "Restaurant created successfully.",
        restaurant: createdRestaurant,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create restaurant." });
    }
  }
});

/**
 * Fetches a restaurant from the database
 */
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurants.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants." });
  }
});

/**
 * Fetches a restaurant by its id from the database and deletes it
 */
app.delete("/restaurants/:id", async (req, res) => {
  const restaurantId = req.params.id;

  if (!restaurantId) {
    return res.status(400).json({ error: "Invalid restaurant ID." });
  } else {
    try {
      const deletedRestaurant =
        await Restaurants.findByIdAndDelete(restaurantId);
      if (deletedRestaurant) {
        res.json({
          message: "Restaurant deleted successfully.",
          restaurant: deletedRestaurant,
        });
      } else {
        res.status(404).json({ error: "Restaurant not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the restaurant." });
    }
  }
});

/**
 * Fetches a restaurant by its id from the database and updates all the details of the restaurant
 */
app.put("/restaurants/:id", async (req, res) => {
  const restaurantId = req.params.id;
  const updatedRestaurant = req.body;

  if (!restaurantId) {
    return res.status(400).json({ error: "Invalid restaurant ID." });
  } else {
    try {
      const updatedRestaurantDoc = await Restaurants.findByIdAndUpdate(
        restaurantId,
        updatedRestaurant,
        { new: true },
      );
      if (updatedRestaurantDoc) {
        res.json({
          message: "Restaurant updated successfully.",
          restaurant: updatedRestaurantDoc,
        });
      } else {
        res.status(404).json({ error: "Restaurant not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the restaurant." });
    }
  }
});

/**
 * Fetches a restaurant by its restaurantName
 * @param {string} restaurantName - The name of the restaurant to fetch.
 */
app.get("/restaurants/:restaurantName", async (req, res) => {
  const restaurantName = req.params.restaurantName;
  try {
    const restaurant = await Restaurants.findOne({ name: restaurantName });
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the restaurant." });
  }
});

/**
 * Fetches restaurants by its phoneNumber
 * @param {string} phoneNumber - The phone number of the restaurant to fetch.
 */
app.get("/restaurants/directory/:phoneNumber", async (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  try {
    const restaurants = await Restaurants.find({ phoneNumber: phoneNumber });
    if (restaurants.length > 0) {
      res.json(restaurants);
    } else {
      res
        .status(404)
        .json({ error: "No restaurants found with that phone number." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the restaurants." });
  }
});

/**
 * Fetches restaurants by its cuisine
 * @param {string} cuisine - The cuisine of the restaurant to fetch.
 */
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  const cuisine = req.params.cuisine;
  try {
    const restaurants = await Restaurants.find({ cuisine: cuisine });
    if (restaurants.length > 0) {
      res.json(restaurants);
    } else {
      res
        .status(404)
        .json({ error: "No restaurants found with that cuisine." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the restaurants." });
  }
});

/**
 * Fetches restaurants by its restaurantLocation
 * @param {string} restaurantLocation - The location of the restaurant to fetch.
 */
app.get("/restaurants/location/:restaurantLocation", async (req, res) => {
  const restaurantLocation = req.params.restaurantLocation;
  try {
    const restaurants = await Restaurants.find({
      location: restaurantLocation,
    });
    if (restaurants.length > 0) {
      res.json(restaurants);
    } else {
      res
        .status(404)
        .json({ error: "No restaurants found with that location." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the restaurants." });
  }
});

module.exports = app;
