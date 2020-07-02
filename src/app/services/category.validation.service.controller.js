import Joi from '@hapi/joi';
import humanizeError from '../utils/errors';
import CustomError from '../errors/CustomError';

class CategoryValidationService {
  static validateNewCategory(categoryFields) {
    const schema = Joi.object({
      name: Joi.string().required()
    }).options({ abortEarly: false });

    const result = schema.validate(categoryFields);

    if (result.error) {
      const error = humanizeError(result.error.details);
      throw new CustomError('Validation Error Occured', error);
    }

    return categoryFields;
  }
}

export default CategoryValidationService;
