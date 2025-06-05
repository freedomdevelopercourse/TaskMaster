import type { InputHTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const inputStyles = tv({
  base: 'py-2 px-3 border-foreground-subtle rounded-lg border outline-none ',
  variants: {
    color: {
      default: null,
      error: 'border-destructive',
    },
  },
  defaultVariants: {
    color: 'default',
  },
})

export default function Input({ className, color, ...props }: InputProps) {
  return <input {...props} className={inputStyles({ color, className })} />
}

type InputVariants = VariantProps<typeof inputStyles>

type InputProps = InputVariants & InputHTMLAttributes<HTMLInputElement> & {}
