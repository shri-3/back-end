const express = require("express");
const app = express();
app.use(express.json());

const connectDB = require("./db/db.connect");
const Books = require("./models/books.model");

connectDB();

app.post("/books", async (req, res) => {
  const newBook = req.body;
  if (!newBook.title || !newBook.author || !newBook.publishedYear) {
    res.status(400).json({ error: "Title, author and year are required." });
  } else {
    try {
      const createdBook = await Books.create(newBook);
      res
        .status(201)
        .json({ message: "Book added successfully.", book: createdBook });
    } catch (error) {
      res.status(500).json({ error: "Failed to add the book." });
    }
  }
});

app.get("/books", async (req, res) => {
  try {
    const allBooks = await Books.find();
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve books." });
  }
});

/**
 * Fetches a book by its Title from the database
 * @param {string} title - The title of the book to fetch.
 */
app.get("/books/:title", async (req, res) => {
  const bookTitle = req.params.title;

  if (!bookTitle) {
    return res.status(400).json({ error: "Invalid book title." });
  } else {
    try {
      const book = await Books.findOne({ title: bookTitle });
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: "Book not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the book." });
    }
  }
});

/**
 * Fetches a book by its author from the database
 * @param {string} author - The author of the book to fetch.
 */
app.get("/books/author/:author", async (req, res) => {
  const bookAuthor = req.params.author;

  if (!bookAuthor) {
    return res.status(400).json({ error: "Invalid book author." });
  } else {
    try {
      const booksByAuthor = await Books.findOne({ author: bookAuthor });
      if (booksByAuthor) {
        res.json(booksByAuthor);
      } else {
        res.status(404).json({ error: "No books found for the given author." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the books." });
    }
  }
});

/**
 * Fetches a book by its books which are of "Business" genre.
 * @returns {object} - The book with the "Business" genre.
 */
app.get("/books/genre/business", async (req, res) => {
  try {
    const businessBooks = await Books.find({ genre: "Business" });
    if (businessBooks.length > 0) {
      res.json(businessBooks);
    } else {
      res.status(404).json({ error: "No books found in the Business genre." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the books." });
  }
});

/**
 * Fetches a book by its published year which is 2020.
 * @returns {object} - The book published in the year 2020.
 */
app.get("/books/year/2012", async (req, res) => {
  try {
    const books2020 = await Books.find({ publishedYear: 2012 });
    if (books2020.length > 0) {
      res.json(books2020);
    } else {
      res
        .status(404)
        .json({ error: "No books found published in the year 2020." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the books." });
  }
});

/**
 * Update a book's rating with the help of its id. Update the rating of the "Lean In" from 4.1 to 4.5.
 * Send an error message "Book does not exist", in case that book is not found.
 * @param {number} id - The ID of the book to update.
 * @param {number} rating - The new rating for the book.
 */
app.put("/books/rating/:id", async (req, res) => {
  const bookId = req.params.id;
  const newRating = req.body.ratings;

  try {
    const updatedBook = await Books.findByIdAndUpdate(
      bookId,
      { ratings: newRating },
      { new: true },
    );
    if (updatedBook) {
      res.json({
        message: "Book rating updated successfully.",
        book: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the book." });
  }
});

/**
 * Update a book's rating with the help of its title. Update the details of the book "Shoe Dog".
 * @param {string} title - The title of the book to update.
 * @param {number} rating - The new rating for the book.
 */
app.put("/books/rating/title/:title", async (req, res) => {
  const bookTitle = req.params.title;
  const newRequestData = req.body;

  try {
    const updatedBook = await Books.findOneAndUpdate(
      { title: bookTitle },
      newRequestData,
      { new: true },
    );
    if (updatedBook) {
      res.json({
        message: "Book details updated successfully.",
        book: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the book." });
  }
});

/**
 * Fetches a book by its id from the database and deletes the book.
 * @param {number} id - The ID of the book to delete.
 */
app.delete("/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await Books.findByIdAndDelete(bookId);
    if (deletedBook) {
      res.json({
        message: "Book deleted successfully.",
        book: deletedBook,
      });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the book." });
  }
});

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

// app.post("/books", (req, res) => {
//   const newBook = req.body;
//   if (!newBook.title || !newBook.author || !newBook.year) {
//     res.status(400).json({ error: "Title, author and year are required." });
//   } else {
//     books.push(newBook);
//     res
//       .status(201)
//       .json({ message: "Book added successfully.", book: newBook });
//   }
// });

const todos = [
  { id: 1, title: "Water the plants", day: "Saturday" },
  { id: 2, title: "Go for a walk", day: "Sunday" },
];

app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);

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
