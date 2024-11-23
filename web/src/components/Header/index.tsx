import { Link } from 'react-router-dom'
import style from './styles.module.css'

export default function Header() {

  return (
    <header id={style.header}>
      <div className='container'>
        <div className={style.content}>
          <h1 className={style.logo}>Dordox</h1>
          <div className={style.navsLink}>
            <nav>
              <Link to="/">Pedidos</Link>
              <Link to="/novo-pedido">Criar Pedido</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}