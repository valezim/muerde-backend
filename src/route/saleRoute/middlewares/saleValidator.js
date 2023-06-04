const {
  postSaleSchema,
  putSaleSchema
} = require('../../../schema/SaleSchema');

const validatePostSale = (req, res, next) => {
  const { error } = postSaleSchema.validate(req.body.sale);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validatePutSale = (req, res, next) => {
  const { error } = putSaleSchema.validate(req.body.sale);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


module.exports = {
  validatePostSale,
  validatePutSale,
};
