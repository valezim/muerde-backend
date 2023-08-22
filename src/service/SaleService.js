const SaleRepo = require('../repository/SaleRepo');
const SaleProductRepo = require('../repository/SaleProductRepo');
const DynamicProductStockService = require('./DynamicProductStockService');
const UserService = require('./UserService');
const ProductRepo = require('../repository/ProductRepo');

class SaleService {
  async getAllSales() {
    try {
      const sales = await SaleRepo.getAll();
      return sales;
    } catch (error) {
      console.log(`Error - SaleService :: getAllSales - ${error.stack}`);
      throw error;
    }
  }

  async getSalesById({ idSale }) {
    try {
      const idSaleNumber = Number(idSale);
      const sale = await SaleRepo.getById({ idSale: idSaleNumber });
      return sale;
    } catch (error) {
      console.log(`Error - SaleService :: getSalesById - ${error.stack}`);
      throw error;
    }
  }

  async getSalesByUserId({ idUser }) {
    try {
      const idUserNumber = Number(idUser);
      const sale = await SaleRepo.getSaleByUserId({ idUser: idUserNumber });
      return sale;
    } catch (error) {
      console.log(`Error - SaleService :: getSalesByUserId - ${error.stack}`);
      throw error;
    }
  }


  async putSale({ idSale, state }) {
    try {
      const idSaleNumber = Number(idSale);

      const updatedSale = await SaleRepo.update({
        idSale: idSaleNumber,
        state,
      });

      return updatedSale;
    } catch (error) {
      console.log(`Error - SaleService :: putSale - ${error.stack}`);
      throw error;
    }
  }

  async putSaleTransferNumber({ idSale, transferNumber }) {
    try {
      const idSaleNumber = Number(idSale);

      const updatedSale = await SaleRepo.updateTransferNumber({
        idSale: idSaleNumber,
        transferNumber,
      });

      return updatedSale;
    } catch (error) {
      console.log(`Error - SaleService :: putSaleTransferNumber - ${error.stack}`);
      throw error;
    }
  }


  async postSale({ deliveryType, paymentMethod, userId, userDate, products = [] }) {
    try {
      const createdSale = await SaleRepo.save({ deliveryType, paymentMethod, userId, userDate, products });
      products.forEach(async (product) => {
        await SaleProductRepo.save({
          saleId: createdSale.idSale,
          productId: product.productId,
          quantity: product.quantity,
        });
        await DynamicProductStockService.updateProductOOSByProductId(product.productId);
      });
      return createdSale;
    } catch (error) {
      console.log(`Error - SaleService :: postSale - ${error.stack}`);
      throw error;
    }
  }

  async getTotalProgressStatus() {
    try {
      const statusCounts = await SaleRepo.getTotalProgressStatusCount();

      return statusCounts.map((statusCount) => ({
        status: statusCount.status,
        totalCount: statusCount._count.status,
      }));
    } catch (error) {
      console.log(`Error - SaleService :: getTotalProgressStatus - ${error.stack}`);
      throw error;
    }
  }

  async getTotalSalesByCustomerBetweenDates(startDate, endDate) {
    try {
      if (!startDate) {
        const currentDate = new Date();
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      }

      if (!endDate) {
        endDate = new Date();
      }

      if (new Date(endDate) < new Date(startDate)) {
        endDate = startDate;
      }

      const salesByCustomer = await SaleRepo.getTotalSalesByCustomerBetweenDates(startDate, endDate);

      const salesWithUser = await Promise.all(salesByCustomer.map(async (sale) => {
        const user = await UserService.getById(sale?.userId);
        return {
          id_user: sale?.userId,
          name: user?.name,
          sales: sale?._count?.idSale,
        };
      }));

      return salesWithUser;
    } catch (error) {
      console.log(`Error - SaleService :: getTotalSalesByCustomerBetweenDates - ${error.stack}`);
      throw error;
    }
  }

  async getSalesByProduct(startDate, endDate) {
    try {
      if (new Date(endDate) < new Date(startDate)) {
        endDate = startDate;
      }

      return (startDate && endDate) ?
        await ProductRepo.getSalesByProductBetweenDates(startDate, endDate) :
        await ProductRepo.getSalesByProduct();
    } catch (error) {
      console.log(`Error - SaleService :: getTotalSalesByCustomerBetweenDates - ${error.stack}`);
      throw error;
    }
  };

  async getTotalSalesAndEarningsPerDay(startDate, endDate) {
    try {
      if (new Date(endDate) < new Date(startDate)) {
        endDate = startDate;
      }
      return (startDate && endDate) ?
        await SaleRepo.getTotalSalesAndEarningsPerDaytBetweenDates(startDate, endDate) :
        await SaleRepo.getTotalSalesAndEarningsPerDay();
    } catch (error) {
      console.log(`Error - SaleService :: getTotalSalesAndEarningsPerDay - ${error.stack}`);
      throw error;
    }
  };

  groupProductsByUserDate(sales = []) {
    const productGroups = [];

    sales.forEach((order) => {
      const userDate = new Date(order.user_date).toISOString().slice(0, 10);

      const existingGroup = productGroups.find((group) => group.day === userDate);

      if (existingGroup) {
        order.products.forEach((product) => {
          const productId = product.product.idProduct;
          const existingProduct = existingGroup.products.find((p) => p.id_product === productId);

          if (existingProduct) {
            existingProduct.quantity += product.quantity;
          } else {
            existingGroup.products.push({
              id_product: productId,
              quantity: product.quantity,
              title: product.product.title,
              description: product.product.description,
              image: product.product.image,
              preparation_time_minutes: product.product.recipe.preparationTimeMinutes,
              ingredients: product.product.recipe.RecipeIngredient.map((ingredient) => ({
                id_ingredient: ingredient.ingredient.idIngredient,
                name: ingredient.ingredient.name,
              })),
            });
          }
        });
      } else {
        const newGroup = {
          day: userDate,
          products: order.products.map((product) => ({
            id_product: product.product.idProduct,
            quantity: product.quantity,
            title: product.product.title,
            description: product.product.description,
            image: product.product.image,
            preparation_time_minutes: product.product.recipe.preparationTimeMinutes,
            ingredients: product.product.recipe.RecipeIngredient.map((ingredient) => ({
              id_ingredient: ingredient.ingredient.idIngredient,
              name: ingredient.ingredient.name,
            })),
          })),
        };
        productGroups.push(newGroup);
      }
    });

    return productGroups;
  }

  // if product quantity is more than one, it is considered that the preparation time is the same
  // plus 15% for each extra product.
  getPreparationTimeMinutesByProductQuantity(preparationTimeMinutes, productQuantity) {
    if (productQuantity <= 1) {
      return preparationTimeMinutes;
    } else {
      const extraPreparationTime = (productQuantity - 1) * (preparationTimeMinutes * 0.15);
      return preparationTimeMinutes + extraPreparationTime;
    }
  }

  // Helper function to check if two ingredient arrays have at least 70% common ingredients
  hasCommonIngredients(ingredients1, ingredients2) {
    const commonIngredientsCount = ingredients1.filter(
      (ingredient1) =>
        ingredients2.some((ingredient2) => ingredient1.id_ingredient === ingredient2.id_ingredient),
    ).length;
    const minCommonIngredients = Math.min(ingredients1.length, ingredients2.length) * 0.7;
    return commonIngredientsCount >= minCommonIngredients;
  };

  prepareOrderSuggestions(data) {
    const result = [];

    data.forEach((dayData) => {
      const preparationSuggestionsMap = new Map();
      const { day, products } = dayData;

      products.forEach((product) => {
        const suggestion = {
          total_preparation_time_minutes: this.getPreparationTimeMinutesByProductQuantity(
            product.preparation_time_minutes, product.quantity,
          ),
          common_ingredients: product.ingredients.map((ingredient) => ({
            id_ingredient: ingredient.id_ingredient,
            name: ingredient.name,
          })),
          products: [
            {
              id_product: product.id_product,
              title: product.title,
              description: product.description,
              image: product.image,
              preparation_time_minutes: product.preparation_time_minutes,
              quantity: product.quantity,
            },
          ],
        };

        const existingSuggestions = [...preparationSuggestionsMap.values()];
        let isGrouped = false;

        for (const existingSuggestion of existingSuggestions) {
          if (this.hasCommonIngredients(existingSuggestion.common_ingredients, suggestion.common_ingredients)) {
            existingSuggestion.total_preparation_time_minutes += this.getPreparationTimeMinutesByProductQuantity(
              product.preparation_time_minutes, product.quantity,
            );
            existingSuggestion.products.push({
              id_product: product.id_product,
              title: product.title,
              description: product.description,
              image: product.image,
              preparation_time_minutes: product.preparation_time_minutes,
              quantity: product.quantity,
            });
            isGrouped = true;
            break;
          }
        }

        if (!isGrouped) {
          const suggestionKey = product.ingredients.map((ingredient) => ingredient.id_ingredient).sort().join('-');
          preparationSuggestionsMap.set(suggestionKey, suggestion);
        }
      });
      result.push({ day, preparation_suggestions: [...preparationSuggestionsMap.values()] });
    });


    return result;
  }

  sortByDay(data) {
    data.sort((a, b) => {
      const dateA = new Date(a.day);
      const dateB = new Date(b.day);
      return dateA - dateB;
    });
    return data;
  }

  async getOrderPreparationSuggestions() {
    try {
      const salesWithIncludes = await SaleRepo.getSalesWithProductIngredients();
      const productGroupByUserDate = this.groupProductsByUserDate(salesWithIncludes);
      const orderSuggestionsList = this.prepareOrderSuggestions(productGroupByUserDate);
      return this.sortByDay(orderSuggestionsList);
    } catch (error) {
      console.log(`Error - SaleService :: getOrderPreparationSuggestions - ${error.stack}`);
      throw error;
    }
  };
}

module.exports = new SaleService();
