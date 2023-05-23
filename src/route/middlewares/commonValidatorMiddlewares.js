const Joi = require('joi');

const idSchemaRequired = Joi.object({
  id: Joi.number().integer().required().positive(),
});

const idSchema = Joi.object({
  id: Joi.number().integer().positive(),
});

const generalQueryValidator = (req, res, next) => {
  const {error: queryError} = idSchema.validate(req.query);
  if (queryError) {
    return res.status(400).json({error: queryError.details[0].message});
  }
  next();
};

const generalQueryValidatorIdRequired = (req, res, next) => {
  const {error: queryError} = idSchemaRequired.validate(req.query);
  if (queryError) {
    return res.status(400).json({error: queryError.details[0].message});
  }
  next();
};

module.exports = {
  generalQueryValidator,
  generalQueryValidatorIdRequired,
};
