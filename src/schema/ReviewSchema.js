const Joi = require('joi');

const postReviewSchema = Joi.object({
  score: Joi.number().required(),
  description: Joi.string().required(),
});

module.exports = {postReviewSchema};
