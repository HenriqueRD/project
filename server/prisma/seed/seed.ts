import { PrismaClient } from "@prisma/client";
import { products } from "./products";

const prisma = new PrismaClient()

async function main() {
  await prisma.products.createMany({
    data: products
  })
}
main().catch(e => {
  console.log(e)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})