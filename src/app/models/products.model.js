import query from '../queries/products';
import db from '../utils/database';
import logger from '../../config/logger';

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

  /**
   * @description Get alll products info combined with the category the fall into
   */
  static async getAllProducts() {
    try {
      console.log('in');
      const allProducts = await db.manyOrNone(query.findAllProductsAndTheirCategroies);
      console.log(allProducts);
      return allProducts;
    } catch (e) {
      console.log(e);
      logger.error('Unable to fetch products', e);
      throw (e);
    }
  }
}

export default Product;
