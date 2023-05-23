const IngredientService = require('../service/IngredientService');

class IngredientController {
  static async postIngredient(req, res) {
    try {
      const newIngredient = req.body.ingredient;
      const createdIngredient = await IngredientService.postIngredient(newIngredient);
      return res.json({...createdIngredient});
    } catch (error) {
      console.log(`Error - IngredientController :: postIngredient - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to create Ingredient',
      });
    }
  }

  static async putIngredient(req, res) {
    try {
      const idIngredient = req.query.id;
      const ingredient = req.body.ingredient;
      const updatedIngredient = await IngredientService.putIngredient({...ingredient, idIngredient});

      return res.json({...updatedIngredient});
    } catch (error) {
      console.log(`Error - IngredientController :: putIngredient - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to update Ingredient',
      });
    }
  }

  static async getIngredients(req, res) {
    try {
      const idIngredient = req.query.id;

      if (idIngredient) {
        const ingredient = await IngredientService.getIngredientById({idIngredient});
        return res.json({...ingredient});
      }
      const ingredients = await IngredientService.getAllIngredients();
      return res.json({ingredients});
    } catch (error) {
      console.log(`Error - IngredientController :: getIngredients - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get ingredients',
      });
    }
  }

  static async deleteIngredient(req, res) {
    try {
      const idIngredient = req.query.id ?? 0;

      if (idIngredient === 0) return res.status(400).json({error: 'Ingredient id is required'});
      await IngredientService.deleteIngredient({idIngredient});
      return res.json({message: `Ingredient with id ${idIngredient} deleted successfully.`});
    } catch (error) {
      console.log(`Error - IngredientController :: deleteIngredient - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to delete ingredient',
      });
    }
  }

  static async postPurchaseIngredient(req, res) {
    try {
      const newPurchaseIngredient = req.body.purchase_ingredient;

      const createdPurchaseIngredient = await IngredientService.postPurchaseIngredient(newPurchaseIngredient);

      return res.json({...createdPurchaseIngredient});
    } catch (error) {
      console.log(`Error - IngredientController :: postPurchaseIngredient - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to create PurchaseIngredientHistory',
      });
    }
  }

  static async getAllPurchasedIngredients(req, res) {
    try {
      const purchasedIngredients = await IngredientService.getAllPurchasedIngredients();
      return res.json({purchased_ingredients: purchasedIngredients});
    } catch (error) {
      console.log(`Error - IngredientController :: getAllPurchasedIngredients - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get all purchased ingredients',
      });
    }
  }
}

module.exports = IngredientController;
