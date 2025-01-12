import { format } from 'date-fns'

type LinkGotoBackProps = {
  createdAt: Date
  updatedAt: Date
}

export default function RecordCreateUpdate({ createdAt, updatedAt } : LinkGotoBackProps) {
  return (
    <div className="flex items-center flex-col font-medium text-gray-500 text-xs">
      <span>Criado em {format(createdAt, 'dd/MM/yyyy HH:mm')}</span>
      <span>Atualizado em {format(updatedAt, 'dd/MM/yyyy  HH:mm')}</span>
    </div>
  )
}