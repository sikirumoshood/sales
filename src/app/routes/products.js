import express from 'express';
import fetchAllProducts from '../controllers/async.get.products.controller';
import createProduct from '../controllers/async.product.controller';

const Router = express();

Router.post(
  '/',
  createProduct

);

Router.get(
  '/',
  fetchAllProducts
);

export default Router;
