const Joi = require('joi');

const postProductSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  tags: Joi.string().required(),
  status: Joi.string().required(),
  image: Joi.string().required(),
  catalog_id: Joi.number().required(),
  recipe_id: Joi.number().required(),
});

const putProductSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    tags: Joi.string().required(),
    image: Joi.string().required(),
    catalog_id: Joi.number().required(),
    status: Joi.string().required(),
});

module.exports = {postProductSchema, putProductSchema};