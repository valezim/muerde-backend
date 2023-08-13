const Joi = require('joi');

const postProductSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  tags: Joi.string().required(),
  status: Joi.string(),
  image: Joi.string().required(),
  catalog_id: Joi.number().required(),
  recipe_id: Joi.number().required(),
});

const putProductSchema = Joi.object({
  title: Joi.string(),
  price: Joi.number(),
  description: Joi.string(),
  tags: Joi.string(),
  image: Joi.string(),
  catalog_id: Joi.number(),
  status: Joi.string(),
});

module.exports = { postProductSchema, putProductSchema };
