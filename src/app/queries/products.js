const query = {
  saveProduct: `
        INSERT
            INTO
                products(name, brand, price, category)
            VALUES
                ($1, $2, $3, $4)
            RETURNING *
    `
};
export default query;
