import express from 'express';
import Products from '../controllers/products.controller';

const Router = express();

Router.post(
  '/',
  Products.storeNewProduct
);

export default Router;
