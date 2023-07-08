const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {
  validatePostIngredient,
  validatePutIngredient,
} = require('./middlewares/ingredientValidator');
const {
  validatePostPurchaseIngredient,
} = require('./middlewares/ingredientPurchaseValidator');

const {
  generalQueryValidator,
  generalQueryValidatorIdRequired,
} = require('../middlewares/commonValidatorMiddlewares');

const IngredientController = require('../../controller/IngredientController');

router.route('/').post(validatePostIngredient, IngredientController.postIngredient);

router.route('/').put(generalQueryValidatorIdRequired, validatePutIngredient, IngredientController.putIngredient);

router.route('/').get(generalQueryValidator, IngredientController.getIngredients);

router.route('/').delete(generalQueryValidatorIdRequired, IngredientController.deleteIngredient);

router.route('/purchase').post(validatePostPurchaseIngredient, IngredientController.postPurchaseIngredient);

router.route('/purchase').get(generalQueryValidator, IngredientController.getAllPurchasedIngredients);

router.route('/unit').get(IngredientController.getAvailableUnitMeasures);

module.exports = router;
