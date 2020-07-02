import { all } from 'bluebird';
import ProductsValidationService from '../services/products.validation.service.controller';
import ProductsService from '../services/products.service';
import { successResponse } from '../utils/responses';
import CategoryExistsService from '../services/category.check.if.exists';
import fetchProductsService from '../services/products.all.service';

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
      // Check if category exists
      const category = await CategoryExistsService.checkIfCategoryExists(body);
      console.log(category);
      if (!category.success) {
        throw new Error("Category doesn't exists!");
      }
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

  /**
   * @description - Returns all products
   * @param {object} req
   * @param {object} res
   */
  static async getAllProducts(req, res) {
    try {
      const allProductsResult = await fetchProductsService.fetchAllProducts();
      if (!allProductsResult.success) {
        throw new Error('We are unable to fetch all products');
      }

      return successResponse('Successfully fetched all Products', allProductsResult.data, res);
    } catch (e) {
      return res.status(400).json({
        status: 'Error',
        message: e.message,
        data: e.data
      });
    }
  }
}

export default Products;
