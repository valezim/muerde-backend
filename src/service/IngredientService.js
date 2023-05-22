const IngredientRepo = require('../repository/IngredientRepo');
const IngredientModel = require('../model/IngredientModel');

class IngredientService {
  async postIngredient({name, unit}) {
    try {
      const ingredientModel = new IngredientModel({name, unit, totalQuantity: 0});
      const createdIngredient = await IngredientRepo.save(ingredientModel);
      return createdIngredient;
    } catch (error) {
      console.log(`Error - IngredientService :: postIngredient - ${error.stack}`);
      throw error;
    }
  }

  async putIngredient({idIngredient, name, unit, lastPurchaseCost, totalQuantity}) {
    try {
      const idIngredientNumber = Number(idIngredient);
      const ingredientModel = new IngredientModel({
        idIngredient: idIngredientNumber,
        name,
        unit,
        lastPurchaseCost,
        totalQuantity,
      });
      const updatedIngredient = await IngredientRepo.update(ingredientModel);
      return updatedIngredient;
    } catch (error) {
      console.log(`Error - IngredientService :: putIngredient - ${error.stack}`);
      throw error;
    }
  }

  async getAllIngredients() {
    try {
      const ingredients = await IngredientRepo.getAll();
      return ingredients;
    } catch (error) {
      console.log(`Error - IngredientService :: getAllIngredients - ${error.stack}`);
      throw error;
    }
  }

  async getIngredientById({idIngredient}) {
    try {
      const idIngredientNumber = Number(idIngredient);
      const ingredient = await IngredientRepo.getById({idIngredient: idIngredientNumber});
      return ingredient;
    } catch (error) {
      console.log(`Error - IngredientService :: getIngredientById - ${error.stack}`);
      throw error;
    }
  }

  async deleteIngredient({idIngredient}) {
    try {
      const idIngredientNumber = Number(idIngredient);
      await IngredientRepo.delete({idIngredient: idIngredientNumber});
    } catch (error) {
      console.log(`Error - IngredientService :: deleteIngredient - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new IngredientService();
