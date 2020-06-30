/* Replace with your SQL commands */
CREATE TABLE products (
    id SERIAL,
    name VARCHAR(50),
    brand VARCHAR(50),
    price NUMERIC(18, 4),
    category VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

