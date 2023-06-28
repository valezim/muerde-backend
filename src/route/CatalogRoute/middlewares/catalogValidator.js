const {
  postCatalogSchema,
  putCatalogSchema,
} = require('../../../schema/CatalogSchema');

const validatePostCatalog = (req, res, next) => {
  const {error} = postCatalogSchema.validate(req.body.catalog);
  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }
  next();
};

const validatePutCatalog = (req, res, next) => {
  const {error} = putCatalogSchema.validate(req.body.catalog);
  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }
  next();
};

module.exports = {
  validatePostCatalog,
  validatePutCatalog,
};

