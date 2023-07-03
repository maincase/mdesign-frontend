import styled from '@emotion/styled'
import { Button } from '@mui/material'

const ColorButton = styled(Button)(() => ({
  // color: '#000',
  color: '#202036',
  backgroundColor: '#fff',
  width: '100%',
  marginTop: '10px',
  border: '1px solid',
  borderRadius: 12,
  '&:hover': {
    // color: '#fff',
    // borderColor: '#fff',
    color: '#202036',
    borderColor: 'transparent',
  },
}))

export default ColorButton
