
class IngredientDTO {
  constructor(ingredientData = {}) {
    this.idIngredient = ingredientData.idIngredient;
    this.name = ingredientData.name;
    this.unit = ingredientData.unit;
    this.lastPurchaseCost = ingredientData.lastPurchaseCost;
    this.totalQuantity = ingredientData.totalQuantity;
    this.lastPurchaseDate = ingredientData.PurchaseIngredientHistory[0]?.purchaseDate;
    this.recipie_using_count = ingredientData.RecipeIngredient?.length;
  }
}

module.exports = IngredientDTO;
