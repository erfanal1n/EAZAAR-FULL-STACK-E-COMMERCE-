const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { checkDemoMode } = require('../middleware/demoMode');
const { demoProtection } = require('../middleware/demoProtection');
const { addReview, deleteReviews} = require("../controller/review.controller");

// add a review
router.post("/add", demoProtection, verifyToken, checkDemoMode, addReview);
// delete reviews
router.delete("/delete/:id", demoProtection, verifyToken, checkDemoMode, deleteReviews);

module.exports = router;
