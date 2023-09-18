import { MenuItem, Select as MuiSelect } from '@mui/material'
import { ComponentPropsWithRef, useState } from 'react'

type SelectProps = ComponentPropsWithRef<typeof MuiSelect> & {
  selectList: string[]
}

export default function Select({ selectList, title, inputProps }: SelectProps) {
  const [selectedElement, setSelectedElement] = useState(selectList[0])
  const elementChange = (event: any) => setSelectedElement(event.target.value)

  return (
    <>
      <h5 style={{ marginBottom: 5 }}>{title}</h5>
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
      >
        {selectList.map((el: string) => (
          <MenuItem value={el} key={el}>
            {el}
          </MenuItem>
        ))}
      </MuiSelect>
    </>
  )
}
