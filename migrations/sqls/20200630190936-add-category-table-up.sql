/* Replace with your SQL commands */
CREATE TABLE category (
    id SERIAL,
    name VARCHAR(200),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);