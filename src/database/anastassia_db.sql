CREATE DATABASE anastassia_db;

CREATE TABLE categories(id INT NOT NULL AUTO_INCREMENT,
			name VARCHAR(100) NOT NULL,
                        PRIMARY KEY (id));
                        
CREATE TABLE materials(id INT NOT NULL AUTO_INCREMENT,
			name VARCHAR(100) NOT NULL,
                        PRIMARY KEY (id));
                        
CREATE TABLE collections(id INT NOT NULL AUTO_INCREMENT,
			name VARCHAR(100) NOT NULL,
                        PRIMARY KEY (id));                        

CREATE TABLE users(id INT NOT NULL AUTO_INCREMENT,
		    name VARCHAR(100),
                    lastname VARCHAR(100),
                    documento INT,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    password VARCHAR(100),
                    avatar VARCHAR(100),
                    PRIMARY KEY (id));

CREATE TABLE products(id INT NOT NULL AUTO_INCREMENT,
			name VARCHAR(100),
                        description TEXT,
                        image VARCHAR(100),
                        category_id INT,
                        material_id INT,
                        collection_id INT,
                        precio INT,
                        PRIMARY KEY (id),
                        FOREIGN KEY (category_id) references categories(id),
                        FOREIGN KEY (material_id) references materials(id),
                        FOREIGN KEY (collection_id) references collections(id));