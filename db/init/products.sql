CREATE TABLE IF NOT EXISTS products (
	productId INT AUTO_INCREMENT NOT NULL,
	name VARCHAR(64) NOT NULL,
	imgUrl VARCHAR(64) NOT NULL,
    price INT NOT NULL,
    description VARCHAR(64) NOT NULL,
    productUrl VARCHAR(64) NOT NULL,
    user VARCHAR(64),
    FOREIGN KEY(user) REFERENCES users(username),
	PRIMARY KEY (productId)
);