import { ArrowCircleDown, ArrowCircleUp, ArrowsDownUp, CurrencyCircleDollar } from '@phosphor-icons/react'
import style from './styles.module.css'

type CardSummaryTransactionProps = {
  type: "input" | "output" | "total" | "transactions"
  valueCurrent?: number
  //valueBack?: number
}

export default function CardSummaryTransaction({ type, valueCurrent = 0 }: CardSummaryTransactionProps) {

  const typeConfig = {
    input: { label: "Entradas", icon: <ArrowCircleUp size={32} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})},
    output: { label: "Saídas", icon: <ArrowCircleDown size={32} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) },
    total: { label: "Total", icon: <CurrencyCircleDollar size={32} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) },
    transactions: { label: "Transações", icon: <ArrowsDownUp size={30} />, value: valueCurrent },
  };

  const { label, icon, value } = typeConfig[type];
  //const comparation = (((valueCurrent - valueBack) / valueBack) * 100).toFixed(0)

  return (
    <div id={style.cardSummaryTransaction} className={style[type]}>
      <div className={style.isInput}>
        <span>{label}</span>
        {icon}
      </div>
      <div className={style.contentTotal}>
        <span className={style.total}>{value}</span>
        {
          /*
          type !== "total" && (
            <span className={style.comparation}>{comparation}% em relação a ontem</span>
          )
          */
        }
      </div>
    </div>
  )
}