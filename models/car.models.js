const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  releaseYear: Number,
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
