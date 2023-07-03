import { MenuItem, Select as MuiSelect } from '@mui/material'
import { ComponentPropsWithRef } from '@react-spring/web'
import { ForwardedRef, forwardRef, useState } from 'react'

type SelectProps = ComponentPropsWithRef<typeof MuiSelect> & {
  selectList: string[]
}

function Select({ selectList, title }: SelectProps, ref: ForwardedRef<HTMLSelectElement>) {
  const [selectedElement, setSelectedElement] = useState(selectList[0])
  const elementChange = (event: any) => setSelectedElement(event.target.value)

  return (
    <>
      <h5 style={{ marginBottom: 5 }}>{title}</h5>
      <MuiSelect
        ref={ref}
        value={selectedElement}
        onChange={elementChange}
        inputProps={{ IconComponent: (): undefined => undefined }}
        style={{
          color: '#fff',
          // backgroundColor: '#161616',
          backgroundColor: '#202036',
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
      </MuiSelect>
    </>
  )
}

export default forwardRef(Select)
