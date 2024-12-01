-- CreateTable
CREATE TABLE "Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    CONSTRAINT "Items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "status_order" TEXT NOT NULL,
    "status_payment" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "date" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Sells" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total_value" REAL NOT NULL,
    "method_payment" TEXT NOT NULL,
    "discount" REAL,
    "order_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Sells_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
