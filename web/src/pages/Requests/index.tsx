import { Check, ClipboardText, NotePencil } from '@phosphor-icons/react'
import Header from '../../components/Header'
import style from './styles.module.css'
import Tag from '../../components/Tag'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'

export default function Requests() {

  return (
    <>
      <Header />
      <main id={style.home}>
        <div className="container">
          <div className='content'>
            <div className={style.requests}>
              <div className={style.headerTable}>
                <h3>Pedidos: 13</h3>
                <Link to="/criar-pedido">
                  <Button text="Fazer Pedido" />
                </Link>
              </div>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status do Pedido</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Data do Pedido</th>
                    <th scope="col">Serviço</th>
                    <th scope="col">Valor total</th>
                    <th scope="col">Ação</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">33</th>
                    <td><Tag text='Em preparação' type='alert' /></td>
                    <td>Ana Paula</td>
                    <td>21/11/2024</td>
                    <td><Tag text='Local' type='normal' /></td>
                    <td>R$ 45,00</td>
                    <td className="buttons">
                      <Button icon title='Visualizar Pedido'><ClipboardText size={22} /></Button>
                      <Button icon title='Editar Pedido' variant='alert'><NotePencil size={22} /></Button>
                      <Button icon title='Finalizar Pedido' variant='success'><Check weight='bold' size={20} /></Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">33</th>
                    <td><Tag text='Finalizado' type='success' /></td>
                    <td>Ana Paula</td>
                    <td>21/11/2024</td>
                    <td><Tag text='Local' type='normal' /></td>
                    <td>R$ 45,00</td>
                    <td className="buttons">
                      <Button icon title='Visualizar Pedido'><ClipboardText size={22} /></Button>
                      <Button icon title='Editar Pedido' variant='alert'><NotePencil size={22} /></Button>
                      <Button icon title='Finalizar Pedido' variant='success'><Check weight='bold' size={20} /></Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">33</th>
                    <td><Tag text='Finalizado' type='success' /></td>
                    <td>Ana Paula</td>
                    <td>21/11/2024</td>
                    <td><Tag text='Local' type='normal' /></td>
                    <td>R$ 45,00</td>
                    <td className="buttons">
                      <Button icon title='Visualizar Pedido'><ClipboardText size={22} /></Button>
                      <Button icon title='Editar Pedido' variant='alert'><NotePencil size={22} /></Button>
                      <Button icon title='Finalizar Pedido' variant='success'><Check weight='bold' size={20} /></Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">33</th>
                    <td><Tag text='Cancelado' type='danger' /></td>
                    <td>Felipe</td>
                    <td>21/11/2024</td>
                    <td><Tag text='Levar' type='alert' /></td>
                    <td>R$ 45,00</td>
                    <td className="buttons">
                      <Button icon title='Visualizar Pedido'><ClipboardText size={22} /></Button>
                      <Button icon title='Editar Pedido' variant='alert'><NotePencil size={22} /></Button>
                      <Button icon title='Finalizar Pedido' variant='success'><Check weight='bold' size={20} /></Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}