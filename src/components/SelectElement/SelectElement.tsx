import { MenuItem, Select } from '@mui/material'
import React from 'react'

export default function SelectElement({ selectList, title }: { selectList: any; title: string }) {
  const [selectedElement, setSelectedElement] = React.useState(selectList[0])
  const elementChange = (event: any) => {
    setSelectedElement(event.target.value)
  }

  return (
    <>
      <h5 style={{ marginBottom: 5 }}>{title}</h5>
      <Select
        value={selectedElement}
        onChange={elementChange}
        inputProps={{ IconComponent: (): undefined => undefined }}
        style={{
          color: '#fff',
          backgroundColor: '#161616',
          border: '1px solid #ffffff33',
          width: '100%',
          borderRadius: 12,
        }}
      >
        {selectList.map((el: string) => (
          <MenuItem value={el} key={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
