const ReviewRepo = require('../repository/ReviewRepo');
const ProductService = require('../service/ProductService');

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

    static async getProductInfoWithReviewSummary(productId) {
        try {
            const product = await ProductService.getProductById({ idProduct: productId });
            const reviewSummary = await ReviewRepo.getReviewSummaryFromProduct(productId);
            const scoreQuantity = reviewSummary.reduce((acc, review) => {
                const scoreIndex = acc.findIndex((item) => item.score === review.score);
                if (scoreIndex === -1) {
                    acc.push({ score: review.score, quantity: 1 });
                } else {
                    acc[scoreIndex].quantity += 1;
                }
                return acc;
            }, []);
            scoreQuantity.sort((a, b) => b.score - a.score);
            return { product, review_summary: reviewSummary, score_quantity: scoreQuantity };
        } catch (error) {
            console.log(`Error - ReviewService :: getProductInfoWithReviewSummary - ${error.stack}`);
            throw error;
        }
    }
}

module.exports = ReviewService;
