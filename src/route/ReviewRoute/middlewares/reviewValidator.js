const {
    postReviewSchema,
  } = require('../../../schema/ReviewSchema');
  
  const validatePostReview = (req, res, next) => {
    const {error} = postReviewSchema.validate(req.body.product);
    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }
    next();
  };
  
  module.exports = {
    validatePostReview
  };
  