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
        error: error.name || 'Unexpected error while trying to create Ingredient',
      });
    }
  }

  static async putIngredient(req, res) {
    try {
      const idIngredient = req.params.id ?? 0;
      const ingredient = req.body.ingredient;

      if (idIngredient === 0) return res.status(400).json({error: 'Ingredient id is required'});

      const updatedIngredient = await IngredientService.putIngredient({...ingredient, idIngredient});

      return res.json({...updatedIngredient});
    } catch (error) {
      console.log(`Error - IngredientController :: putIngredient - ${error}`);
      return res.status(error.status || 500).json({
        error: error.name || 'Unexpected error while trying to update Ingredient',
      });
    }
  }

  static async getAllIngredients(req, res) {
    try {
      const ingredients = await IngredientService.getAllIngredients();
      return res.json({ingredients});
    } catch (error) {
      console.log(`Error - IngredientController :: getAllIngredients - ${error}`);
      return res.status(error.status || 500).json({
        error: error.name || 'Unexpected error while trying to get all ingredients',
      });
    }
  }

  static async getIngredientById(req, res) {
    try {
      const idIngredient = req.params.id ?? 0;

      if (idIngredient === 0) return res.status(400).json({error: 'Ingredient id is required'});
      const ingredient = await IngredientService.getIngredientById({idIngredient});
      return res.json({...ingredient});
    } catch (error) {
      console.log(`Error - IngredientController :: getIngredientById - ${error}`);
      return res.status(error.status || 500).json({
        error: error.name || 'Unexpected error while trying to get ingredient',
      });
    }
  }

  static async deleteIngredient(req, res) {
    try {
      const idIngredient = req.params.id ?? 0;

      if (idIngredient === 0) return res.status(400).json({error: 'Ingredient id is required'});
      await IngredientService.deleteIngredient({idIngredient});
      return res.json({message: `Ingredient with id ${idIngredient} deleted successfully.`});
    } catch (error) {
      console.log(`Error - IngredientController :: deleteIngredient - ${error}`);
      return res.status(error.status || 500).json({
        error: error.name || 'Unexpected error while trying to delete ingredient',
      });
    }
  }
}

module.exports = IngredientController;
