import query from '../queries/products';
import db from '../utils/database';

class Product {
  /**
     * @description store Product
     * @param {Object} product
     */
  static async save(product) {
    try {
      const {
        name, brand, category, price
      } = product;
      const newProduct = await db.oneOrNone(query.saveProduct, [name, brand, price, category]);
      return newProduct;
    } catch (e) {
      logger.error('Unable to save product to database', e);
      throw (e);
    }
  }
}

export default Product;
