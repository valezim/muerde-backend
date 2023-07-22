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
                },
            });
            return reviews;
        } catch (error) {
            console.log(`Error - ReviewRepo :: getReviews - ${error.stack}`);
            throw error;
        }
    }

    async getScoreQuantity() {
        try {
            const scoreQuantity = await this.db.review.groupBy({
                by: ['score'],
                _count: { idReview: true },
                orderBy: {
                    score: 'desc',
                },
            });
            return scoreQuantity;
        } catch (error) {
            console.log(`Error - ReviewRepo :: getScoreQuantity - ${error.stack}`);
            throw error;
        }
    }
    async getScoreQuantityFromDates(startDate, endDate) {
        try {
            const formattedStartDate = new Date(startDate).toISOString();
            const formattedEndDate = new Date(endDate).toISOString();

            const scoreQuantity = await this.db.review.groupBy({
                by: ['score'],
                where: {
                    sale: {
                        finish_date: {
                            gte: formattedStartDate,
                            lte: formattedEndDate,
                        },
                    },
                },
                _count: { idReview: true },
                orderBy: {
                    score: 'desc',
                },
            });
            return scoreQuantity;
        } catch (error) {
            console.log(`Error - ReviewRepo :: getScoreQuantityFromDates - ${error.stack}`);
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
                },
            });
            return reviewSaved;
        } catch (error) {
            console.log(`Error - ReviewRepo :: saveReview - ${error.stack}`);
            throw error;
        }
    }
}

module.exports = new ReviewRepo();
