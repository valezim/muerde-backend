const {PrismaClient} = require('@prisma/client');

class RecipeIngredientRepo {
  constructor() {
    this.db = new PrismaClient();
  }

  async save({ingredientId, recipeId, quantity}) {
    try {
      const newRecipeIngredient = await this.db.RecipeIngredient.create({
        data: {
          recipeId,
          ingredientId,
          quantity,
        },
      });
      return newRecipeIngredient;
    } catch (error) {
      console.log(`Error - RecipeIngredientRepo :: save - ${error.stack}`);
      throw error;
    }
  }

  // async getByRecipeId(recipeId) {
  //   console.log("llega id al repo ", recipeId);
  //   try {
  //     const recipeIngredients = await this.db.RecipeIngredient.findMany({
  //       where: {
  //         recipeId: Number(recipeId),
  //       },
  //     });
  //     return recipeIngredients;
  //   } catch (error) {
  //     console.log(`Error - RecipeIngredientRepo :: getByRecipeId - ${error.stack}`);
  //     throw error;
  //   }
  // }

  async getByRecipeId(recipeId) {
    console.log("llega id al repo ", recipeId);
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
  
}

module.exports = new RecipeIngredientRepo();
