class IngredientModel {
  constructor(ingredientData = {}) {
    this.idIngredient = ingredientData.idIngredient;
    this.name = ingredientData.name;
    this.unit = ingredientData.unit;
    this.lastPurchaseCost = ingredientData.lastPurchaseCost;
    this.totalQuantity = ingredientData.totalQuantity;
  }
}

module.exports = IngredientModel;
