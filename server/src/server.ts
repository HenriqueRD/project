import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const api = express()

const prisma = new PrismaClient()
api.use(express.json())
api.use(cors())

api.get("/products", async (__, res) => {
  const products = await prisma.products.findMany()
  res.status(200).send(products)
})


api.get("/items", async (__, res) => {
  const items = await prisma.items.findMany()
  res.status(200).send(items)
})
api.post("/items", async (req, res) => {
  const { body } = req
  try {
    const order = await prisma.orders.findFirstOrThrow({
      where: {
        id: body.orderId
      }
    })
    for(let x of body.items) {
      await prisma.items.create({
        data: {
          amount: x.amount,
          description: x.description ? x.description : "",
          productId: x.productId,
          orderId: order.id
        }
      })
    }
    res.status(201).send()
  } catch (err) {
    res.status(404).json({ message: "Pedido não existe, falhou em criar o item", error: "" + err})
  }
})


api.get("/orders", async (__, res) => {
  const orders = await prisma.orders.findMany({
    include: {
      items: true
    },
  })
  res.status(200).send(orders)
})
api.put("/orders", async (req, res) => {
  const { body } = req
  try {
    await prisma.orders.update({
      where: {
        id: parseInt(body.id)
      },
      data : {
        status_order: body.status
      }
    })
    res.status(200).send()
  } catch(err) {
    res.status(404).json({ message: "Pedido não existe, falhou em autualizar o status", error: "" + err})
  }
})
api.get(`/orders/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.orders.findUniqueOrThrow({
      where: {
        id: parseInt(id)
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })
    res.status(200).send(order)
  } catch(err) {
    res.status(404).json({ message: "Pedido não existe", error: "" + err})
  }
})
api.post("/orders", async (req, res) => {

  const { body } = req

  const order = await prisma.orders.create({
    data: {
      client: body.client ? body.client : "",
      createdAt: new Date,
      service: body.service,
      status_order: "em preparação",
      status_payment: "em aberto",
      total: body.total ? body.total : 0
    } 
  })

  res.status(201).json({ id: order.id })
})

api.listen(8080)