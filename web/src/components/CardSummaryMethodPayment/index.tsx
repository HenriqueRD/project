import { Bank, CreditCard, CurrencyDollar, PixLogo } from '@phosphor-icons/react'

type CardSummaryMethodPaymentProps = {
  type: "debit" | "credit" | "money" | "pix"
  valueCurrent?: number
}

export default function CardSummaryMethodPayment({ type, valueCurrent = 0 }: CardSummaryMethodPaymentProps) {

  const typeConfig = {
    money: { label: "Dinheiro", icon: <CurrencyDollar size={24} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})},
    credit: { label: "Crédito", icon: <CreditCard size={24} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) },
    debit: { label: "Débito", icon: <Bank size={24} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) },
    pix: { label: "Pix", icon: <PixLogo size={24} />, value: valueCurrent.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) },
  };

  const { label, icon, value } = typeConfig[type];

  return (
    <div className="max-w-32 w-full bg-green-100 rounded border border-green-700 p-2 flex flex-col justify-between gap-2">
      <div className="flex items-center justify-between text-green-800">
        <span className="text-gray-800">{label}</span>
        {icon}
      </div>
      <span className=" font-medium text-green-900">{value}</span>
    </div>
  )
}