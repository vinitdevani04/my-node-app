const Review = require('../model/reviewModel');

exports.addReview = async (req, res) => {
    try {
        const { productName, userEmail, rating, comment, imageLinks } = req.body;

        // Validate input
        if (!productName || !userEmail || !rating || !comment) {
            return res.status(400).json({ message: 'All fields (productName, userEmail, rating, comment) are required.' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
        }

        // Create a new review
        const newReview = new Review({
            productName,
            userEmail,
            rating,
            comment,
            images: imageLinks || [], // Use provided image links or default to an empty array
        });

        await newReview.save();
        res.status(201).json({ message: 'Review added successfully.', review: newReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getReviewsByProductName = async (req, res) => {
    try {
        const { productName } = req.params;

        const reviews = await Review.find({ productName });
        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this product.' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReviewsByUserEmail = async (req, res) => {
    try {
        const { userEmail } = req.params;

        const reviews = await Review.find({ userEmail });
        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this user.' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found.' });
        }

        res.status(200).json({ message: 'Review removed successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
