const humps = require('humps');
const RecipeService = require('../service/RecipeService');

class RecipeController {
  static async postRecipe(req, res) {
    try {
      const newRecipe = humps.camelizeKeys(req.body.recipe);
      const createdRecipe = await RecipeService.postRecipe(newRecipe);
      return res.json({...humps.decamelizeKeys(createdRecipe)});
    } catch (error) {
      console.log(`Error - RecipeController :: postRecipe - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to create Recipe',
      });
    }
  }

  static async putRecipe(req, res) {
    try {
      const idRecipe = req.query.id;
      const recipe = humps.camelizeKeys(req.body.recipe);
      const updatedRecipe = await RecipeService.putRecipe({...recipe, idRecipe});

      return res.json({...humps.decamelizeKeys(updatedRecipe)});
    } catch (error) {
      console.log(`Error - RecipeController :: putRecipe - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to update Recipe',
      });
    }
  }

  static async getRecipes(req, res) {
    try {
      const idRecipe = req.query.id;

      if (idRecipe) {
        const recipe = await RecipeService.getRecipeById({idRecipe});
        return res.json({...humps.decamelizeKeys(recipe)});
      }
      const recipes = await RecipeService.getAllRecipes();
      return res.json({recipes: humps.decamelizeKeys(recipes)});
    } catch (error) {
      console.log(`Error - RecipeController :: getRecipes - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to get recipes',
      });
    }
  }

  static async deleteRecipe(req, res) {
    try {
      const idRecipe = req.query.id;
      await RecipeService.deleteRecipe({idRecipe});
      return res.json({message: `Recipe with id ${idRecipe} deleted successfully.`});
    } catch (error) {
      console.log(`Error - RecipeController :: deleteRecipe - ${error}`);
      return res.status(error.status || 500).json({
        error: 'Unexpected error while trying to delete recipe',
      });
    }
  }
}

module.exports = RecipeController;
