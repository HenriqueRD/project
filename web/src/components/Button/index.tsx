import { ButtonHTMLAttributes, ReactNode } from 'react'
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'h-8 text-white px-4 rounded flex items-center justify-between gap-2 font-medium cursor-pointer',
  variants: {
    variant: {
      primary: 'bg-blue-600 hover:bg-blue-500',
      success: 'bg-green-600 hover:bg-green-500',
      alert: 'bg-yellow-500 hover:bg-yellow-400',
      danger: 'bg-red-600 hover:bg-red-500',
      normal: 'bg-gray-600 hover:bg-gray-500',
    },
    isActive: {
      true: '',
      false: 'opacity-60'
    },
    icon: {
      true: 'px-0 w-8 justify-center',
      false: ''
    }
  },
  defaultVariants: {
    variant: 'primary',
    isActive: true,
    icon: false
  }
})

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string
  icon?: boolean
  isActive?: boolean
  variant?: "primary" | "success" | "alert" | "danger" | "normal"
  children?: ReactNode
}

export default function Button({ text, variant, icon, isActive, children, ...rest } : ButtonProps) {
  return (
    <button {...rest} className={button({ variant, isActive, icon })}>
      {
        icon ? (
          <>
            {children}
          </>
        ) : (
          <>
          {children}
          <span>{text}</span>
          </>
        )
      }
    </button>
  )
}