import async from 'async';
import Joi from '@hapi/joi';
import db from '../utils/database';
import humanizeError from '../utils/errors';
import query from '../queries/products';
import categoryQuery from '../queries/category.queries';

const validateProductRequest = (req, callback) => {
  const { body } = req;
  const schema = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.number().required()
  }).options({ abortEarly: false });

  const result = schema.validate(body);

  if (result.error) {
    const error = humanizeError(result.error.details);
    return callback(error);
  }

  return callback(null, body);
};

const validateCategoryExists = (body, callback) => {
  const { category } = body;
  db.oneOrNone(categoryQuery.checkIfCategoryExists, [category])
    .then((response) => {
      if (response) {
        callback(null, body);
      } else {
        callback("Category doesn't exists");
      }
    })
    .catch((error) => callback('Error validating category'));
};

const storeNewProduct = (body, callback) => {
  const {
    name, brand, price, category
  } = body;
  db.oneOrNone(query.saveProduct, [name, brand, price, category])
    .then((response) => callback(null, response))
    .catch((error) => callback('Unable to save product to database'));
};

function createProduct(req, res) {
  async.waterfall(
    [
      async.apply(validateProductRequest, req),
      validateCategoryExists,
      storeNewProduct
    ],
    (error, response) => {
      if (error) {
        res.status(400).json({
          status: 'Error',
          message: error
        });
      } else {
        res.status(200).json({
          status: 'Success',
          message: 'Product added Successfully',
          data: response
        });
      }
    }
  );
}

export default createProduct;
