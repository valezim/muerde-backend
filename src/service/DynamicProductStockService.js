const IngredientRepo = require('../repository/IngredientRepo');
const RecipeIngredientRepo = require('../repository/RecipeIngredientRepo');
const RecipeRepo = require('../repository/RecipeRepo');
const ProductRepo = require('../repository/ProductRepo');
const {PRODUCT_STATUS_TYPES} = require('../config/default');

class DynamicProductStockService {
  async changeProductStatusToEnabledIfNeeded(recipeId, recipeIngredients) {
    const productFromRecipe = await ProductRepo.getByRecipeId({recipeId});

    if (
      productFromRecipe?.status === PRODUCT_STATUS_TYPES.OUT_OF_STOCK &&
      recipeIngredients.every((recipeIngredient) => {
        return (
          recipeIngredient.ingredient.totalQuantity &&
          recipeIngredient.quantity <= recipeIngredient.ingredient.totalQuantity
        );
      })
    ) {
      const updatedProduct = await ProductRepo.update({
        idProduct: productFromRecipe.idProduct, status: 'ENABLED',
      });
      console.log(`Product with ID ${updatedProduct.idProduct} is now ENABLED`);
    }
  }

  async checkProductNewStatusFromRecipe(recipe, ingredientId) {
    const recipeIngredients = await RecipeIngredientRepo.getAllFromRecipeIdWithIngredients(recipe.idRecipe);

    // Check if recipe is considered Out of Stock according to
    // required ingredients quantity and updated ingredients totalQuantity
    const outOfStock = recipeIngredients.some((recipeIngredient) => {
      return (
        recipeIngredient.ingredient.idIngredient === ingredientId &&
        recipeIngredient.quantity > (recipeIngredient.ingredient.totalQuantity || 0)
      );
    });

    // if recipe is considered Out of Stock, change product status to OUT_OF_STOCK.
    // if not, check if status should be changed to ENABLED.
    if (outOfStock) {
      const updatedProduct = await ProductRepo.updateStatusByRecipeId(
          recipe.idRecipe, PRODUCT_STATUS_TYPES.OUT_OF_STOCK,
      );
      console.log(`Product with ID ${updatedProduct.idProduct} is now OUT_OF_STOCK`);
    } else {
      this.changeProductStatusToEnabledIfNeeded(recipe.idRecipe, recipeIngredients);
    }
  }

  async updateProductStatusByIngredient(ingredientId) {
    const ingredientWithRecipe = await IngredientRepo.getByIdWithRecipe({idIngredient: ingredientId});

    const allRecipesFromIngredient = ingredientWithRecipe.RecipeIngredient.map(
        (recipeIngredient) => recipeIngredient.recipe,
    );

    allRecipesFromIngredient.forEach(async (recipe) => {
      this.checkProductNewStatusFromRecipe(recipe, ingredientId);
    });
  }

  async updateProductStatusByProductId(productId) {
    const product = await ProductRepo.getById({idProduct: productId});
    const recipe = await RecipeRepo.getByProductId({productId});

    if (!recipe) {
      console.log(`No recipe found for product with ID ${productId}`);
      return;
    }

    const recipeIngredients = await RecipeIngredientRepo.getAllFromRecipeIdWithIngredients(recipe.idRecipe);

    const outOfStock = recipeIngredients.some((recipeIngredient) => {
      return (
        recipeIngredient.quantity > (recipeIngredient.ingredient.totalQuantity || 0)
      );
    });

    if (outOfStock) {
      if (product.status !== PRODUCT_STATUS_TYPES.OUT_OF_STOCK) {
        const updatedProduct = await ProductRepo.update(
            {idProduct: productId, status: PRODUCT_STATUS_TYPES.OUT_OF_STOCK},
        );
        console.log(`Product with ID ${updatedProduct.idProduct} is now OUT_OF_STOCK`);
      }
    } else {
      this.changeProductStatusToEnabledIfNeeded(recipe.idRecipe, recipeIngredients);
    }
  }

  async isRecipeAvailableFromIngredientsStock(recipeId) {
    let isAvailable = true;
    const ingredientsFromRecipe = await RecipeIngredientRepo.getIngredientsFromRecipe(recipeId);
    ingredientsFromRecipe.forEach((recipeIngredient) => {
      const {ingredient, quantity} = recipeIngredient;
      if (!ingredient.totalQuantity || ingredient.totalQuantity < quantity) {
        isAvailable = false; // If any ingredient has insufficient quantity, recipe is not available to use
      }
    });
    return isAvailable;
  }
}

module.exports = new DynamicProductStockService();
