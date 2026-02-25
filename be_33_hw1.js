const express = require("express");
const app = express();
app.use(express.json());

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
    res.json({ message: "Todo deleted successfully.", todo: deletedTodo[0] });
  } else {
    res.status(404).json({ error: "Todo not found." });
  }
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

module.exports = app;
