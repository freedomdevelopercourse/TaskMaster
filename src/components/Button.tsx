import type { ButtonHTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'rounded transition-colors size-fit',
  variants: {
    color: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
      warning: 'bg-warning text-warning-foreground hover:bg-warning-hover',
      success: 'bg-success text-success-foreground hover:bg-success-hover',
    },
    size: {
      icon: 'p-2',
      small: 'px-4 py-1.5',
      medium: 'px-5 py-2',
      large: 'px-6 py-4',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'medium',
  },
})

export default function Button({ className, color, size, ...props }: ButtonProps) {
  return <button {...props} className={buttonStyles({ color, size, className })} />
}

type ButtonVariants = VariantProps<typeof buttonStyles>

type ButtonProps = ButtonVariants & ButtonHTMLAttributes<HTMLButtonElement> & {}
