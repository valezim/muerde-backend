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
            });
        }
    }
}

module.exports = ReviewController;