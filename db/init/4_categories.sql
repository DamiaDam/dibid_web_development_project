CREATE TABLE IF NOT EXISTS categories (
	id INT AUTO_INCREMENT NOT NULL,
	name VARCHAR(64) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO categories(name) VALUES ('Electronics'),('Home and Garden'),('Fashion'),('Sports'),('Other');