const BaseRepo = require('./BaseRepo');

class RecipeRepo extends BaseRepo {
  constructor() {
    super();
  }

  async save(recipe) {
    console.log('receta que llega al repo: ', recipe);
    try {
      const newRecipe = await this.db.Recipe.create({
        data: {
          name: recipe.name,
          instructions: recipe.instructions,
          preparationTimeMinutes: recipe.preparationTimeMinutesNumber,
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
      const updatedRecipe = await this.db.Recipe.update({
        where: {
          idRecipe: recipe.idRecipe,
        },
        data: {
          name: recipe.name || undefined,
          instructions: recipe.instructions || undefined,
          preparationTimeMinutes: recipe.preparationTimeMinutes || undefined,
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

  async getById({ idRecipe }) {
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

  async getByIdWithProduct({ idRecipe }) {
    try {
      const recipe = await this.db.Recipe.findUnique({
        where: {
          idRecipe: idRecipe,
        },
        include: {
          Product: true,
        },
      });

      return recipe;
    } catch (error) {
      console.log(`Error - RecipeRepo :: getByIdWithProduct - ${error.stack}`);
      throw error;
    }
  }

  async delete({ idRecipe }) {
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

  async getByProductId({ productId }) {
    try {
      const recipe = await this.db.Recipe.findFirst({
        where: { Product: { idProduct: productId } },
      });
      return recipe;
    } catch (error) {
      console.log(`Error - RecipeRepo :: getByProductId - ${error.stack}`);
      throw error;
    }
  }

  async getRecipesWithoutProducts() {
    try {
      const recipes = await this.db.Recipe.findMany({
        include: {
          Product: true,
        },
      });
      return recipes;
    } catch (error) {
      console.log(`Error - RecipeRepo :: getRecipesWithoutProducts - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new RecipeRepo();
