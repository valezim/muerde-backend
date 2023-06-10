const {
    postProductSchema,
    putProductSchema,
  } = require('../../../schema/ProductSchema');
  
  const validatePostProduct = (req, res, next) => {
    const {error} = postProductSchema.validate(req.body.product);
    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }
    next();
  };
  
  const validatePutProduct = (req, res, next) => {
    const {error} = putProductSchema.validate(req.body.product);
    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }
    next();
  };
  
  module.exports = {
    validatePostProduct,
    validatePutProduct,
  };
  