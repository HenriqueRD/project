-- CreateEnum
CREATE TYPE "MethodPayment" AS ENUM ('DINHEIRO', 'PIX', 'DEBITO', 'CREDITO');

-- CreateEnum
CREATE TYPE "StatusService" AS ENUM ('LEVAR', 'LOCAL');

-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('EM_PREPARACAO', 'CONCLUIDO', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "StatusPayment" AS ENUM ('EM_ABERTO', 'PAGO');

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "client" TEXT NOT NULL,
    "service" "StatusService" NOT NULL,
    "status_order" "StatusOrder" NOT NULL DEFAULT 'EM_PREPARACAO',
    "status_payment" "StatusPayment" NOT NULL DEFAULT 'EM_ABERTO',
    "total" DOUBLE PRECISION NOT NULL,
    "date" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sells" (
    "id" SERIAL NOT NULL,
    "total_value" DOUBLE PRECISION NOT NULL,
    "method_payment" "MethodPayment" NOT NULL,
    "discount" DOUBLE PRECISION,
    "order_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sells_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sells" ADD CONSTRAINT "Sells_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
