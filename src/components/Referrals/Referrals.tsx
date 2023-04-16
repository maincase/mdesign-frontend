import { Paper, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import Fade from '../Fade/Fade'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function Referrals() {
  return (
    <Fade in={true} className="mx-2 flex-grow">
      <Stack className="flex-grow" spacing={2}>
        <Item>Item 2</Item>
        <Item>Item 1</Item>
      </Stack>
    </Fade>
  )
}
