DROP DATABASE IF EXISTS hamazon;

CREATE DATABASE hamazon;

USE hamazon;

CREATE TABLE products (
    id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(60) NOT NULL,
    department_name VARCHAR(60) NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Pork Rinds", "Snacks", 3.99, 30), ("Ham Hocks", "Essentials", 4.99, 24), ("Trotters", "Essentials", 5.89, 18), ("Pork Lard", "Snacks", 12.99, 20), ("Parma Ham", "Finer Things", 7.98, 15), ("Spam", "Snacks", 2.68, 50), ("Bacon Bits", "Herbs and Spices", 1.98, 45), ("Prosciutto", "Finer Things", 5.98, 34);  

