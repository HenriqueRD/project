import { FormEvent, useState } from 'react'
import Header from '../../components/Header'
import style from './styles.module.css'
import CardItem from '../../components/CardItem'
import Button from '../../components/Button'
import { Check, Minus, PipeWrench, Plus } from '@phosphor-icons/react'
import { ItemProps, ProductProps } from '../../types'
import Tag from '../../components/Tag'

const products = [
  {
    id: 1,
    name: "Prato feito",
    type: "11",
    price: 20
  },
  {
    id: 2,
    name: "Prato feito 1/2",
    type: "11",
    price: 13
  },
  {
    id: 3,
    name: "Meio Cachorro",
    type: "11",
    price: 11
  },
  {
    id: 4,
    type: "11",
    name: "Cachorro de Bife",
    price: 21
  },
  {
    id: 5,
    name: "Xis frango",
    type: "11",
    price: 27
  },
]

export default function CreateRequest() {

  const [ productCurrent, setProductCurrent ] = useState<ProductProps>({} as any)
  const [ itemsSelected, setItemsSelected ] = useState<ItemProps[]>([])
  const [ amount, setAmount ] = useState(0)
  const [ service, setService ] = useState("local")
  const [ description, setDescription ] = useState("")

  function handleSearchItem(event : FormEvent) {
    event.preventDefault()

  }

  function handleAddItem(event : FormEvent) {
    event.preventDefault()
    if (!productCurrent.name || amount === 0) return 
    setItemsSelected([...itemsSelected, {
      amount,
      description,
      total: productCurrent.price * amount,
      product: productCurrent
    }])
    setAmount(0)
    setDescription("")
    setProductCurrent({} as any)
  }

  function handleRemoveItem(id : number) {
    const newArray = itemsSelected.filter((__, i) => i !== id)
    setItemsSelected(newArray)
  }

  function handleAddAmount() {
    setAmount(amount + 1)
  }

  function handleRemoveAmount() {
    if(amount  <= 0) return
    setAmount(amount - 1)
  }

  return (
    <>
      <Header />
      <main id={style.createRequest}>
        <div className="container">
          <div className="content">
            <div className={style.contentForm}>
              <div className={style.twoForms}>
                <form className={style.formRequest}>
                  <h3>Novo Pedido</h3>          
                  <div className={style.twoInput}>
                    <div className={style.box}>
                      <label htmlFor="client">Cliente</label>
                      <input id='client' type="text" placeholder='nome do cliente'/>
                    </div>
                    <div className={style.box}>
                      <label htmlFor="service">Serviço*</label>
                      <select id='service' value={service} onChange={x => setService(x.target.value)}>
                        <option value="">Escolha o tipo</option>
                        <option value="local">Local</option>
                        <option value="levar">Levar</option>
                      </select>
                    </div>
                  </div>
                </form>
                <form onSubmit={handleAddItem} className={style.formItem}>
                  <div className={style.formItemHeader}>
                    <h3>Item selecionado</h3>
                    <Button type='submit' text='Adicionar Item' />
                  </div>
                  <div className={style.twoInput}>
                    <div className={style.box}>
                      <label htmlFor="">Nome do Produto</label>
                      <input type="text" placeholder='Escolher Produto' value={productCurrent.name} readOnly/>
                    </div>
                    <div className={style.box}>
                      <label htmlFor="amount">Quantidade*</label>
                      <div className={style.addAmount}>
                        <Button onClick={handleRemoveAmount} type='button' icon variant='danger' ><Minus size={20} weight='bold' /></Button>
                        <input type="number" id='amount' value={amount} />
                        <Button onClick={handleAddAmount} type='button' icon variant='success'><Plus size={20} weight='bold' /></Button>
                      </div>
                    </div>
                  </div>
                  <div className={style.twoInput}>
                    <div className={style.box}>
                      <label className={style.desc} htmlFor="desc">Descrição</label>
                      <input type="text" id="desc" placeholder='Observações sobre o produto' value={description} onChange={x => setDescription(x.target.value)} />
                    </div>
                  </div>
                </form>
                <div className={style.listItems}>
                  <div className={style.listItemsHeader}>
                    <h3>Itens</h3>
                    <Tag type="normal" text={itemsSelected.length.toString()} />
                  </div>
                  <div className={style.containerListItems}>
                    {
                      itemsSelected.length === 0 ? (
                        <div className={style.empty}>
                          <span>Nem um item selecionado</span>
                        </div>
                      ) : (
                        <ul>
                          {
                            itemsSelected.map((x, i) => {
                              return (
                                <li key={i}>
                                  <CardItem data={x} id={i+1} handleOnClick={() => handleRemoveItem(i)}/>
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
              <form onSubmit={handleSearchItem} className={style.formSearchItem}>
                <h3>Item</h3>
                <div className={style.headerTable}>
                  <div className={style.box}>
                    <label htmlFor="id">Procurar por id ou nome</label>
                    <div className={style.inputsSearch}>
                      <input  id='id' type="number" className={style.id} placeholder='id'/>
                      <input id='name' type="text"  placeholder='nome do produto'/>
                    </div>
                  </div>
                  <Button type='submit' text='Procurar'/>
                </div>
                <div className={style.containerTable}>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Produto</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        products.map(x => {
                          return (
                            <tr key={x.id} title='Selecionar' onClick={() => { setProductCurrent(x); setAmount(1)}}>
                              <th scope="row">{x.id}</th>
                              <td>{x.name}</td>
                              <td>R$ {x.price},00</td>
                              <td className="buttons">
                                <Button icon title='Selecionar' variant='success'><Check weight='bold' size={20} /></Button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}