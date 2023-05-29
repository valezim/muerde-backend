const humps = require('humps');
const ProductService = require('../service/ProductService');

class ProductController {
    static async postProduct(req, res) {
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
                const Product = await ProductService.getProductById({ idProduct });
                return res.json({ ...humps.decamelizeKeys(product) });
            }
            const Products = await ProductService.getAllProducts();
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
}

module.exports = ProductController;