const RecipeRepo = require('../repository/RecipeRepo');
const RecipeIngredientRepo = require('../repository/RecipeIngredientRepo');

class RecipeService {
  async postRecipe({name, instructions, preparationTimeMinutes, ingredients = []}) {
    try {
      const createdRecipe = await RecipeRepo.save({name, instructions, preparationTimeMinutes, ingredients});
      ingredients.forEach((ingredient) => {
        RecipeIngredientRepo.save({
          ingredientId: ingredient.ingredientId,
          recipeId: createdRecipe.idRecipe,
          quantity: ingredient.quantity,
        });
      });
      return createdRecipe;
    } catch (error) {
      console.log(`Error - RecipeService :: postRecipe - ${error.stack}`);
      throw error;
    }
  }
  async putRecipe({idRecipe, name, instructions, preparationTimeMinutes}) {
    try {
      const idRecipeNumber = Number(idRecipe);
      const updatedRecipe = await RecipeRepo.update({
        idRecipe: idRecipeNumber,
        name,
        instructions,
        preparationTimeMinutes,
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
    console.log("llega id al servicio ", idRecipe);
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
