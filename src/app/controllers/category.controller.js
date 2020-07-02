import { successResponse } from '../utils/responses';
import CategoryValidationService from '../services/category.validation.service.controller';
import CategoryService from '../services/category.service';

class Categories {
  /**
     * @description - Stores new category
     * @param {Object} req
     * @param {Object} res
     */
  static async storeNewCategory(req, res) {
    try {
      const { body } = req;
      const categoryData = CategoryValidationService.validateNewCategory(body);

      // Call category service
      const categoryResult = await CategoryService.storeNewCategory(categoryData);

      if (!categoryResult.success) {
        throw new Error('We are unable to add a new category at the moment, please try again!');
      }

      return successResponse('Category added successfully', categoryResult.data, res);
    } catch (e) {
      logger.error('Error from storeNewCategory ', e);
      return res.status(400).json({
        status: 'Error',
        message: e.message,
        data: e.data
      });
    }
  }
}

export default Categories;
