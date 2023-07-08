const IngredientRepo = require('../repository/IngredientRepo');
const PurchaseIngredientHistoryRepo = require('../repository/PurchaseIngredientHistoryRepo');
const DynamicProductStockService = require('./DynamicProductStockService');
const IngredientDTO = require('../dto/IngredientDTO');

class IngredientService {
  async postIngredient({ name, unit }) {
    try {
      const createdIngredient = await IngredientRepo.save({ name, unit, totalQuantity: 0 });
      return createdIngredient;
    } catch (error) {
      console.log(`Error - IngredientService :: postIngredient - ${error.stack}`);
      throw error;
    }
  }
  async putIngredient({ idIngredient, name, unit, lastPurchaseCost, totalQuantity }) {
    try {
      const idIngredientNumber = Number(idIngredient);
      const updatedIngredient = await IngredientRepo.update({
        idIngredient: idIngredientNumber,
        name,
        unit,
        lastPurchaseCost,
        totalQuantity,
      });
      return updatedIngredient;
    } catch (error) {
      console.log(`Error - IngredientService :: putIngredient - ${error.stack}`);
      throw error;
    }
  }

  async getAllIngredients() {
    try {
      const ingredients = await IngredientRepo.getAll();
      const ingredientsDTO = ingredients.map((ingredient) => new IngredientDTO(ingredient));
      return ingredientsDTO;
    } catch (error) {
      console.log(`Error - IngredientService :: getAllIngredients - ${error.stack}`);
      throw error;
    }
  }

  async getIngredientById({ idIngredient }) {
    try {
      const idIngredientNumber = Number(idIngredient);
      const ingredient = await IngredientRepo.getById({ idIngredient: idIngredientNumber });
      return ingredient;
    } catch (error) {
      console.log(`Error - IngredientService :: getIngredientById - ${error.stack}`);
      throw error;
    }
  }

  async deleteIngredient({ idIngredient }) {
    try {
      const idIngredientNumber = Number(idIngredient);
      await IngredientRepo.delete({ idIngredient: idIngredientNumber });
    } catch (error) {
      console.log(`Error - IngredientService :: deleteIngredient - ${error.stack}`);
      throw error;
    }
  }

  async postPurchaseIngredient({ quantity, cost, ingredientId }) {
    try {
      const createdPurchaseIngredient = await PurchaseIngredientHistoryRepo.save({ quantity, cost, ingredientId });
      const ingredient = await IngredientRepo.getById({ idIngredient: ingredientId });
      await IngredientRepo.update({
        totalQuantity: ingredient.totalQuantity + createdPurchaseIngredient.quantity,
        lastPurchaseCost: createdPurchaseIngredient.cost / createdPurchaseIngredient.quantity,
        lastPurchaseDate: createdPurchaseIngredient.purchaseDate,
        idIngredient: ingredientId,
      });
      await DynamicProductStockService.updateProductOOSByIngredient(ingredientId);
      return createdPurchaseIngredient;
    } catch (error) {
      console.log(`Error - IngredientService :: postPurchaseIngredient - ${error.stack}`);
      throw error;
    }
  }

  async getAllPurchasedIngredients() {
    try {
      const purchasedIngredients = await PurchaseIngredientHistoryRepo.getAll();
      return purchasedIngredients;
    } catch (error) {
      console.log(`Error - IngredientService :: getAllPurchasedIngredients - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new IngredientService();
