const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, BE3.2_HW1 Express JS!");
});

const books = [
  {
    id: 2,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
  },

  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { id: 4, title: "1984", author: "George Orwell", year: 1949 },
];

app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  console.log(bookId);

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    const deletedBook = books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully.", book: deletedBook[0] });
  } else {
    res.status(404).json({ error: "Book not found." });
  }
});

app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedData = req.body;

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], ...updatedData };
    res.json({ message: "Book updated successfully.", book: books[bookIndex] });
  } else {
    res.status(404).json({ error: "Book not found." });
  }
});

app.post("/books", (req, res) => {
  const newBook = req.body;
  if (!newBook.title || !newBook.author || !newBook.year) {
    res.status(400).json({ error: "Title, author and year are required." });
  } else {
    books.push(newBook);
    res
      .status(201)
      .json({ message: "Book added successfully.", book: newBook });
  }
});

app.get("/books", (req, res) => {
  res.json(books);
});

const todos = [
  { id: 1, title: "Water the plants", day: "Saturday" },
  { id: 2, title: "Go for a walk", day: "Sunday" },
];

app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  console.log(todoId);

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    const deletedTodo = todos.splice(todoIndex, 1);
    res.json({ message: "Todo does not exist.", todo: deletedTodo[0] });
  } else {
    res.status(404).json({ error: "Todo not found." });
  }
});

/**
 * Fetches a todo by its ID and updates its details.
 * @param {number} id - The ID of the todo to update.
 * @param {object} updatedData - The updated data for the todo.
 */

app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedData = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], ...updatedData };
    res.json({ message: "Todo updated successfully.", todo: todos[todoIndex] });
  } else {
    res.status(404).json({ error: "Todo not found." });
  }
});

app.post("/todos", (req, res) => {
  const newTodo = req.body;
  if (!newTodo.title || !newTodo.day) {
    res.status(400).json({ error: "Title and day are required." });
  } else {
    todos.push(newTodo);
    res
      .status(201)
      .json({ message: "Todo added successfully.", todo: newTodo });
  }
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

module.exports = app;
