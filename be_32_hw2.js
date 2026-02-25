const express = require("express");
const app = express();
app.use(express.json());
const connectDB = require("./db/db.connect");
const movies = require("./models/movie.models");

connectDB();

app.post("/movies", async (req, res) => {
  const newMovie = req.body;
  if (!newMovie.title || !newMovie.director || !newMovie.releaseYear) {
    res
      .status(400)
      .json({ error: "Title, director and release year are required." });
  } else {
    try {
      const createdMovie = await movies.create(newMovie);
      res
        .status(201)
        .json({ message: "Movie added successfully.", movie: createdMovie });
    } catch (error) {
      res.status(500).json({ error: "Failed to add the movie." });
    }
  }
});

/**
 * Fetches all movies by its id from the database and updates all the details of the movie
 */
app.put("/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  const updatedMovie = req.body;
  console.log(movieId, updatedMovie);

  if (!movieId) {
    return res.status(400).json({ error: "Invalid movie ID." });
  } else {
    try {
      const updatedMovieDoc = await movies.findByIdAndUpdate(
        movieId,
        updatedMovie,
        { new: true },
      );
      if (updatedMovieDoc) {
        res.json({
          message: "Movie updated successfully.",
          movie: updatedMovieDoc,
        });
      } else {
        res.status(404).json({ error: "Movie not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the movie." });
    }
  }
});

app.delete("/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  console.log(movieId);

  if (!movieId) {
    return res.status(400).json({ error: "Invalid movie ID." });
  } else {
    movies
      .findByIdAndDelete(movieId)
      .then((deletedMovie) => {
        if (deletedMovie) {
          res.json({
            message: "Movie deleted successfully.",
            movie: deletedMovie,
          });
        } else {
          res.status(404).json({ error: "Movie not found." });
        }
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: "An error occurred while deleting the movie." });
      });
  }
});

app.get("/movies/:title", async (req, res) => {
  const movieTitle = req.params.title;
  try {
    const movie = await movies.findOne({ title: movieTitle });
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the movie." });
  }
});

app.get("/movies/director/:director", async (req, res) => {
  const directorName = req.params.director;
  try {
    const moviesByDirector = await movies.find({ director: directorName });
    if (moviesByDirector.length > 0) {
      res.json(moviesByDirector);
    } else {
      res.status(404).json({ error: "No movies found for this director." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the movies." });
  }
});

app.get("/movies", async (req, res) => {
  const movie = await movies.find({});
  res.json(movie);
});

const items = [
  { id: 2, itemName: "Spoon", color: "Silver", quantity: 8 },
  { id: 3, itemName: "Fork", color: "Silver", quantity: 8 },
  { id: 4, itemName: "Plate", color: "Off-White", quantity: 6 },
];

app.delete("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  console.log(itemId);

  const itemIndex = items.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1);
    res.json({ message: "Item deleted successfully.", item: deletedItem[0] });
  } else {
    res.status(404).json({ error: "Item not found." });
  }
});

/**
 * Fetches an item by its ID and updates its details.
 * @param {number} id - The ID of the item to update.
 */

app.put("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedData = req.body;

  const itemIndex = items.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    items[itemIndex] = { ...items[itemIndex], ...updatedData };
    res.json({ message: "Item updated successfully.", item: items[itemIndex] });
  } else {
    res.status(404).json({ error: "Item not found." });
  }
});

app.post("/items", (req, res) => {
  const newItem = req.body;
  if (!newItem.itemName || !newItem.color || !newItem.quantity) {
    res
      .status(400)
      .json({ error: "Item name, color and quantity are required." });
  } else {
    items.push(newItem);
    res
      .status(201)
      .json({ message: "Item added successfully.", item: newItem });
  }
});

app.get("/items", (req, res) => {
  res.json(items);
});

const students = [
  { name: "Aarav", grade: "A" },
  { name: "Diya", grade: "B" },
  { name: "Kabir", grade: "A" },
  { name: "Ananya", grade: "C" },
  { name: "Rohan", grade: "B" },
  { name: "Meera", grade: "A" },
];

app.get("/forloop", (req, res) => {
  let result = {};
  for (let i = 0; i < students.length; i++) {
    const grade = students[i].grade;
    if (result[grade]) {
      result[grade]++;
    } else {
      result[grade] = 1;
    }
  }
  // console.log(result);
  res.json(result);
});

module.exports = app;
