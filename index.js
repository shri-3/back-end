const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

const appRouter = require("./app");
const HW1Router = require("./be_32_hw1");
const HW2Router = require("./be_32_hw2");
const BE3Router = require("./be3_assignment1");
const BE4Router = require("./be_41_hw1");
const BE5Router = require("./be_42_hw2");
const BE4Assignment2Router = require("./be4_assignment2");

// const cars = [{ id: 1, make: "Toyota", model: "Camry", year: 2022 }];

const cars = [
  { id: 1, make: "Toyota", model: "Camry", year: 2022 },
  { id: 2, make: "Honda", model: "Civic", year: 2021 },
  { id: 3, make: "Ford", model: "Mustang", year: 2022 },
  { id: 4, make: "Chevrolet", model: "Corvette", year: 2023 },
  { id: 5, make: "Tesla", model: "Model 3", year: 2021 },
  { id: 6, make: "Nissan", model: "Altima", year: 2022 },
  { id: 7, make: "BMW", model: "X5", year: 2023 },
  { id: 8, make: "Mercedes-Benz", model: "C-Class", year: 2021 },
  { id: 9, make: "Audi", model: "A4", year: 2022 },
  { id: 10, make: "Lexus", model: "RX", year: 2023 },
  { id: 11, make: "Hyundai", model: "Tucson", year: 2021 },
  { id: 12, make: "Kia", model: "Seltos", year: 2022 },
  { id: 13, make: "Mazda", model: "CX-5", year: 2023 },
  { id: 14, make: "Subaru", model: "Outback", year: 2021 },
  { id: 15, make: "Volkswagen", model: "Golf", year: 2022 },
];

// app.get("/", (req, res) => {
//   res.send("Hello, Express JS!");
// });
app.use(appRouter);
app.use(HW1Router);
app.use(HW2Router);
app.use(BE3Router);
app.use(BE4Router);
app.use(BE5Router);
app.use(BE4Assignment2Router);

app.delete("/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  console.log(carId);

  const carIndex = cars.findIndex((car) => car.id === carId);

  if (carIndex !== -1) {
    const deletedCar = cars.splice(carIndex, 1);
    res.json({ message: "Car deleted successfully.", car: deletedCar[0] });
  } else {
    res.status(404).json({ error: "Car not found." });
  }
});

app.put("/cars/:id", (req, res) => {
  const carId = parseInt(req.params.id);
  const updatedCar = req.body;

  const carIndex = cars.findIndex((car) => car.id === carId);

  if (carIndex !== -1) {
    cars[carIndex] = { ...cars[carIndex], ...updatedCar };
    res.json({ message: "Car updated successfully.", car: cars[carIndex] });
  } else {
    res.status(404).json({ error: "Car not found." });
  }
});

app.post("/cars", (req, res) => {
  const newCar = req.body;
  if (!newCar.make || !newCar.model || !newCar.year) {
    res.status(400).json({ error: "Make, model and year are required." });
  } else {
    cars.push(newCar);
    res.status(201).json({ message: "Car added successfully.", car: newCar });
  }
});

app.get("/cars", (req, res) => {
  res.send(cars);
});

app.use((req, res, next) => {
  res.status(404).send("<h1>Sorry, the requested resource was not found.</h1>");
});

const PORT = process.env.PORT || 50001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
