const ReviewRepo = require('../repository/ReviewRepo');

class ReviewService {
    static async getReviews() {
        try {
            const reviews = await ReviewRepo.getReviews();
            console.log('las review servicio: ', reviews);
            return reviews;
        } catch (error) {
            console.log(`Error - ReviewService :: getReviews - ${error.stack}`);
            throw error;
        }
    }

    static async saveReview(review) {
        try {
            const reviewSaved = await ReviewRepo.saveReview(review);
            return reviewSaved;
        } catch (error) {
            console.log(`Error - ReviewService :: saveReview - ${error.stack}`);
            throw error;
        }
    }
}

module.exports = ReviewService;