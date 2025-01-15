import { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import Button from '../../../components/Button'
import { Check, MagnifyingGlass } from '@phosphor-icons/react'
import CardSummaryTransaction from '../../../components/CardSummaryTransaction'

export default function ManageExpenses() {

  const [ monthCurrent, setMonthCurrent ] = useState(new Date().getMonth() + 1) 

  useEffect(() => { 
  }, [])

  async function handleFilterMonthPendent() {
  }

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header title='Pagamentos pendentes' />
        <main className='mt-8'>
          <div className="container">
            <div className="bg-neutral-50 p-6 rounded border border-slate-200 md:p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span>Veja todas as despesas do mês específico com pagamentos em aberto</span>
                <form onSubmit={handleFilterMonthPendent} className='flex items-center gap-4'>
                  <select value={monthCurrent} onChange={x => setMonthCurrent(parseInt(x.target.value))}>
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                  </select>
                  <Button type='submit' icon>
                    <MagnifyingGlass />
                  </Button>
                </form>
              </div>
              <div className='flex items-center gap-4 border-b border-slate-300 pb-4'>
                <CardSummaryTransaction type='transactions' title='Pendentes' />
                <CardSummaryTransaction type='total' title='Total' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-lg'>Pagamentos a serem realizados</h3>
                <div className='h-96 w-full bg-white border rounded border-slate-300'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope="col">Empresa/Serviço</th>
                        <th scope="col">Valor total</th>
                        <th scope="col">Prazo</th>
                        <th scope="col">Vencimento</th>
                        <th scope="col" className='thButtons'>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Coca-Cola FEMSA</td>
                        <td className='font-medium'>R$ 261,87</td>
                        <td>3 dias</td>
                        <td>21/01/2025</td>
                        <td className='flex items-center justify-center gap-2'>
                          <Button icon variant='success' title='Pagar conta'>
                            <Check weight='bold' size={20}/>
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}