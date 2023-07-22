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

    static async getScoreQuantity(startDate, endDate) {
        try {
            if (!startDate || !endDate) {
                const scoreQuantities = await ReviewRepo.getScoreQuantity();
                return scoreQuantities?.map(({ score, _count }) => ({
                    quantity: _count.idReview,
                    score,
                }));
            }

            if (new Date(endDate) < new Date(startDate)) {
                endDate = startDate;
            }
            const scoreQuantities = await ReviewRepo.getScoreQuantityFromDates(startDate, endDate);
            return scoreQuantities?.map(({ score, _count }) => ({
                quantity: _count.idReview,
                score,
            }));
        } catch (error) {
            console.log(`Error - ReviewService :: getScoreQuantity - ${error.stack}`);
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
