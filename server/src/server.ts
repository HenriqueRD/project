import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { sub } from "date-fns";
import z from "zod";

const api = express()

const prisma = new PrismaClient()
api.use(express.json())
api.use(cors())

api.get("/products", async (__, res) => {
  const products = await prisma.products.findMany()
  res.status(200).send(products)
})


api.get("/orders", async (req, res) => {
  try {
    const OrderQuerySchema = z.object({
      date: z.string(),
      status: z.union([z.enum(["EM_PREPARACAO", "CONCLUIDO", "FINALIZADO"]), z.array(z.enum(["EM_PREPARACAO", "CONCLUIDO", "FINALIZADO"]))])
    });
    const { date, status } = OrderQuerySchema.parse(req.query)
  
    const orders = await prisma.orders.findMany({
      where: {
        AND: {
          status_order: {
            in: Array.isArray(status) ? status : [status]
          },
          date: {
            equals: date
          }
        },
      },
      orderBy: {
        created_at: "desc"
      },
      include: {
        items: true
      }
    })
    res.status(200).send(orders)
  } catch (err) {
    res.status(404).send({message: "Erro ao listar pedidos", error: "" + err})
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
        sells: true,
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
api.put("/orders", async (req, res) => {

  const orderSchema = z.object({
    id: z.number().positive(), 
    client: z.string().optional(),
    service: z.enum(["LEVAR", "LOCAL"]).optional(),
    status_order: z.enum(["EM_PREPARACAO", "CONCLUIDO", "FINALIZADO"]).optional(),
    items: z.array(
      z.object({
        amount: z.number().positive(),  
        product_id: z.number().int(),     
        description: z.string()         
    })).optional()
  })

  
  try {
    const data = orderSchema.parse(req.body)

    const order = await prisma.orders.update({
      where: {
        id: data.id
      },
      data : {
        client: data.client,
        service: data.service,
        status_order: data.status_order
      }
    })
    res.status(200).send(order)
  } catch(err) {
    res.status(404).json({ message: "Pedido não existe, falhou em autualizar o status", error: "" + err})
  }
})
api.post("/orders", async (req, res) => {

  const orderSchema = z.object({
    client: z.string(),
    service: z.enum(["LEVAR", "LOCAL"]),
    items: z.array(
      z.object({
        amount: z.number().positive(),  
        product_id: z.number().int(),     
        description: z.string()         
    }))
  })

  try {
    const data = orderSchema.parse(req.body)

    const products = await prisma.products.findMany()
  
    const total_order = data.items.reduce((acc: number, itr) => { return acc + ( itr.amount *(products.find(x => x.id === itr.product_id)?.price || 0.0)) }, 0.0);
  
    const order = await prisma.orders.create({
      data: {
        client: data.client ? data.client : "não informado",
        service: data.service,
        date: sub(new Date(), { hours: 3 }).toISOString().split("T")[0],
        total: total_order,
        items: {
          createMany: {
            data: data.items
          }
        }
      },
      include: {
        items: true
      }
    })
    res.status(201).send(order)
  } catch (err) {
    res.status(404).send({message: "Erro ao criar o pedido", error: "" + err})
  }
  
})
api.delete(`/orders/:id`, async (req, res) => {
  const orderParamsSchema = z.object({
    id: z.string().transform(x => Number(x))
  })
  
  const { id } = orderParamsSchema.parse(req.params);

  try {
    const sell = await prisma.sells.findFirst({
      where: {
        order_id: id
      }
    })
  
    if(sell) {
      res.status(403).send({ message: "Pedido não pode ser excluido, ja foi pago", error: ""})
      return
    }
  
    await prisma.orders.delete({
      where: {
        id: id
      }
    })
    res.status(200).send()
    return
  } catch(err) {
    res.status(404).json({ message: "Pedido não existe", error: "" + err})
    return
  
  }
})


api.get("/sells", async (__, res) => {
  const sells = await prisma.sells.findMany({
    include: {
      order: true
    }
  })
  res.status(200).send(sells)
})
api.post("/sells", async (req, res) => {

  const sellSchema = z.object({
    method_payment:  z.enum(["DINHEIRO", "PIX", "DEBITO", "CREDITO"]),
    discount: z.number().min(0).optional(),
    order_id: z.number().positive(),
  })

  try {
    const data = sellSchema.parse(req.body)

    const { id } = await prisma.sells.create({
      data: {
        method_payment: data.method_payment,
        discount: data.discount,
        order_id: data.order_id,
        total_value: 0
      }
    })

    await prisma.orders.update({
      where: {
        id: data.order_id
      },
      data: {
        status_payment: "PAGO"
      },
    })

    const sell = await prisma.sells.findUnique({
      where: {
        id
      },
      include: {
        order: true
      }
    })

    res.status(201).send(sell)
  } catch (err) {
    res.status(404).send({message: "Erro ao realizar o pagamento", error: "" + err})
  }
})

api.listen(8080)