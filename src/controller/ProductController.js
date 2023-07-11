const humps = require('humps');
const ProductService = require('../service/ProductService');

class ProductController {
    static async postProduct(req, res) {
        console.log("post product controller: ", req.body.product);
        try {
            const newProduct = humps.camelizeKeys(req.body.product);
            const createdProduct = await ProductService.postProduct(newProduct);
            return res.json({ ...humps.decamelizeKeys(createdProduct) });
        } catch (error) {
            console.log(`Error - ProductController :: postProduct - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to create product',
            });
        }
    }

    static async putProduct(req, res) {
        try {
            const idProduct = req.query.id;
            const Product = humps.camelizeKeys(req.body.product);
            const updatedProduct = await ProductService.putProduct({ ...Product, idProduct });
            return res.json({ ...humps.decamelizeKeys(updatedProduct) });
        } catch (error) {
            console.log(`Error - ProductController :: putProduct - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to update product',
            });
        }
    }

    static async getProducts(req, res) {
        try {
            const idProduct = req.query.id;

            if (idProduct) {
                const product = await ProductService.getProductById({ idProduct });
                return res.json({ ...humps.decamelizeKeys(product) });
            }
            const products = await ProductService.getAllProducts();
            return res.json({ Products: humps.decamelizeKeys(products) });
        } catch (error) {
            console.log(`Error - ProductController :: getProducts - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to get products',
            });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const idProduct = req.query.id;
            await ProductService.deleteProduct({ idProduct });
            return res.json({ message: `Product with id ${idProduct} deleted successfully.` });
        } catch (error) {
            console.log(`Error - ProductController :: deleteProduct - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to delete product',
            });
        }
    }

    static async getProductsByRecipeId(req, res) {
        try {
            const recipeId = req.query.id;
            const products = await ProductService.getProductsByRecipeId(recipeId);
            return res.json({ Products: humps.decamelizeKeys(products) });
        } catch (error) {
            console.log(`Error - ProductController :: getProductsByRecipeId - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to get products by recipe id',
            });
        }
    }
}

module.exports = ProductController;