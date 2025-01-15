import { FormEvent, useEffect, useState } from 'react'
import Header from '../../../components/Header'
import Button from '../../../components/Button'
import { Barcode, Check, CurrencyDollar, PixLogo } from '@phosphor-icons/react'
import { MethodPaymentExpenseProps, SupplierProps } from '../../../types'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../api'
import { TailSpin } from 'react-loader-spinner'
import Sidebar from '../../../components/Sidebar'
import LinkGotoBack from '../../../components/LinkGotoBack'

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
    <div className="flex w-full">
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header title='Adicionar despesa' />
        <main className='mt-8'>
          <div className="container">
            <div className="bg-neutral-50 p-6 rounded border border-slate-200 md:p-4">
              <div className="flex gap-8 lg:flex-col">
                <div className="flex flex-col w-3/5 gap-4 lg:w-full">
                  <form onSubmit={handleSupplierOrder} className="flex flex-col gap-4 w-full">
                    <div className="flex justify-between items-start">
                      <div className='flex flex-col gap-4 items-start'>
                        <h3 className='text-lg'>Nova Despesa</h3>
                        <LinkGotoBack to="/" text=' Voltar a despesas'></LinkGotoBack>
                      </div>
                      <div className='flex gap-4 items-center'>
                        <Button title='Adicionar despesa' type="submit" text='Agendar despesa' variant='alert'/>
                        <Button title='Adicionar despesa' type="submit" text='Adicionar despesa' variant='success'/>
                      </div>
                    </div>
                    <div className="flex items-center w-full gap-8 border-b border-slate-300 pb-4">
                      <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="total">Valor total</label>
                        <input id="total" type="number" placeholder='valor da compra' value={totalValue === 0 ? "" : totalValue} onChange={(x) => setTotalValue(parseInt(x.target.value))}/>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="obs">Observações</label>
                        <input id="obs" type="text" placeholder='observação sobre a compra' />
                      </div>
                    </div>
                    <div className="flex gap-4 justify-between border-b border-slate-300 pb-4">
                      <div className='flex flex-col gap-2'>
                        <span>Método de pagamento</span>
                        <div className="flex items-center gap-6">
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
                      <div className="flex flex-col gap-2">
                        <label htmlFor="">Data vencimento</label>
                        <input type="date" />
                      </div>
                    </div>
                  </form>
                  <div className="flex flex-col gap-2">
                    <h3 className='text-lg'>Fornecedor selecionado</h3>
                    <div className="flex items-center w-full gap-8">
                      <div className="flex flex-col gap-2 w-full">
                        <label>Nome</label>
                        <input type="text" placeholder='Escolher Fornecedor' value={supplierCurrent.name} readOnly disabled/>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <label>Tipo</label>
                        <input type="text" placeholder='Escolher Fornecedor' value={supplierCurrent.type} readOnly disabled/>
                      </div>
                    </div>
                  </div>
                </div>
                <form className="w-2/5 flex flex-col gap-4 lg:w-full">
                  <div className='flex flex-col gap-4'>
                    <h3 className='text-lg'>Fornecedores</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="id">Procurar por empresa</label>
                        <input id='name' placeholder='nome da empresa' onChange={(x) => handleSearchSuppliers(x.target.value)} />
                      </div>
                      <Button type='reset' text='Resetar' onClick={handleFormSearchSupplierReset}/>
                    </div>
                  </div>
                  <div className="bg-white rounded border border-slate-200 w-full h-[26rem] overflow-auto">
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
                          <span>nenhuma empresa encontrada</span>
                        </div>
                      )
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}