const humps = require('humps');
const IngredientService = require('../service/IngredientService');
const { UNIT_MEASURES } = require('../config/default');

class IngredientController {
  static async postIngredient(req, res) {
    try {
      const newIngredient = humps.camelizeKeys(req.body.ingredient);
      const createdIngredient = await IngredientService.postIngredient(newIngredient);
      return res.json({ ...humps.decamelizeKeys(createdIngredient) });
    } catch (error) {
      console.log(`Error - IngredientController :: postIngredient - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to create Ingredient',
        stack: error.stack,
      });
    }
  }

  static async putIngredient(req, res) {
    try {
      const idIngredient = req.query.id;
      const ingredient = humps.camelizeKeys(req.body.ingredient);
      const updatedIngredient = await IngredientService.putIngredient({ ...ingredient, idIngredient });

      return res.json({ ...humps.decamelizeKeys(updatedIngredient) });
    } catch (error) {
      console.log(`Error - IngredientController :: putIngredient - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to update Ingredient',
        stack: error.stack,
      });
    }
  }

  static async getIngredients(req, res) {
    try {
      const idIngredient = req.query.id;

      if (idIngredient) {
        const ingredient = await IngredientService.getIngredientById({ idIngredient });
        return res.json({ ...humps.decamelizeKeys(ingredient) });
      }
      const ingredients = await IngredientService.getAllIngredients();
      return res.json({ ingredients: humps.decamelizeKeys(ingredients) });
    } catch (error) {
      console.log(`Error - IngredientController :: getIngredients - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get ingredients',
        stack: error.stack,
      });
    }
  }

  static async deleteIngredient(req, res) {
    try {
      const idIngredient = req.query.id;
      await IngredientService.deleteIngredient({ idIngredient });
      return res.json({ message: `Ingredient with id ${idIngredient} deleted successfully.` });
    } catch (error) {
      console.log(`Error - IngredientController :: deleteIngredient - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to delete ingredient',
        stack: error.stack,
      });
    }
  }

  static async postPurchaseIngredient(req, res) {
    try {
      const newPurchaseIngredient = humps.camelizeKeys(req.body.purchase_ingredient);

      const createdPurchaseIngredient = await IngredientService.postPurchaseIngredient(newPurchaseIngredient);

      return res.json({ ...humps.decamelizeKeys(createdPurchaseIngredient) });
    } catch (error) {
      console.log(`Error - IngredientController :: postPurchaseIngredient - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to create PurchaseIngredientHistory',
        stack: error.stack,
      });
    }
  }

  static async getAllPurchasedIngredients(req, res) {
    try {
      const purchasedIngredients = await IngredientService.getAllPurchasedIngredients();
      return res.json({ purchased_ingredients: humps.decamelizeKeys(purchasedIngredients) });
    } catch (error) {
      console.log(`Error - IngredientController :: getAllPurchasedIngredients - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get all purchased ingredients',
        stack: error.stack,
      });
    }
  }

  static async getAvailableUnitMeasures(req, res) {
    try {
      return res.json({ available_unit_measures: UNIT_MEASURES });
    } catch (error) {
      console.log(`Error - IngredientController :: getAvailableUnitMeasures - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get all available unit measures',
        stack: error.stack,
      });
    }
  }
}

module.exports = IngredientController;
