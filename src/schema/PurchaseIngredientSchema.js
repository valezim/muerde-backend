const Joi = require('joi');

const postPurchaseIngredientSchema = Joi.object({
  quantity: Joi.number().required().positive(),
  cost: Joi.number().required().positive(),
  ingredient_id: Joi.number().integer().required().positive(),
});

module.exports = {postPurchaseIngredientSchema};
