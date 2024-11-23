import { X } from '@phosphor-icons/react'
import { ItemProps } from '../../types'
import Button from '../Button'
import style from './styles.module.css'

type CardItemProps = {
  data: ItemProps
  id: number
  handleOnClick: () => void
}

export default function CardItem({ data: { amount, description, product, total }, id, handleOnClick } : CardItemProps) {

  return (
    <div id={style.cardItem}>
      <div className={style.infoItem}>
        <div>
          <span>({id}) - </span>
          <span className={style.product}>{product.name}</span>
          <span className={style.amount}> x {amount}</span>
        </div>
        <span>{total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
      </div>
      <div className={style.descButton}>
        <p><strong>obs:</strong> {description}</p>
        <Button title='Remover Item' icon variant='danger' onClick={handleOnClick}>
          <X size={20} weight='bold' />
        </Button>
      </div>
    </div>
  )
}