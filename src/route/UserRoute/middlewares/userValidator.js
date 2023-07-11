const {
    postUserSchema,
    putUserSchema
  } = require('../../../schema/UserSchema');
  
  const validatePostUser = (req, res, next) => {
    const {error} = postUserSchema.validate(req.body.product);
    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }
    next();
  };

  const validatePutUser = (req, res, next) => {
    const {error} = putUserSchema.validate(req.body.product);
    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }
    next();
  };
  
  module.exports = {
    validatePostUser,
    validatePutUser,
  };
  