import Product from '../models/products.model';

class fetchProductsService {
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

export default fetchProductsService;
