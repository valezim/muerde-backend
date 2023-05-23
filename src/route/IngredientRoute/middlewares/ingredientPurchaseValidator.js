const {
  postPurchaseIngredientSchema,
} = require('../../../schema/PurchaseIngredientSchema');

const validatePostPurchaseIngredient = (req, res, next) => {
  const {error} = postPurchaseIngredientSchema.validate(req.body.purchase_ingredient);
  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }
  next();
};

module.exports = {
  validatePostPurchaseIngredient,
};
