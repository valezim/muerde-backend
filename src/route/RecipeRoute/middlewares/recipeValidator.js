const {
  postRecipeSchema,
  putRecipeSchema,
} = require('../../../schema/RecipeSchema');

const validatePostRecipe = (req, res, next) => {
  const {error} = postRecipeSchema.validate(req.body.recipe);
  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }
  next();
};

const validatePutRecipe = (req, res, next) => {
  const {error} = putRecipeSchema.validate(req.body.recipe);
  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }
  next();
};

module.exports = {
  validatePostRecipe,
  validatePutRecipe,
};
