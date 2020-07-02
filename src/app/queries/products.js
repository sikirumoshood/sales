const query = {
  saveProduct: `
        INSERT
            INTO
                products(name, brand, price, category)
            VALUES
                ($1, $2, $3, $4)
            RETURNING *
    `,

  findAllProductsAndTheirCategroies: `
        SELECT  
            products.id,
            products.name,
            products.brand,
            products.price,
            products.category,
            category.name AS category_name
        FROM
            products
        LEFT JOIN category ON products.category = category.id
    `
};
export default query;
