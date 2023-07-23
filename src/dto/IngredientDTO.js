
class IngredientDTO {
  constructor(ingredientData = {}) {
    this.idIngredient = ingredientData.idIngredient;
    this.name = ingredientData.name;
    this.unit = ingredientData.unit;
    this.lastPurchaseCost = ingredientData.lastPurchaseCost;
    this.totalQuantity = ingredientData.totalQuantity;
    this.lastPurchaseDate = ingredientData.lastPurchaseDate;
    this.recipie_using_count = ingredientData.RecipeIngredient?.length;
    this.stock_percentage_status = this.getStockPercentageStatus(ingredientData);
  }

  getStockPercentageStatus(ingredientData) {
    if (ingredientData.totalQuantity === 0) return 0;
    const requiredQuantity = ingredientData.RecipeIngredient.reduce((sum, recipeIngredient) => {
      return sum + recipeIngredient.quantity * 5;
    }, 0);

    let stockPercentageStatus;
    if (requiredQuantity === 0) {
      stockPercentageStatus = 100;
    } else {
      stockPercentageStatus = (ingredientData.totalQuantity / requiredQuantity) * 100;
      stockPercentageStatus = Math.min(stockPercentageStatus, 100);
    }

    return Math.floor(stockPercentageStatus);
  }
}

module.exports = IngredientDTO;
