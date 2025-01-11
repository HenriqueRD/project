import { Link } from 'react-router-dom'

export default function Header() {

  return (
    <header className='bg-blue-800 p-3'>
      <div className='container'>
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl text-gray-100">Dordox</h1>
          </Link>
          <nav className="flex gap-4">
            <Link className="text-gray-100 border-b border-transparent hover:border-b hover:border-gray-100" to="/">Transações</Link>
            <Link className="text-gray-100 border-b border-transparent hover:border-b hover:border-gray-100" to="/pedidos">Pedidos</Link>
            <Link className="text-gray-100 border-b border-transparent hover:border-b hover:border-gray-100" to="/despesa/criar">Nova despesa</Link>
            <Link className="text-gray-100 border-b border-transparent hover:border-b hover:border-gray-100" to="/pedido/criar">Novo pedido</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}