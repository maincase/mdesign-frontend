import styled from '@emotion/styled'
import { Button } from '@mui/material'

const UploadButton = styled(Button)(() => ({
  // color: '#8c8c8c',
  color: '#fff',
  height: 300,
  width: '100%',
  backgroundColor: '#000000 !important',
  borderRadius: 8,
  '&:hover': {
    backgroundColor: '#211c1c!important',
  },
}))

export default UploadButton
