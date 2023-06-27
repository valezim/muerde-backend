const {
    postUserSchema,
  } = require('../../../schema/UserSchema');
  
  const validatePostUser = (req, res, next) => {
    const {error} = postUserSchema.validate(req.body.product);
    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }
    next();
  };
  
  module.exports = {
    validatePostUser
  };
  