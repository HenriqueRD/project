import { useEffect } from 'react'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'

export default function ManageExpenses() {

  useEffect(() => {
  }, [])

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header title='Pagamentos pendentes' />
        <main>
          <div className="container">
            <div className="content">
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}