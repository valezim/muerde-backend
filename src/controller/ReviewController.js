const humps = require('humps');
const ReviewService = require('../service/ReviewService');

class ReviewController {
    static async getReviews(req, res) {
        try {
            const reviews = await ReviewService.getReviews();
            return res.json(humps.decamelizeKeys(reviews));
        } catch (error) {
            console.log(`Error - ReviewController :: getReviews - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to get reviews',
                stack: error.stack,
            });
        }
    }

    static async getScoreQuantity(req, res) {
        try {
            const { start, end } = req.query;
            const scoreQuantitys = await ReviewService.getScoreQuantity(start, end);
            return res.json({ review_score_quantity: humps.decamelizeKeys(scoreQuantitys) });
        } catch (error) {
            console.log(`Error - ReviewController :: getScoreQuantity - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to get review score quantity',
                stack: error.stack,
            });
        }
    }

    static async saveReview(req, res) {
        try {
            const review = await ReviewService.saveReview(req.body);
            return res.json(humps.decamelizeKeys(review));
        } catch (error) {
            console.log(`Error - ReviewController :: saveReview - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to save review',
                stack: error.stack,
            });
        }
    }

    static async getProductInfoWithReviewSummary(req, res) {
        try {
            const { product } = req.query;
            const getProductInfoWithReviewSummary = await ReviewService.getProductInfoWithReviewSummary(product);
            return res.json(humps.decamelizeKeys(getProductInfoWithReviewSummary));
        } catch (error) {
            console.log(`Error - ReviewController :: getProductInfoWithReviewSummary - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to get product info with review summary',
                stack: error.stack,
            });
        }
    }
}

module.exports = ReviewController;
