import async from 'async';
import Joi from '@hapi/joi';
import db from '../utils/database';
import humanizeError from '../utils/errors';
import categoryQuery from '../queries/category.queries';

const validateCategoryRequest = (req, callback) => {
  const { body } = req;
  const schema = Joi.object({
    name: Joi.string().required()
  }).options({ abortEarly: false });

  const result = schema.validate(body);

  if (result.error) {
    const error = humanizeError(result.error.details);
    return callback(error);
  }

  return callback(null, body);
};

const storeNewCategory = (body, callback) => {
  const { name } = body;
  db.oneOrNone(categoryQuery.saveCategory, [name])
    .then((response) => callback(null, response))
    .catch((error) => callback('Unable to create a new category'));
};

function createCategory(req, res) {
  async.waterfall(
    [
      async.apply(validateCategoryRequest, req),
      storeNewCategory
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
          message: 'Category Created Successfully',
          data: response
        });
      }
    }
  );
}

export default createCategory;
