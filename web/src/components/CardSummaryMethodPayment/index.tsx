import { Bank, CreditCard, CurrencyDollar, PixLogo } from '@phosphor-icons/react'
import style from './styles.module.css'

type CardSummaryTransactionProps = {
  type: "debit" | "credit" | "money" | "pix"
  valueCurrent?: number
}

export default function CardSummaryMethodPayment({ type, valueCurrent = 0 }: CardSummaryTransactionProps) {

  const typeConfig = {
    money: { label: "Dinheiro", icon: <CurrencyDollar size={24} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})},
    credit: { label: "Crédito", icon: <CreditCard size={24} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) },
    debit: { label: "Débito", icon: <Bank size={24} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) },
    pix: { label: "Pix", icon: <PixLogo size={24} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) },
  };

  const { label, icon, value } = typeConfig[type];

  return (
    <div id={style.cardSummaryMethodPayment} className={style[type]}>
      <div className={style.isInput}>
        <span>{label}</span>
        {icon}
      </div>
      <div className={style.contentTotal}>
        <span className={style.total}>{value}</span>
      </div>
    </div>
  )
}