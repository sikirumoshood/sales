import async from 'async';
import db from '../utils/database';
import query from '../queries/products';

const getAllProducts = (body, callback) => {
  db.manyOrNone(query.findAllProductsAndTheirCategroies)
    .then((response) => callback(null, response))
    .catch((error) => {
      callback('Unable to fetch products');
    });
};

function fetchAllProducts(req, res) {
  async.waterfall(
    [
      async.apply(getAllProducts, req)
    ],
    (error, response) => {
      if (error) {
        res.status(400).json({
          status: 'Error',
          message: error
        });
      } else {
        res.status(200).json({
          status: 'Success',
          message: 'Successfully fetched all Products',
          data: response
        });
      }
    }
  );
}

export default fetchAllProducts;
