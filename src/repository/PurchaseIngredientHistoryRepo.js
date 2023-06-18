const BaseRepo = require('./BaseRepo');

class PurchaseIngredientHistoryRepo extends BaseRepo {
  constructor() {
    super();
  }

  async save(purchaseIngredient) {
    try {
      const newPurchaseIngredient = await this.db.PurchaseIngredientHistory.create({
        data: {
          ingredientId: purchaseIngredient.ingredientId,
          purchaseDate: purchaseIngredient.purchaseDate,
          quantity: purchaseIngredient.quantity,
          cost: purchaseIngredient.cost,
        },
      });
      return newPurchaseIngredient;
    } catch (error) {
      console.log(`Error - PurchaseIngredientHistoryRepo :: save - ${error.stack}`);
      throw error;
    }
  }

  async getAll() {
    try {
      const purchaseIngredients = await this.db.PurchaseIngredientHistory.findMany();
      return purchaseIngredients;
    } catch (error) {
      console.log(`Error - PurchaseIngredientHistoryRepo :: getAll - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new PurchaseIngredientHistoryRepo();
