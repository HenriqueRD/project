import { Link } from 'react-router-dom'

type HeaderProps = {
  title?: string
}

export default function Header({ title } : HeaderProps) {

  return (
    <header className='bg-blue-700 p-3'>
      <div className='container'>
        <div className="flex items-center justify-between">
          <h3 className='text-lg text-white'>{title}</h3>
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