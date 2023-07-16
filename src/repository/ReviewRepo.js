const BaseRepo = require('./BaseRepo');

class ReviewRepo extends BaseRepo {
    constructor() {
        super();
    }

    async getReviews() {
        try {
            const reviews = await this.db.review.findMany({
                select: {
                    idReview: true,
                    score: true,
                    description: true,
                    userId: true,
                    saleId: true,
                }
            });
            return reviews;
        } catch (error) {
            console.log(`Error - ReviewRepo :: getReviews - ${error.stack}`);
            throw error;
        }
    }

    async saveReview(newReview) {
        const review = newReview.review;

        try {
            const reviewSaved = await this.db.review.create({
                data: {
                    score: review.score,
                    description: review.description,        
                    userId: review.userId,
                    saleId: review.saleId,
                }
            });
            return reviewSaved;
        } catch (error) {
            console.log(`Error - ReviewRepo :: saveReview - ${error.stack}`);
            throw error;
        }
    }
}

module.exports = new ReviewRepo();