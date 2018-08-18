DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10,2),
	stock_quantity INT,
    PRIMARY KEY(item_id)
);

SELECT * from products;

INSERT INTO products(product_name, department_name, price, stock_quantity) values ("vacuum", "home", 146.00, 20), ("jenga", "toys & games", 18, 50), ("activity cube", "toys & games", 16 , 40), ("what do you meme?", "toys & games", 40, 10), ("oil diffuser", "home", 40, 10), ("echo dot", "devices", 60, 5), ("salt and pepper grinder", "home", 20, 30), ("sterling silver necklace", "fashion", 35, 20), ("duffle bag", "travel", 50, 10), ("nespresso", "home", 120, 5);