const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');
// const multer = require('multer');

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Specify the directory for storing images
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });
// const upload = multer({ storage });


router.post('/reviews', reviewController.addReview); // Add a review (by email and product name) // Allow up to 5 images
router.get('/reviews/product/:productName', reviewController.getReviewsByProductName);// Get all reviews for a product (by product name)
router.get('/reviews/user/:userEmail', reviewController.getReviewsByUserEmail);// Get all reviews by user email
router.delete('/reviews/:reviewId', reviewController.removeReview);// Remove a review
router.get('/reviews', reviewController.getAllReviews);// Get all reviews

module.exports = router;
