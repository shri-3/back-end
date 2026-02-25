const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Budget", "Mid-Range", "Luxury", "Boutique", "Resort", "Other"],
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: String,
        trim: true,
      },
    ],
    website: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    checkInTime: {
      type: String,
      required: true,
      trim: true,
    },
    checkOutTime: {
      type: String,
      required: true,
      trim: true,
    },
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
    priceRange: {
      type: String,
      enum: ["$$ (11-30)", "$$$ (31-60)", "$$$$ (61-120)", "Other"],
    },
    reservationNeeded: {
      type: Boolean,
      default: false,
    },
    isParkingAvailable: {
      type: Boolean,
      default: false,
    },
    isWiFiAvailable: {
      type: Boolean,
      default: false,
    },
    isPoolAvailable: {
      type: Boolean,
      default: false,
    },
    isSpaAvailable: {
      type: Boolean,
      default: false,
    },
    isResturantAvailable: {
      type: Boolean,
      default: false,
    },
    photo: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
