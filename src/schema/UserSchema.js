const Joi = require('joi');

const postUserSchema = Joi.object({
  name: Joi.string().required(),
  mail: Joi.string().required(),
  password: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
});

const putUserSchema = Joi.object({
  mail: Joi.string(),
  address: Joi.string(),
  phone: Joi.string(),
});

module.exports = {postUserSchema, putUserSchema};
