import { X } from '@phosphor-icons/react'
import { ItemProps } from '../../types'
import Button from '../Button'
import style from './styles.module.css'
import Tag from '../Tag'

type CardItemProps = {
  data: ItemProps
  id: number
  readOnly?: boolean
  handleOnClick?: () => void
}

export default function CardItem({ data: { amount, description, product, }, id, readOnly = false, handleOnClick } : CardItemProps) {
  return (
    <div id={style.cardItem}>
      <div className={style.infoItem}>
        <div>
          <span>({id}) - </span>
          <span className={style.product}>{product.name}</span>
          <span className={style.amount}> x <Tag text={amount.toString()} type='alert'/></span>
        </div>
        <span><Tag text={(amount * product.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} type='success'/></span>
      </div>
      <div className={style.descButton}>
        <p><strong>obs:</strong> {description}</p>
        {
          !readOnly && (
            <Button title='Remover Item' icon variant='danger' onClick={handleOnClick}>
              <X size={20} weight='bold' />
            </Button>
          )
        }
      </div>
    </div>
  )
}