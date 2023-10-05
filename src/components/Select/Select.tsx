import { MenuItem, Select as MuiSelect } from '@mui/material'
import { ComponentPropsWithRef, useState } from 'react'

type SelectProps = ComponentPropsWithRef<typeof MuiSelect<React.ReactNode>> & {
  selectList: string[]
  icon?: React.ReactNode
}

export default function Select({ selectList, title, inputProps, className, icon, ...props }: SelectProps) {
  const [selectedElement, setSelectedElement] = useState(selectList[0])

  const elementChange = (event: any) => setSelectedElement(event.target.value)

  return (
    <div className={className}>
      <div className="flex items-center">
        {icon}
        <span className="flex leading-5.5">{title}:</span>
      </div>

      <MuiSelect
        value={selectedElement}
        onChange={elementChange}
        inputProps={{ IconComponent: (): undefined => undefined, ...inputProps }}
        style={{
          color: '#fff',
          // backgroundColor: '#161616',
          backgroundColor: '#000000',
          border: '1px solid #ffffff33',
          width: '100%',
          borderRadius: 8,
        }}
        {...props}
      >
        {selectList.map((el: string) => (
          <MenuItem value={el} key={el}>
            {el}
          </MenuItem>
        ))}
      </MuiSelect>
    </div>
  )
}
