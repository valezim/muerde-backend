const express = require('express');
const router = express.Router();
const {
  validatePostReview,
} = require('./middlewares/reviewValidator');

const {
  generalQueryValidator,
} = require('../middlewares/commonValidatorMiddlewares');

const ReviewController = require('../../controller/ReviewController');

router.route('/').get(generalQueryValidator, ReviewController.getReviews);

router.route('/score').get(ReviewController.getScoreQuantity);

router.route('/product_review_summary').get(ReviewController.getProductInfoWithReviewSummary);

router.route('/').post(validatePostReview, ReviewController.saveReview);

module.exports = router;
