const categoryQuery = {
  saveCategory: `
        INSERT
            INTO
                category(name)
            VALUES
                ($1)
            RETURNING *
    `,

  checkIfCategoryExists: `
        SELECT
            *
        FROM
            category
        WHERE id = $1
    `
};

export default categoryQuery;
