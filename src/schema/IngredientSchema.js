const Joi = require('joi');
const {UNIT_MEASURES} = require('../config/default');

const postIngredientSchema = Joi.object({
  name: Joi.string().required(),
  unit: Joi.string().required().valid(...UNIT_MEASURES),
});

const putIngredientSchema = Joi.object({
  name: Joi.string(),
  unit: Joi.string().valid(...UNIT_MEASURES),
  last_purchase_cost: Joi.number().positive(),
  total_quantity: Joi.number().positive(),
});

module.exports = {postIngredientSchema, putIngredientSchema};
