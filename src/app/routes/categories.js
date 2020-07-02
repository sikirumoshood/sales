import express from 'express';
import Categories from '../controllers/category.controller';

const Router = express();

Router.post(
  '/',
  Categories.storeNewCategory
);

export default Router;
