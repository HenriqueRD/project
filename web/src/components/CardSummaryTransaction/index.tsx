import { ArrowCircleDown, ArrowCircleUp, ArrowsDownUp, CurrencyCircleDollar } from '@phosphor-icons/react'
import { tv } from 'tailwind-variants'

const card = tv({
  base: 'p-4 rounded flex gap-4 flex-col max-w-48 w-full',
  variants: {
    type: {
      input: 'bg-green-neon border border-green-700 text-green-900',
      output: 'bg-red-neon border border-red-700 text-red-900',
      total: 'bg-gray-neon border border-gray-700 text-gray-900',
      transactions: 'bg-blue-neon border border-blue-700 text-blue-900',
    },
  },
  defaultVariants: {
    type: 'transactions',
    isActive: true,
    icon: false
  }
})

type CardSummaryTransactionProps = {
  type: "input" | "output" | "total" | "transactions"
  valueCurrent?: number
}

export default function CardSummaryTransaction({ type, valueCurrent = 0 }: CardSummaryTransactionProps) {

  const typeConfig = {
    input: { label: "Entradas", icon: <ArrowCircleUp size={32} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})},
    output: { label: "Saídas", icon: <ArrowCircleDown size={32} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) },
    total: { label: "Total", icon: <CurrencyCircleDollar size={32} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) },
    transactions: { label: "Transações", icon: <ArrowsDownUp size={30} />, value: valueCurrent },
  };

  const { label, icon, value } = typeConfig[type];

  return (
    <div className={card({ type })}>
      <div className="flex items-center justify-between">
        <span className="text-gray-800 font-medium">{label}</span>
        {icon}
      </div>
      <span className="font-medium text-2xl">{value}</span>
    </div>
  )
}