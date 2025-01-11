import { tv } from 'tailwind-variants'

const tag = tv({
  base: 'py-1 px-2 text-sm font-medium rounded border',
  variants: {
    type: {
      primary: 'bg-blue-400 text-blue-900 border-blue-800',
      success: 'bg-green-400 text-green-900 border-green-800',
      alert: 'bg-yellow-400 text-yellow-900 border-yellow-800',
      danger: 'bg-red-400 text-red-900 border-red-800',
      normal: 'bg-gray-400 text-gray-900 border-gray-800',
    }
  },
  defaultVariants: {
    type: 'primary',
    isActive: true,
    icon: false
  }
})
type TagProps = {
  text: string
  type?: "primary" | "success" | "alert" | "danger" | "normal"
}

export default function Tag({ text, type } : TagProps) {
  
  return (
    <span className={tag({ type: parseTagType(text) })}>
      {parseText(text)}
    </span>
  )
}

function parseTagType(text? : string) {
  if (text === "EM_PREPARACAO" || text === "EM_ABERTO") return "alert"
  else if (text === "PAGO" || text === "FINALIZADO" || text === "ENTRADA") return "success"
  else if (text === "LOCAL") return "normal"
  else if (text === "CONCLUIDO" || text === "LEVAR") return "primary"
  else if (text === "SAIDA") return "danger"
  return "primary"
}

function parseText(text : string) {
  if (text === "EM_PREPARACAO") return "em preparação"
  else if (text === "EM_ABERTO") return "em aberto"
  else if (text === "SAIDA") return "saída"
  else return text
}