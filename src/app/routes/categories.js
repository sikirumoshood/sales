import express from 'express';
import Categories from '../controllers/category.controller';
import createCategory from '../controllers/async.category.controller';

const Router = express();

Router.post(
  '/',
  createCategory
);

export default Router;
