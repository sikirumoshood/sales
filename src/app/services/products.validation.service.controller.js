import Joi from '@hapi/joi';
import humanizeError from '../utils/errors';
import CustomError from '../errors/CustomError';

class ProductsValidationService {
  /**
     * @description Validates a new product
     * @param {Object} product
     */
  static validateNewProduct(productFields) {
    const schema = Joi.object({
      name: Joi.string().required(),
      brand: Joi.string().required(),
      price: Joi.number().required(),
      category: Joi.number().required()
    }).options({ abortEarly: false });

    const result = schema.validate(productFields);

    if (result.error) {
      const error = humanizeError(result.error.details);
      throw new CustomError('Validation Error Occured', error);
    }

    return productFields;
  }
}

export default ProductsValidationService;
