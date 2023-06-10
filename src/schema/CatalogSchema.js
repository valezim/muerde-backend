const Joi = require('joi');

const postCatalogSchema = Joi.object({
  type: Joi.string().required(),
});

const putCatalogSchema = Joi.object({
    type: Joi.string().required(),
});

module.exports = {postCatalogSchema, putCatalogSchema};