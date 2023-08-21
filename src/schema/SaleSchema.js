const Joi = require('joi');

const {SALE_STATES, DELIVERY_TYPE, PAYMENT_METHOD} = require('../config/default');

const productSchema = Joi.object({
  product_id:  Joi.number().required(),
  quantity: Joi.number().required()
});

const postSaleSchema = Joi.object({
  delivery_type: Joi.string().valid(...DELIVERY_TYPE),
  payment_method: Joi.string().valid(...PAYMENT_METHOD),
  user_id: Joi.number().integer(),
  user_date: Joi.date(),
  products: Joi.array().items(productSchema).required()
});

const putSaleSchema = Joi.object({
  state: Joi.string().valid(...SALE_STATES)
});

module.exports = {postSaleSchema, putSaleSchema};
