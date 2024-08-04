const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Types.ObjectId,
      ref: "Hotel",  
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
