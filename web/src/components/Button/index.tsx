import { ButtonHTMLAttributes, ReactNode } from 'react'
import style from './styles.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string
  icon?: boolean
  variant?: "primary" | "success" | "alert" | "danger" | "normal"
  children?: ReactNode
}

export default function Button({ text, variant = "primary", icon = false, children, ...rest } : ButtonProps) {

  return (
    <button id={style.button} {...rest} className={`${style[variant]} ${icon ? style.isIcon : style.x}`}>
      {children}
      <span>{text}</span>
    </button>
  )
}