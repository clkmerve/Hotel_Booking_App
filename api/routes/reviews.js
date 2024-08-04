const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Yorum ekleme
router.post("/", async (req, res) => {
  try {
    const { hotelId, username, reviewText, rating } = req.body;
    const review = new Review({ hotelId, username, reviewText, rating });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(400).json({ message: error.message });
  }
});

// Belirli bir otelin yorumlarını getirme
router.get("/:hotelId", async (req, res) => {
  try {
    const reviews = await Review.find({ hotelId: req.params.hotelId });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: error.message });
  }
});

// Yorum silme
router.delete("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
