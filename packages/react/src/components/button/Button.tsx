import * as React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  children,
  className,
  ...props
}) => {
  const baseStyles = {
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  const variants = {
    default: {
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#000',
      border: '1px solid #e2e8f0',
    },
  }

  const style = {
    ...baseStyles,
    ...variants[variant],
  }

  return (
    <button style={style} className={className} {...props}>
      {children}
    </button>
  )
}
