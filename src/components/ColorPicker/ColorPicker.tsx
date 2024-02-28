import { Popover, TextField, TextFieldProps } from '@mui/material'
import Wheel, { type WheelProps } from '@uiw/react-color-wheel'
import { bindFocus, bindPopover, usePopupState } from 'material-ui-popup-state/hooks'
import { forwardRef, useState } from 'react'
import { z } from 'zod'

// const useStyles = makeStyles({
//   popover: {
//     background
//   }
// })

export const colorSchema = (label: string) =>
  z
    .string({ required_error: `${label} is required` })
    .length(7)
    .startsWith('#')

type Props = Omit<TextFieldProps, 'color'> &
  Omit<WheelProps, 'onChange'> & {
    label: string
    color: z.infer<ReturnType<typeof colorSchema>>
  }

export default forwardRef<HTMLInputElement, Props>(function ColorPicker({ color, label, name, onChange }, ref) {
  const [currentColor, setCurrentColor] = useState<z.infer<ReturnType<typeof colorSchema>>>(color)

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })

  return (
    <div className="flex flex-grow cursor-pointer">
      <Popover
        {...bindPopover(popupState)}
        slotProps={{
          paper: {
            className: 'bg-black',
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        anchorOrigin={{
          vertical: -210,
          horizontal: 'left',
        }}
      >
        <Wheel
          color={color}
          onChange={(color) => {
            colorSchema(label).parse(color.hex)

            onChange?.({
              target: {
                value: color.hex,
              },
            } as React.ChangeEvent<HTMLInputElement>)
          }}
        />
      </Popover>
      <TextField
        ref={ref}
        {...bindFocus(popupState)}
        // type="color"
        name={name}
        value={color}
        label={`${label}:`}
        variant="outlined"
        className="flex flex-grow"
        onChange={(e) => {
          colorSchema(label).parse(e.target.value)

          onChange?.(e)
        }}
        size="small"
      />
    </div>
  )
})
