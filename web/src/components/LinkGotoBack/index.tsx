import { ArrowLeft } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

type LinkGotoBackProps = {
  text: string
  to: string
}

export default function LinkGotoBack({ text, to } : LinkGotoBackProps) {
  return (
    <Link className="text-gray-500 font-medium text-sm border-b border-transparent hover:border-gray-500 flex items-center gap-2" to={to}><ArrowLeft size={18} weight='bold' /> {text}</Link>
  )
}