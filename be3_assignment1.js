const express = require("express");
const app = express();
app.use(express.json());

/**
 * Array to store new album objects added in the POST /albums endpoint.
 */

let albums = [
  { id: 1, title: "Abbey Road", artist: "The Beatles", year: 1969 },

  {
    id: 2,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
  },

  { id: 3, title: "Thriller", artist: "Michael Jackson", year: 1982 },
];

app.post("/albums", (req, res) => {
  const newAlbum = req.body;
  if (!newAlbum.title || !newAlbum.artist || !newAlbum.year) {
    res.status(400).json({ error: "Title, artist and year are required." });
  } else {
    albums.push(newAlbum);
    res
      .status(201)
      .json({ message: "Album added successfully.", album: newAlbum });
  }
});

/**
 * Fetches all albums.
 */
app.get("/albums", (req, res) => {
  res.send(albums);
});

/**
 * Fetches a album by its ID and updates its details.
 * @param {number} id - The ID of the album to update.
 */
app.put("/albums/:id", (req, res) => {
  const albumId = parseInt(req.params.id);
  const updatedAlbum = req.body;

  const albumIndex = albums.findIndex((album) => album.id === albumId);

  if (albumIndex !== 0) {
    albums[albumIndex] = { ...albums[albumIndex], ...updatedAlbum };
    res.json({
      message: "Album updated successfully.",
      album: albums[albumIndex],
    });
  } else {
    res.status(404).json({ error: "Album not found." });
  }
});

/**
 * Deletes a album by its ID.
 * @param {number} id - The ID of the album to delete.
 */
app.delete("/albums/:id", (req, res) => {
  const albumId = parseInt(req.params.id);
  console.log(albumId);

  const albumIndex = albums.findIndex((album) => album.id === albumId);

  if (albumIndex !== -1) {
    const deletedAlbum = albums.splice(albumIndex, 1);
    res.json({
      message: "Album deleted successfully.",
      album: deletedAlbum[0],
    });
  } else {
    res.status(404).json({ error: "Album not found." });
  }
});

module.exports = app;
