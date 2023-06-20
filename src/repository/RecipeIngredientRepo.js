const BaseRepo = require('./BaseRepo');

class RecipeIngredientRepo extends BaseRepo {
  constructor() {
    super();
  }

  async save({ingredientId, recipeId, quantity}) {
    console.log("save en recipeingredient repo: ", ingredientId, recipeId, quantity);
    try {
      const newRecipeIngredient = await this.db.RecipeIngredient.create({
        data: {
          recipeId,
          ingredientId,
          quantity,
        },
      });
      console.log("save en recipeingredient repo newRecipeIngredient: ", newRecipeIngredient);
      return newRecipeIngredient;
    } catch (error) {
      console.log(`Error - RecipeIngredientRepo :: save - ${error.stack}`);
      throw error;
    }
  }

  async getByRecipeId(recipeId) {
    try {
      const recipeIngredients = await this.db.RecipeIngredient.findMany({
        where: {
          recipeId: Number(recipeId),
        },
        include: {
          ingredient: true,
        },
      });

      return recipeIngredients;
    } catch (error) {
      console.log(`Error - RecipeIngredientRepo :: getByRecipeId - ${error.stack}`);
      throw error;
    }
  }

  async getAllFromRecipeIdWithIngredients(recipeId) {
    try {
      const recipeIngredients = await this.db.RecipeIngredient.findMany({
        where: {recipeId: recipeId},
        include: {ingredient: true},
      });

      return recipeIngredients;
    } catch (error) {
      console.log(`Error - RecipeIngredientRepo :: getAllFromRecipeIdWithIngredients - ${error.stack}`);
      throw error;
    }
  }

  async getIngredientsFromRecipe(recipeId) {
    try {
      const recipe = await this.db.RecipeIngredient.findMany({
        where: {recipeId: recipeId},
        include: {ingredient: true},
      });

      return recipe;
    } catch (error) {
      console.log(`Error - RecipeIngredientRepo :: getIngredientsFromRecipe - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new RecipeIngredientRepo();
