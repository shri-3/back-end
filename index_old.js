const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/about", (req, res) => {
  res.send("Welcome to the About Page");
});
app.get("/contact", (req, res) => {
  res.send("Welcome to the Contact Page");
});

const PORT = process.env.PORT || 50001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
