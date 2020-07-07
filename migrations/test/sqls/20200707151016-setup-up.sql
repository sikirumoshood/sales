/* Replace with your SQL commands */-- -------------------------------------------------------------
--
-- Database: sales.category
-- Seeds the database with test data
-- -------------------------------------------------------------


INSERT INTO category ("id", "name") 
VALUES 
    ('1', 'flasks'),
    ('2', 'nike'),
    ('3', 'Foot Wears'),
    ('4', 'Wristwatch');


-- -------------------------------------------------------------
-- Database: sales.product
-- Seeds the database with test data
-- -------------------------------------------------------------


INSERT INTO products ("id","name", "brand", "price", "category") 
VALUES 
    ('1', 'Smart watch', 'Quartz', '2000.0000', '4'),
    ('2', 'Fee trekker', 'Nike', '2000.0000', '2'),
    ('3', 'Sky lift', 'Nike', '2000.0000', '2'),
    ('4', 'Jaguer Escalade', 'Jaguer', '3000.0000', '3');

