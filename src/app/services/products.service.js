import CustomError from '../errors/CustomError';
import Product from '../models/products.model';

class ProductsService {
  /**
     * @description Stores a new product
     * @param {Object} product
     */
  static async storeProduct(product) {
    try {
      // Save product
      const productResult = await Product.save(product);
      return {
        success: true,
        data: productResult
      };
    } catch (e) {
      logger.error('Something went wrong in products service', e);
      return {
        sucess: false,
        data: null
      };
    }
  }

  /**
     * @description runs the model function to fetch all products
     */
  static async fetchAllProducts() {
    try {
      const allProducts = await Product.getAllProducts();
      return {
        success: true,
        data: allProducts
      };
    } catch (e) {
      return {
        success: false,
        data: null
      };
    }
  }
}

export default ProductsService;
