const RecipeRepo = require('../repository/RecipeRepo');
const RecipeIngredientRepo = require('../repository/RecipeIngredientRepo');

class RecipeService {
  async postRecipe({name, instructions, preparationTimeMinutes, ingredients = []}) {
    try {
      const preparationTimeMinutesNumber = Number(preparationTimeMinutes);
      const createdRecipe = await RecipeRepo.save({name, instructions, preparationTimeMinutesNumber, ingredients});
      ingredients.forEach((ingredient) => {
        const ingredientIdNumber = Number(ingredient.ingredientId);
        const quantityNumber = Number(ingredient.quantity);
        RecipeIngredientRepo.save({
          ingredientId: ingredientIdNumber,
          recipeId: createdRecipe.idRecipe,
          quantity: quantityNumber,
        });
      });
      return createdRecipe;
    } catch (error) {
      console.log(`Error - RecipeService :: postRecipe - ${error.stack}`);
      throw error;
    }
  }
  
  async putRecipe({idRecipe, name, instructions, preparationTimeMinutes, ingredients}) {
    try {
      const idRecipeNumber = Number(idRecipe);
      const updatedRecipe = await RecipeRepo.update({
        idRecipe: idRecipeNumber,
        name,
        instructions,
        preparationTimeMinutes,
      });
      ingredients.forEach((ingredient) => {
        const ingredientIdNumber = Number(ingredient.ingredientId);
        const quantityNumber = Number(ingredient.quantity);
        RecipeIngredientRepo.update(idRecipeNumber, ingredientIdNumber, quantityNumber);
      });
      return updatedRecipe;
    } catch (error) {
      console.log(`Error - RecipeService :: putRecipe - ${error.stack}`);
      throw error;
    }
  }

  async getAllRecipes() {
    try {
      const recipes = await RecipeRepo.getAll();
      return recipes;
    } catch (error) {
      console.log(`Error - RecipeService :: getAllRecipes - ${error.stack}`);
      throw error;
    }
  }

  async getRecipeById({idRecipe}) {
    try {
      const idRecipeNumber = Number(idRecipe);
      const recipe = await RecipeRepo.getById({idRecipe: idRecipeNumber});
      return recipe;
    } catch (error) {
      console.log(`Error - RecipeService :: getRecipeById - ${error.stack}`);
      throw error;
    }
  }

  async deleteRecipe({idRecipe}) {
    try {
      const idRecipeNumber = Number(idRecipe);
      await RecipeRepo.delete({idRecipe: idRecipeNumber});
    } catch (error) {
      console.log(`Error - RecipeService :: deleteRecipe - ${error.stack}`);
      throw error;
    }
  }

  async getRecipeIngredients(idRecipe) {
    try {
      const recipeIngredients = await RecipeIngredientRepo.getByRecipeId(idRecipe);
      return recipeIngredients;
    } catch (error) {
      console.log(`Error - RecipeService :: getRecipeIngredients - ${error.stack}`);
      throw error;
    }
  }

  async getRecipesWithoutProducts() { 
    try {
      const recipesWithoutProducts = await RecipeRepo.getRecipesWithoutProducts();
      return recipesWithoutProducts;
    } catch (error) {
      console.log(`Error - RecipeService :: getRecipesWithoutProducts - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new RecipeService();
