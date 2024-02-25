import { MenuItem, Select as MuiSelect } from '@mui/material'
import { ComponentPropsWithRef, useState } from 'react'
import FormControl from '../FormControl/FormControl'

type SelectProps = ComponentPropsWithRef<typeof MuiSelect<React.ReactNode>> & {
  selectList: string[]
  icon?: React.ReactNode
}

export default function Select({ selectList, title, inputProps, className, icon, ...props }: SelectProps) {
  const [selectedElement, setSelectedElement] = useState(selectList[0])

  const elementChange = (event: any) => setSelectedElement(event.target.value)

  return (
    <FormControl title={title} className={className} icon={icon}>
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
    </FormControl>
  )
}
