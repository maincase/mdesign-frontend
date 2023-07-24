import styled from '@emotion/styled'
import { Button } from '@mui/material'

const UploadButton = styled(Button)(() => ({
  // color: '#8c8c8c',
  color: '#fff',
  height: '206px',
  width: '100%',
  // backgroundColor: '#161616',
  backgroundColor: '#202036 !important',
  borderRadius: 12,
  '&:hover': {
    backgroundColor: '#161616',
    opacity: 0.75,
  },
}))

export default UploadButton
