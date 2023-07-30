const ProductRepo = require('../repository/ProductRepo');
const DynamicProductStockService = require('./DynamicProductStockService');
const BucketService = require('../service/BucketService');

class ProductService {
  async postProduct({ title, description, imageFile, price, tags, status, recipeId, catalogId }) {
    let imageLocation = '';
    try {
      if (imageFile) {
        const { location } = await BucketService.uploadFile(imageFile);
        imageLocation = location;
      }
    } catch (error) {
      console.log(`Error - ProductService :: postProduct - Error while saving image - ${error.stack}`);
    }

    try {
      const priceNumber = Number(price);
      const recipeIdNumber = Number(recipeId);
      const catalogIdNumber = Number(catalogId);
      const isOutOfStock = await DynamicProductStockService.isRecipeAvailableFromIngredientsStock(recipeIdNumber) ?
        false :
        true;

      const createdProduct = await ProductRepo.save({
        title,
        description,
        image: imageLocation,
        priceNumber,
        tags,
        status: status || 'ENABLED',
        isOutOfStock,
        recipeIdNumber,
        catalogIdNumber,
      });
      return createdProduct;
    } catch (error) {
      console.log(`Error - ProductService :: postProduct - ${error.stack}`);
      throw error;
    }
  }

  async putProduct({ idProduct, title, price, image, description, tags, catalog_id, status }) {
    try {
      const idProductNumber = Number(idProduct);
      const priceNumber = Number(price);
      const catalogIdNumber = Number(catalog_id);
      const updatedProduct = await ProductRepo.update({ idProduct: idProductNumber, title, price: priceNumber, image, description, tags, catalogIdNumber, status });
      console.log('put product servicio: ', updatedProduct);

      return updatedProduct;
    } catch (error) {
      console.log(`Error - ProductService :: putProduct - ${error.stack}`);
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const products = await ProductRepo.getAll();
      return products;
    } catch (error) {
      console.log(`Error - ProductService :: getAllProducts - ${error.stack}`);
      throw error;
    }
  }

  async getProductById({ idProduct }) {
    try {
      const idProductNumber = Number(idProduct);
      const Product = await ProductRepo.getById({ idProduct: idProductNumber });
      return Product;
    } catch (error) {
      console.log(`Error - ProductService :: getProductById - ${error.stack}`);
      throw error;
    }
  }

  async deleteProduct({ idProduct }) {
    try {
      const idProductNumber = Number(idProduct);
      await ProductRepo.delete({ idProduct: idProductNumber });
    } catch (error) {
      console.log(`Error - ProductService :: deleteProduct - ${error.stack}`);
      throw error;
    }
  }

  async getProductsByRecipeId(recipeId) {
    console.log('el id que llega al servicio ', recipeId);
    try {
      const products = await ProductRepo.getProductsByRecipeId(recipeId);
      return products;
    } catch (error) {
      console.log(`Error - ProductService :: getProductsByRecipeId - ${error.stack}`);
      throw error;
    }
  }
}

module.exports = new ProductService();
