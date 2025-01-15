import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import LinkGotoBack from '../../components/LinkGotoBack'

export default function CreateSuppliers() {

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header title='Cadastrar fornecedor' />
        <main className='mt-8'>
          <div className="container">
            <div className="bg-neutral-50 p-6 rounded border border-slate-200 md:p-4">
              <div className="flex">
                <div className='flex flex-col gap-4 items-start'>
                  <h3 className='text-lg'>Novo fornecedor</h3>
                  <LinkGotoBack to="/" text='Voltar a fornecedores' />
                </div>
                <div className='flex flex-col gap-4 items-end'></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}