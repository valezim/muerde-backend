const {PrismaClient} = require('@prisma/client');

class IngredientRepo {
  constructor() {
    this.db = new PrismaClient();
  }

  async save(ingredient) {
    try {
      const newIngredient = await this.db.Ingredient.create({
        data: {
          name: ingredient.name,
          unit: ingredient.unit,
          lastPurchaseCost: ingredient.lastPurchaseCost,
          totalQuantity: ingredient.totalQuantity,
        },
      });
      return newIngredient;
    } catch (error) {
      console.log(`Error - IngredientRepo :: save - ${error.stack}`);
      throw error;
    }
  }

  async update(ingredient) {
    try {
      const updatedIngredient =await this.db.Ingredient.update({
        where: {
          idIngredient: ingredient.idIngredient,
        },
        data: {
          name: ingredient.name || undefined,
          unit: ingredient.unit || undefined,
          lastPurchaseCost: ingredient.lastPurchaseCost || undefined,
          totalQuantity: ingredient.totalQuantity || undefined,
        },
      });
      return updatedIngredient;
    } catch (error) {
      console.log(`Error - IngredientRepo :: update - ${error.stack}`);
      throw error;
    }
  }

  async getAll() {
    try {
      const ingredients = await this.db.Ingredient.findMany();
      return ingredients;
    } catch (error) {
      console.log(`Error - IngredientRepo :: getAll - ${error.stack}`);
      throw error;
    }
  }

  async getById({idIngredient}) {
    try {
      const ingredient = await this.db.Ingredient.findUnique({
        where: {
          idIngredient: idIngredient,
        },
      });
      return ingredient;
    } catch (error) {
      console.log(`Error - IngredientRepo :: getById - ${error.stack}`);
      throw error;
    }
  }

  async delete({idIngredient}) {
    try {
      await this.db.Ingredient.delete({
        where: {
          idIngredient: idIngredient,
        },
      });
    } catch (error) {
      console.log(`Error - IngredientRepo :: delete - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new IngredientRepo();
