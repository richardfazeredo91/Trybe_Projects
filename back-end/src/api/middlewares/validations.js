const joi = require('joi');

const validateUser = (req, _res, next) => {
  const { body } = req;

  const { error } = joi.object({
    name: joi.string().min(12).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string(),
  }).validate(body);

  if (error) console.log(error);
  if (error) throw Error('INVALID_FIELDS');

  return next();
};

const validateLogin = (req, _res, next) => {
  const { body } = req;

  const { error } = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  }).validate(body);

  if (error) throw Error('INVALID_FIELDS');

  return next();
};

const validateNewSale = (req, _res, next) => {
  const { body } = req;

  const product = joi.object({
    productId: joi.number().required(),
    quantity: joi.number().required(),
  });

  const { error } = joi.object({
    products: joi.array().items(product).min(1).required(),
    sellerName: joi.string().required(),
    totalPrice: joi.number().precision(2).required(),
    deliveryAddress: joi.string().required(),
    deliveryNumber: joi.string().required(),

  }).validate(body);

  if (error) throw Error('INVALID_FIELDS');

  return next();
};

module.exports = {
  validateUser,
  validateLogin,
  validateNewSale,
};