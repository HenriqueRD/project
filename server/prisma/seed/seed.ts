import { PrismaClient } from "@prisma/client";
import { products } from "./products";

const prisma = new PrismaClient()

async function main() {
  for(let prod of products) {
    await prisma.products.create({
      data: prod
    })
  }
}
main().catch(e => {
  console.log(e)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})