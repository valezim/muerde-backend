const IngredientRepo = require('../repository/IngredientRepo');
const RecipeIngredientRepo = require('../repository/RecipeIngredientRepo');
const RecipeRepo = require('../repository/RecipeRepo');
const ProductRepo = require('../repository/ProductRepo');

class DynamicProductStockService {
  async changeProductOOSToEnabledIfNeeded(recipeId, recipeIngredients) {
    const productFromRecipe = await ProductRepo.getByRecipeId({recipeId});

    if (
      productFromRecipe?.isOutOfStock &&
      recipeIngredients.every((recipeIngredient) => {
        return (
          recipeIngredient.ingredient.totalQuantity &&
          recipeIngredient.quantity <= recipeIngredient.ingredient.totalQuantity
        );
      })
    ) {
      const updatedProduct = await ProductRepo.update({
        idProduct: productFromRecipe.idProduct, isOutOfStock: false,
      });
      console.log(`Product with ID ${updatedProduct.idProduct} is now in stock`);
    }
  }

  async checkProductNewOOSFromRecipe(recipe, ingredientId) {
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
      const updatedProduct = await ProductRepo.updateOOSByRecipeId(
          recipe.idRecipe, true,
      );
      console.log(`Product with ID ${updatedProduct.idProduct} is now OUT_OF_STOCK`);
    } else {
      this.changeProductOOSToEnabledIfNeeded(recipe.idRecipe, recipeIngredients);
    }
  }

  async updateProductOOSByIngredient(ingredientId) {
    const ingredientWithRecipe = await IngredientRepo.getByIdWithRecipe({idIngredient: ingredientId});

    const allRecipesFromIngredient = ingredientWithRecipe.RecipeIngredient.map(
        (recipeIngredient) => recipeIngredient.recipe,
    );

    allRecipesFromIngredient.forEach(async (recipe) => {
      this.checkProductNewOOSFromRecipe(recipe, ingredientId);
    });
  }

  async updateProductOOSByProductId(productId) {
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
      if (!product.isOutOfStock) {
        const updatedProduct = await ProductRepo.update(
            {idProduct: productId, isOutOfStock: true},
        );
        console.log(`Product with ID ${updatedProduct.idProduct} is now OUT_OF_STOCK`);
      }
    } else {
      this.changeProductOOSToEnabledIfNeeded(recipe.idRecipe, recipeIngredients);
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
