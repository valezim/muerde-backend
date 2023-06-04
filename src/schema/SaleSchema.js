const Joi = require('joi');

const {SALE_STATES, DELIVERY_TYPE} = require('../config/default');

const productSchema = Joi.object({
  product_id:  Joi.number().required(),
  quantity: Joi.number().required()
});

const postSaleSchema = Joi.object({
  delivery_type: Joi.string().valid(...DELIVERY_TYPE),
  user_id: Joi.number().integer(),
  products: Joi.array().items(productSchema).required()
});

const putSaleSchema = Joi.object({
  state: Joi.string().valid(...SALE_STATES)
});

module.exports = {postSaleSchema, putSaleSchema};
