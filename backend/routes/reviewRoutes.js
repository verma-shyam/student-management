const express = require("express");
const router = express.Router();
const {
  submitReview,
  getAllReviews,
  getReviewsByStudent,
} = require("../controllers/reviewController");

router.post("/", submitReview);
router.get("/", getAllReviews);
router.get("/student/:studentId", getReviewsByStudent);

module.exports = router;
