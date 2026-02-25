// ** working BE3.1_HW1 **

const express = require("express");
require("dotenv").config();
const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello, Express JS!");
// });
app.get("/products", (req, res) => {
  res.send("<h1>Browse our products here</h1>");
});
app.get("/services", (req, res) => {
  res.send("<h1>Explore our services</h1>");
});
app.get("/faq", (req, res) => {
  res.send("<h1>Frequently Asked Questions</h1>");
});
app.get("/gallery", (req, res) => {
  res.send("<h1>View our gallery</h1>");
});

// const PORT = process.env.PORT || 50001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = app;
