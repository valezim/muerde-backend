const Joi = require('joi');

const postRecipeSchema = Joi.object({
  name: Joi.string().required(),
  instructions: Joi.string().required(),
  preparationTimeMinutes: Joi.number().integer().positive().required(),
});

const putRecipeSchema = Joi.object({
  name: Joi.string(),
  instructions: Joi.string(),
  preparationTimeMinutes: Joi.number().integer().positive(),
});

module.exports = {postRecipeSchema, putRecipeSchema};
