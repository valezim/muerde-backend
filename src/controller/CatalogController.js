const humps = require('humps');
const CatalogService = require('../service/CatalogService');

class CatalogController {
    static async postCatalog(req, res) {
        try {
            const newCatalog = humps.camelizeKeys(req.body.catalog);
            const createdCatalog = await CatalogService.postCatalog(newCatalog);
            return res.json({ ...humps.decamelizeKeys(createdCatalog) });
        } catch (error) {
            console.log(`Error - CatalogController :: postCatalog - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to create catalog',
            });
        }
    }

    static async putCatalog(req, res) {
        try {
            const idCatalog = req.query.id;
            const catalog = humps.camelizeKeys(req.body.catalog);
            const updatedCatalog = await CatalogService.putCatalog({ ...catalog, idCatalog });

            return res.json({ ...humps.decamelizeKeys(updatedCatalog) });
        } catch (error) {
            console.log(`Error - CatalogController :: putCatalog - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to update Catalog',
            });
        }
    }

    static async getCatalogs(req, res) {
        try {
            const idCatalog = req.query.id;

            if (idCatalog) {
                const catalog = await CatalogService.getCatalogById({ idCatalog });
                return res.json({ ...humps.decamelizeKeys(catalog) });
            }
            const catalogs = await CatalogService.getAllCatalogs();
            return res.json({ Catalogs: humps.decamelizeKeys(catalogs) });
        } catch (error) {
            console.log(`Error - CatalogController :: getCatalogs - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to get Catalogs',
            });
        }
    }

    static async deleteCatalog(req, res) {
        try {
            const idCatalog = req.query.id;
            await CatalogService.deleteCatalog({ idCatalog });
            return res.json({ message: `Catalog with id ${idCatalog} deleted successfully.` });
        } catch (error) {
            console.log(`Error - CatalogController :: deleteCatalog - ${error}`);
            return res.status(error.status || 500).json({
                error: 'Unexpected error while trying to delete Catalog',
            });
        }
    }
}

module.exports = CatalogController;