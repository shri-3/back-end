const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    genre: [
      {
        type: String,
        enum: [
          "Fiction",
          "Autobiography",
          "Non-Fiction",
          "Science Fiction",
          "Biography",
          "Business",
          "Mystery",
          "Fantasy",
          "Historical",
          "Romance",
          "Horror",
          "Thriller",
          "Science",
          "History",
          "Philosophy",
          "Self-help",
          "Other",
        ],
      },
    ],
    language: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      default: "United States",
    },
    ratings: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      trim: true,
    },
    coverImageUrl: { type: String },
  },
  { timestamps: true },
);
const Book = mongoose.model("Book", noteSchema);

module.exports = Book;
