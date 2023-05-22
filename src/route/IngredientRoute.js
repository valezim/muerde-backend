const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const IngredientController = require('../controller/IngredientController');

router.route('/').post(IngredientController.postIngredient);

router.route('/:id').put(IngredientController.putIngredient);

router.route('/').get(IngredientController.getAllIngredients);

router.route('/:id').get(IngredientController.getIngredientById);

router.route('/:id').delete(IngredientController.deleteIngredient);

module.exports = router;
