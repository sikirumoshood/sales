import categoryQuery from '../queries/category.queries';
import db from '../utils/database';
import logger from '../../config/logger';

class Category {
  static async save(category) {
    try {
      const { name } = category;
      const newCategory = await db.oneOrNone(categoryQuery.saveCategory, [name]);
      return newCategory;
    } catch (e) {
      logger.error('unable to save new category to the database', e);
      throw (e);
    }
  }

  static async find(categoryFields) {
    try {
      const { category } = categoryFields;
      const categoryFound = await db.oneOrNone(categoryQuery.checkIfCategoryExists, [category]);
      return categoryFound;
    } catch (e) {
      logger.error('unable to check whether category exists', e);
      throw (e);
    }
  }
}

export default Category;
