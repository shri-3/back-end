const mongoose = require("mongoose");

const CUISINE_ENUM = [
  "American",
  "Italian",
  "Chinese",
  "Indian",
  "Japanese",
  "Mexican",
  "Thai",
  "French",
  "Mediterranean",
  "Greek",
  "Spanish",
  "Other",
];

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    cuisine: [
      {
        type: String,
        enum: CUISINE_ENUM,
      },
    ],
    location: { type: String, required: true, trim: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [{ type: String, trim: true }],
    website: { type: String },
    phoneNumber: { type: String, required: true, trim: true },
    openHours: { type: String, required: true, trim: true },
    priceRange: {
      type: String,
      enum: ["$ (0-10)", "$$ (11-30)", "$$$ (31-60)", "$$$$ (61+)", "Other"],
    },
    reservationsNeeded: { type: Boolean, default: false },
    isDeliveryAvailable: { type: Boolean, default: false },
    menuUrl: { type: String },
    photoUrls: [{ type: String }],
  },
  { timestamps: false },
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
