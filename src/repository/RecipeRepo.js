const {PrismaClient} = require('@prisma/client');

class RecipeRepo {
  constructor() {
    this.db = new PrismaClient();
  }

  async save(recipe) {
    try {
      const newRecipe = await this.db.Recipe.create({
        data: {
          name: recipe.name,
          instructions: recipe.instructions,
          preparationTimeMinutes: recipe.preparationTimeMinutes,
        },
      });
      return newRecipe;
    } catch (error) {
      console.log(`Error - RecipeRepo :: save - ${error.stack}`);
      throw error;
    }
  }

  async update(recipe) {
    try {
      const updatedRecipe =await this.db.Recipe.update({
        where: {
          idRecipe: recipe.idRecipe,
        },
        data: {
          name: recipe.name|| undefined,
          instructions: recipe.instructions|| undefined,
          preparationTimeMinutes: recipe.preparationTimeMinutes|| undefined,
        },
      });
      return updatedRecipe;
    } catch (error) {
      console.log(`Error - RecipeRepo :: update - ${error.stack}`);
      throw error;
    }
  }

  async getAll() {
    try {
      const recipes = await this.db.Recipe.findMany();
      return recipes;
    } catch (error) {
      console.log(`Error - RecipeRepo :: getAll - ${error.stack}`);
      throw error;
    }
  }

  async getById({idRecipe}) {
    try {
      const recipe = await this.db.Recipe.findUnique({
        where: {
          idRecipe: idRecipe,
        },
      });
      return recipe;
    } catch (error) {
      console.log(`Error - RecipeRepo :: getById - ${error.stack}`);
      throw error;
    }
  }

  async delete({idRecipe}) {
    try {
      await this.db.Recipe.delete({
        where: {
          idRecipe: idRecipe,
        },
      });
    } catch (error) {
      console.log(`Error - RecipeRepo :: delete - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new RecipeRepo();
