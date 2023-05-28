const Joi = require('joi');

const ingredientSchema = Joi.object({
  ingredient_id: Joi.number().required(),
  quantity: Joi.number().required(),
});

const postRecipeSchema = Joi.object({
  name: Joi.string().required(),
  instructions: Joi.string().required(),
  preparation_time_minutes: Joi.number().integer().positive().required(),
  ingredients: Joi.array().items(ingredientSchema).required(),
});

const putRecipeSchema = Joi.object({
  name: Joi.string(),
  instructions: Joi.string(),
  preparation_time_minutes: Joi.number().integer().positive(),
  ingredients: Joi.array().items(ingredientSchema),
});

module.exports = {postRecipeSchema, putRecipeSchema};
