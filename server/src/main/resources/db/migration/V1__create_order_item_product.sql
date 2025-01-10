
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

CREATE TABLE transactions(
  id  SERIAL PRIMARY KEY,
  type VARCHAR(8),
  category VARCHAR(25),
  total_value INT,
  method_payment VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sells(
  id INT PRIMARY KEY,
  discount INT,
  order_id INT,

  CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(id),
  CONSTRAINT fk_transaction_id FOREIGN KEY (id) REFERENCES transactions(id)
);

CREATE TABLE suppliers(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  cnpj VARCHAR(20),
  phone VARCHAR(15),
  type VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses(
  id INT PRIMARY KEY,
  supplier_id INT,

  CONSTRAINT fk_supplier_id FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  CONSTRAINT fk_transaction_id FOREIGN KEY (id) REFERENCES transactions(id)
);
