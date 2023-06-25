const Joi = require('joi');

const postUserSchema = Joi.object({
  name: Joi.string().required(),
  mail: Joi.string().required(),
  password: Joi.string().required(),
  address: Joi.string().required()
});

module.exports = {postUserSchema};
