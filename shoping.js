// ** working BE3.1_HW2 **

const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello from express server.</h1>");
});
app.get("/signin", (req, res) => {
  res.send("<h1>This is the Sign In page.</h1>");
});
app.get("/booking", (req, res) => {
  res.send("<h1>Book your tickets here</h1>");
});
app.get("/clothing/kids", (req, res) => {
  res.send("<h1>This is the kids wear page</h1>");
});
app.get("/blog", (req, res) => {
  res.send("<h1>This is the blog page</h1>");
});

const PORT = process.env.PORT || 50001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// module.exports = app;
