import { Button, ButtonProps } from '@mui/material'
import clsx from 'clsx'

// .button_animation {
//   background: -webkit-linear-gradient(45deg, #680aca, #202036);
//   background: linear-gradient(60deg, #c0c0c0, #5073b8, #1098ad, #148676);
//   -webkit-animation: animatedgradient 6s ease infinite alternate;
//   animation: animatedgradient 6s ease infinite alternate;
//   background-size: 300% 300%;
//   border: 1px solid #000000;
//   color: #fff;
//   &:hover {
//     border: 1px solid #fff;
//     background: none;
//   }
// }

// .button {
//   display: inline-block;
//   margin: 7px;
//   font-weight: bold;
//   border-radius: 12px;
//   text-decoration: none;
//   font-size: 16px;
//   text-align: center;
//   &:last-of-type {
//     margin-right: 0;
//   }
// }

// const ColorButton = styled('button')(() => ({
//   background: '#000000!important',
//   color: '#fff',
//   display: 'inline-block',
//   padding: '7px 15px!important',
//   // margin: 7,
//   // fontWeight: '600!important',
//   // textTransform: 'uppercase',
//   borderRadius: 8,
//   textDecoration: 'none',
//   fontSize: '0.875rem',
//   textAlign: 'center',
//   fontFamily: 'Montserrat !important',
//   '&:last-of-type': {
//     marginRight: 0,
//   },

//   '&:hover': {
//     background: '#211c1c!important',
//   },
// }))

// const ColorButton = styled(Button)(() => ({
//   // color: '#000',
//   color: '#202036',
//   backgroundColor: '#fff',
//   width: '100%',
//   marginTop: '10px',
//   border: '1px solid',
//   borderRadius: 12,
//   '&:hover': {
//     // color: '#fff',
//     // borderColor: '#fff',
//     color: '#202036',
//     borderColor: 'transparent',
//   },
// }))

function ColorButton({ children, className, style, ...props }: ButtonProps) {
  return (
    <Button
      sx={{
        background: '#000000',
        color: '#fff',
        display: 'inline-block',
        padding: '7px 15px',
        // margin: 7,
        // fontWeight: '600!important',
        // textTransform: 'uppercase',
        // borderRadius: 8,
        textDecoration: 'none',
        fontSize: '0.875rem',
        textAlign: 'center',
        fontFamily: 'Montserrat !important',
        // '&:last-of-type': {
        //   marginRight: 0,
        // },

        // '&:hover': {
        //   background: '#211c1c!important',
        // },
        ...style,
      }}
      className={clsx('hover:!bg-[#211c1c] !rounded-lg', className)}
      {...props}
    >
      {children}
    </Button>
  )
}

export default ColorButton
