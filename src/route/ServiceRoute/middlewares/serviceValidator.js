const {
    postServiceSchema,
    putServiceSchema,
  } = require('../../../schema/ServiceSchema');
  
  const validatePostService = (req, res, next) => {
    const {error} = postServiceSchema.validate(req.body.service);
    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }
    next();
  };
  
  const validatePutService = (req, res, next) => {
    const {error} = putServiceSchema.validate(req.body.service);
    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }
    next();
  };
  
  module.exports = {
    validatePostService,
    validatePutService,
  };
  