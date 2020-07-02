import Category from '../models/category.model';

class CategoryService {
  static async storeNewCategory(category) {
    try {
      const categoryResult = await Category.save(category);
      return {
        success: true,
        data: categoryResult
      };
    } catch (e) {
      logger.error('Something went wrong in products service', e);
      return {
        sucess: false,
        data: null
      };
    }
  }
}

export default CategoryService;
