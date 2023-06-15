const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  validatePostRecipe,
  validatePutRecipe,
} = require('./middlewares/recipeValidator');

const {
  generalQueryValidator,
  generalQueryValidatorIdRequired} = require('../middlewares/commonValidatorMiddlewares');

const RecipeController = require('../../controller/RecipeController');

router.route('/').post(validatePostRecipe, RecipeController.postRecipe);

router.route('/').put(generalQueryValidatorIdRequired, validatePutRecipe, RecipeController.putRecipe);

router.route('/').get(generalQueryValidator, RecipeController.getRecipes);

router.route('/').delete(generalQueryValidatorIdRequired, RecipeController.deleteRecipe);

router.route('/ingredients').get(generalQueryValidator, RecipeController.getRecipeIngredients);

router.route('/withoutProducts').get(generalQueryValidator, RecipeController.getRecipesWithoutProducts);

module.exports = router;
