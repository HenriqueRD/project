
CREATE TABLE products(
  id  SERIAL PRIMARY KEY,
  name TEXT,
  price REAL,
  type TEXT
);

CREATE TABLE orders(
  id  SERIAL PRIMARY KEY,
  client TEXT,
  service VARCHAR(10),
  status_order VARCHAR(15),
  status_payment VARCHAR(10),
  total_value REAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items(
  id  SERIAL PRIMARY KEY,
  description TEXT,
  amount INT,
  product_id INT,
  order_id INT,
 
  CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE sells(
  id  SERIAL PRIMARY KEY,
  discount TEXT,
  total_value INT,
  method_payment VARCHAR(10),
  order_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE transactions(
  id  SERIAL PRIMARY KEY,
  type VARCHAR(8),
  category VARCHAR(10),
  total_value INT,
  sell_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_sell_id FOREIGN KEY (sell_id) REFERENCES sells(id)
);