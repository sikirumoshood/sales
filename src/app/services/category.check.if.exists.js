import Category from '../models/category.model';

class CategoryExistsService {
  static async checkIfCategoryExists(category) {
    try {
      const categoryResult = await Category.find(category);
      if (categoryResult) {
        return {
          success: true,
          data: categoryResult
        };
      }
      return {
        success: false,
        data: categoryResult
      };
    } catch (e) {
      logger.error('Something went wrong in CategoryExistsService', e);
      return {
        success: false,
        data: null
      };
    }
  }
}

export default CategoryExistsService;
