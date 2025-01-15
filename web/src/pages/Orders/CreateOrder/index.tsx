import { FormEvent, useContext, useState } from 'react'
import Header from '../../../components/Header'
import CardItem from '../../../components/CardItem'
import Button from '../../../components/Button'
import { Check, Minus, Plus } from '@phosphor-icons/react'
import { ItemProps, ProductProps } from '../../../types'
import Tag from '../../../components/Tag'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../api'
import { ProductContext } from '../../../contexts/ProductContext'
import LinkGotoBack from '../../../components/LinkGotoBack'
import TableEmptyMessage from '../../../components/TableEmptyMessage'

export default function CreateOrder() {

  const nav = useNavigate()
  const [ productCurrent, setProductCurrent ] = useState<ProductProps>({} as any)
  const [ productNameCurrent, setProductNameCurrent ] = useState(productCurrent.name)
  const { products } = useContext(ProductContext)
  const [ productsListCurrent, setProductsListCurrent ] = useState<ProductProps[]>(products)

  const [ itemsSelected, setItemsSelected ] = useState<ItemProps[]>([])
  const [ amount, setAmount ] = useState(0)
  const [ service, setService ] = useState("LOCAL")
  const [ client, setClient ] = useState("")
  const [ description, setDescription ] = useState("")

  function handleSearchProducts(text : String) {
    const newArray = products.filter(x => x.name.toLowerCase().includes(text.toLowerCase()))
    setProductsListCurrent(newArray);
  }

  function handleFormSearchProductReset() {
    setProductsListCurrent(products)
  }

  async function handleCreateOrder(event : FormEvent) {
    event.preventDefault()
    if (itemsSelected.length === 0) {
      toast.error("Adicione um item para fazer o pedido!")
      return
    }    

    await api.post("orders/", {
      client,
      service,
      items: itemsSelected.map(x => {
        return {
          amount: x.amount,
          description: x.description,
          product: {
            id: x.product.id
          }
        }
      })
    }).then(() => {
      toast.success("Pedido criado!")
      nav("/pedidos")
    })
  }

  function handleSearchItem(event : FormEvent) {
    event.preventDefault()
  }

  function handleAddItem(event : FormEvent) {
    event.preventDefault()
    if (!productCurrent.name || amount === 0) {
      toast.error("Selecione um Item!")
      return
    }  
    setItemsSelected([...itemsSelected, {
      amount,
      description,
      product: productCurrent
    }])
    toast.success("Item adicionado!")
    setProductNameCurrent("")
    setAmount(0)
    setDescription("")
    setProductCurrent({} as any)
  }

  function handleRemoveItem(id : number) {
    const newArray = itemsSelected.filter((__, i) => i !== id)
    setItemsSelected(newArray)
  }

  function handleAddAmount() {
    if(amount < 0) { setAmount(0); return }
    setAmount(amount + 1)
  }

  function handleRemoveAmount() {
    if(amount <= 0) { setAmount(0); return }
    setAmount(amount - 1)
  }

  return (
    <>
      <Header />
      <main className="mt-8">
        <div className="container">
          <div className='bg-neutral-50 p-6 rounded border border-slate-200 md:p-4'>
            <div className="flex gap-8 lg:flex-col">
              <div className="flex flex-col w-3/5 gap-4 lg:w-full">
                <form onSubmit={handleCreateOrder} className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg">Novo Pedido</h3>
                      <LinkGotoBack to="/pedidos" text='Voltar aos pedidos'/>
                    </div>
                    <Button title='Realizar Pedido' type="submit" text='Realizar Pedido' variant='success'/>
                  </div>
                  <div className="flex gap-8 border-b border-slate-300 pb-4">
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="client">Cliente</label>
                      <input className='w-full' id='client' type="text" placeholder='nome do cliente' value={client} onChange={x => setClient(x.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="service">Serviço*</label>
                      <select id='service' className='w-full' value={service} onChange={x => setService(x.target.value)}>
                        <option value="LOCAL">Local</option>
                        <option value="LEVAR">Levar</option>
                      </select>
                    </div>
                  </div>
                </form>
                <form onSubmit={handleAddItem} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className='text-lg'>Item selecionado</h3>
                    <Button type='submit' text='Adicionar Item' />
                  </div>
                  <div className="flex items-center gap-8 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <label>Produto*</label>
                      <input className='w-full' type="text" placeholder='Escolher Produto' value={productNameCurrent} readOnly disabled/>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="amount">Quantidade*</label>
                      <div className="flex items-center gap-2">
                        <Button onClick={handleRemoveAmount} type='button' icon variant='danger' ><Minus size={20} weight='bold' /></Button>
                        <input className="w-10 p-3 text-center" type="number" id='amount' value={amount} readOnly disabled />
                        <Button onClick={handleAddAmount} type='button' icon variant='success'><Plus size={20} weight='bold' /></Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="desc">Descrição</label>
                    <input type="text" id="desc" placeholder='observações sobre o produto' value={description} onChange={x => setDescription(x.target.value)} />
                  </div>
                </form>
                <div className="flex flex-col gap-2 border-t pt-4 border-slate-300">
                  <div className="flex gap-4 items-center">
                    <h3 className='text-lg'>Itens</h3>
                    <Tag type="normal" text={itemsSelected.length.toString()} />
                  </div>
                  <div className="bg-white p-4 rounded border border-slate-200 w-full h-80 overflow-auto">
                    {
                      itemsSelected.length === 0 ? (
                        <TableEmptyMessage text='nem um item selecionado' />
                      ) : (
                        <ul className='flex flex-col gap-2'>
                          {
                            itemsSelected.map((x, i) => {
                              return (
                                <li key={i}>
                                  <CardItem data={x} index={i+1} handleOnClick={() => handleRemoveItem(i)}/>
                                </li>
                              )
                            })
                          }
                        </ul>
                      )
                    }
                  </div>
                </div>
              </div>
              <form onSubmit={handleSearchItem} className="w-2/5 flex flex-col gap-4 lg:w-full">
                <div className='flex flex-col gap-4'>
                  <h3 className='text-lg'>Produtos</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="id">Procurar por nome</label>
                      <input id='name' placeholder='nome do produto' onChange={(x) => handleSearchProducts(x.target.value)} />
                    </div>
                    <Button type='reset' text='Resetar' onClick={handleFormSearchProductReset}/>
                  </div>
                </div>
                <div className="bg-white rounded border border-slate-200 w-full h-[26rem] overflow-auto">
                  {
                    productsListCurrent.length === 0 ? (
                      <TableEmptyMessage text='nem um produto encontrado' />
                    ) : (
                      <table className='table table-fixed w-full'>
                        <thead>
                          <tr>
                            <th scope="col">Produto</th>
                            <th scope="col">Preço</th>
                            <th scope="col" className='w-16'>Ação</th>
                          </tr>
                        </thead>
                          <tbody>
                            {
                              productsListCurrent.map(x => {
                                return (
                                  <tr key={x.id} title='Selecionar' onClick={() => { setProductCurrent(x); setAmount(1); setProductNameCurrent(x.name)}}>
                                    <td>{x.name}</td>
                                    <td>{x.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                                    <td className="flex items-center justify-center">
                                      <Button icon type='button' title='Selecionar' variant='success'><Check weight='bold' size={20} /></Button>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                        </tbody>
                      </table>
                    )
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}