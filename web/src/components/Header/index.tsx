import { Link } from 'react-router-dom'
import style from './styles.module.css'

export default function Header() {

  return (
    <header id={style.header}>
      <div className='container'>
        <div className={style.content}>
          <Link to="/">
            <h1 className={style.logo}>Dordox</h1>
          </Link>
          <div className={style.navsLink}>
            <nav>
              <Link to="/pedidos">Pedidos</Link>
              <Link to="/novo-pedido">Novo pedido</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}