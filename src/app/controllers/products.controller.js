import ProductsValidationService from '../services/products.validation.service.controller';
import ProductsService from '../services/products.service';
import { successResponse } from '../utils/responses';

class Products {
  /**
     * @description - Stores new product
     * @param {Object} req
     * @param {Object} res
     */
  static async storeNewProduct(req, res) {
    try {
      const { body } = req;
      const productData = ProductsValidationService.validateNewProduct(body);
      // Call product service
      const productResult = await ProductsService.storeProduct(productData);
      if (!productResult.success) {
        throw new Error('We are unable to store this product at the moment, please try again!');
      }

      return successResponse('Product stored successfully', productResult.data, res);
    } catch (e) {
      logger.error('Error from storeNewProducts ', e);
      return res.status(400).json({
        status: 'Error',
        message: e.message,
        data: e.data
      });
    }
  }
}

export default Products;
