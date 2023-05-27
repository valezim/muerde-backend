const Joi = require('joi');

const postRecipeSchema = Joi.object({
  name: Joi.string().required(),
  instructions: Joi.string().required(),
  preparation_time_minutes: Joi.number().integer().positive().required(),
});

const putRecipeSchema = Joi.object({
  name: Joi.string(),
  instructions: Joi.string(),
  preparation_time_minutes: Joi.number().integer().positive(),
});

module.exports = {postRecipeSchema, putRecipeSchema};
