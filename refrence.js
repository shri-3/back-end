const express = require("express");
const app = express();

const connectDB = require("./db/db.connect");
const User = require("./models/users.model");
const Post = require("./models/post.model");

// Connect to the database
connectDB();

/********** USER ROUTES **********/

// Create a new user
app.post("/users", async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    res.status(400).json({ error: "Username and email are required." });
  } else {
    try {
      const newUser = await User.create({ username, email });
      res.status(201).json({
        message: "User created successfully.",
        user: newUser,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create user." });
    }
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

/********** POST ROUTES **********/

// Create a new post
app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    res.status(400).json({
      error: "Title, content and author are required to create a post.",
    });
  } else {
    try {
      const newPost = await Post.create({ title, content, author });
      res.status(201).json({
        message: "Post created successfully.",
        post: newPost,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create post." });
    }
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

module.exports = app;
