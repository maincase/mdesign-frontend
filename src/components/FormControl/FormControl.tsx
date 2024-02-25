import { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
  icon: React.ReactNode
}

export default function FormControl({ className, title, icon, children }: Props) {
  return (
    <div className={className}>
      <div className="flex items-center">
        {icon}
        <span className="flex leading-5.5">{title}:</span>
      </div>

      {children}
    </div>
  )
}
