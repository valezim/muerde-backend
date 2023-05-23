const {
  postIngredientSchema,
  putIngredientSchema,
} = require('../../../schema/IngredientSchema');

const validatePostIngredient = (req, res, next) => {
  const {error} = postIngredientSchema.validate(req.body.ingredient);
  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }
  next();
};

const validatePutIngredient = (req, res, next) => {
  const {error} = putIngredientSchema.validate(req.body.ingredient);
  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }
  next();
};

module.exports = {
  validatePostIngredient,
  validatePutIngredient,
};
