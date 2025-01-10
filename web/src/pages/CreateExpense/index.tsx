import { FormEvent, useEffect, useState } from 'react'
import Header from '../../components/Header'
import style from './styles.module.css'
import Button from '../../components/Button'
import { ArrowLeft, Barcode, Check, CurrencyDollar, PixLogo } from '@phosphor-icons/react'
import { MethodPaymentExpenseProps, SupplierProps } from '../../types'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { TailSpin } from 'react-loader-spinner'

export default function CreateExpense() {

  const nav = useNavigate()
  const [ supplierCurrent, setSupplierCurrent ] = useState<SupplierProps>({} as any)
  const [ suppliers, setSuppliers ] = useState<SupplierProps[]>([])
  const [ suppliersListCurrent, setSuppliersListCurrent ] = useState<SupplierProps[]>([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ totalValue, setTotalValue ] = useState(0)
  const [ selectMethodPay, setSelectMethodPay ] = useState("" as MethodPaymentExpenseProps)

  async function getSuppliers() {
    setIsLoading(true)
    await api.get("suppliers/").then((x) => { 
      setSuppliers(x.data)
      setSuppliersListCurrent(x.data)
    }).catch((x) => {
      toast.error("falha ao carregar a lista de fornecedores")
      console.error(x.respondde.data.message)
    }).finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getSuppliers()
  }, [])

  function handleSearchSuppliers(text : String) {
    const newArray = suppliers.filter(x => x.name.toLowerCase().includes(text.toLowerCase()))
    setSuppliersListCurrent(newArray);
  }

  function handleFormSearchSupplierReset() {
    setSuppliersListCurrent(suppliers)
  }

  async function handleSupplierOrder(event : FormEvent) {
    event.preventDefault()
    if (totalValue < 1) {
      toast.error("O valor tem que ser maior que R$ 1,00")
      return
    }
    else if (!selectMethodPay) {
      toast.error("Selecione um método de pagamento")
      return
    }
    await api.post("expenses/", { 
      totalValue,
      methodPayment: selectMethodPay,
      supplierId: supplierCurrent.id,
    }).then(() => {
      toast.success("Despesa adicionada")
      nav("/")
    }).catch((x) => {
      toast.error("Falha ao adicionar despeda")
      console.error(x.response.data.message)
    })
  }

  return (
    <>
      <Header />
      <main id={style.createExpense}>
        <div className="container">
          <div className="content">
            <div className={style.contentForm}>
              <div className={style.twoForms}>
                <form onSubmit={handleSupplierOrder} className={style.formExpense}>
                  <div className={style.formExpenseHeader}>
                    <div >
                      <h3>Nova Despesa</h3>
                      <Link to="/"><ArrowLeft size={18} /> Voltar a transações</Link>
                    </div>
                    <Button title='Adicionar despesa' type="submit" text='Adicionar despesa' variant='success'/>
                  </div>
                  <div className={style.twoInput}>
                    <div className={style.box}>
                      <label htmlFor="">Valor total</label>
                      <input type="number" placeholder='valor da compra' value={totalValue === 0 ? "" : totalValue} onChange={(x) => setTotalValue(parseInt(x.target.value))}/>
                    </div>
                    <div className={style.box}>
                      <label htmlFor="">Observações</label>
                      <input type="text" placeholder='observação sobre a compra' />
                    </div>
                  </div>
                  <div className={style.methodPays}>
                    <span>Método de pagamento</span>
                    <div className={style.buttons}>
                      <Button type='button' onClick={() => setSelectMethodPay("DINHEIRO")} text='Dinheiro' title='Pagar com dinheiro' isActive={selectMethodPay === "DINHEIRO"}>
                        <CurrencyDollar size={20} />
                      </Button>
                      <Button type='button' onClick={() => setSelectMethodPay("PIX")} text='Pix' title='Pagar com pix' isActive={selectMethodPay === "PIX"}>
                        <PixLogo size={20} />
                      </Button>
                      <Button type='button' onClick={() => setSelectMethodPay("BOLETO")} text='Boleto' title='Pagar com Boleto' isActive={selectMethodPay === "BOLETO"}>
                        <Barcode size={20} />
                      </Button>
                    </div>
                  </div>
                </form>
                <div className={style.supplier}>
                  <h3>Fornecedor selecionado</h3>
                  <div className={style.twoInput}>
                    <div className={style.box}>
                      <label htmlFor="">Nome</label>
                      <input type="text" placeholder='Escolher Fornecedor' value={supplierCurrent.name} readOnly disabled/>
                    </div>
                    <div className={style.box}>
                      <label htmlFor="">Tipo</label>
                      <input type="text" placeholder='Escolher Fornecedor' value={supplierCurrent.type} readOnly disabled/>
                    </div>
                  </div>
                </div>
              </div>
              <form className={style.formSearchSupplier}>
                <h3>Fornecedores</h3>
                <div className={style.headerTable}>
                  <div className={style.box}>
                    <label htmlFor="names">Procurar por nome</label>
                    <div className={style.inputsSearch}>
                      <input id='names' placeholder='nome da empresa' onChange={(x) => handleSearchSuppliers(x.target.value)} />
                    </div>
                  </div>
                  <Button type='reset' text='Resetar' onClick={handleFormSearchSupplierReset}/>
                </div>
                <div className={style.containerTable}>
                  {
                    isLoading ? (
                      <div className="contentEmpty">
                        <TailSpin
                          visible={true}
                          height="60"
                          width="60"
                          color="#0a58ca"
                          ariaLabel="tail-spin-loading" 
                        />
                      </div>
                    ) : (
                      <table className='table'>
                        <thead>
                          <tr>
                            <th scope="col" className='thId'>#</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Tipo</th>
                            <th scope="col" className='thButtons'>Ação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            suppliersListCurrent.map(x => {
                              return (
                                <tr key={x.id} title='Selecionar' onClick={() => { setSupplierCurrent(x) }}>
                                  <th scope="row" className='thId'>{x.id}</th>
                                  <td>{x.name}</td>
                                  <td>{x.type}</td>
                                  <td className="buttons">
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
                  {
                    suppliersListCurrent.length === 0 && (
                      <div className='contentEmpty'>
                        <span>nem uma empresa encontrada</span>
                      </div>
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