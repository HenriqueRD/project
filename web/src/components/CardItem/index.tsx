import { X } from '@phosphor-icons/react'
import { ItemProps } from '../../types'
import Button from '../Button'
import Tag from '../Tag'

type CardItemProps = {
  data: ItemProps
  id: number
  readOnly?: boolean
  handleOnClick?: () => void
}

export default function CardItem({ data: { amount, description, product, }, id, readOnly = false, handleOnClick } : CardItemProps) {
  return (
    <div className='flex border-y border-gray-300 rounded p-2 flex-col gap-4'>
      <div className="flex items-center justify-between">
        <div>
          <span>({id}) - </span>
          <span className="uppercase">{product.name}</span>
          <span> x <Tag text={amount.toString()} type='alert'/></span>
        </div>
        <span><Tag text={(amount * product.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} type='success'/></span>
      </div>
      <div className="flex items-center justify-between">
        <p><strong>obs:</strong> {description}</p>
        {id}

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