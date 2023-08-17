import styled from '@emotion/styled'
import { Button } from '@mui/material'

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

const ColorButton = styled(Button)(() => ({
  '@keyframes animatedgradient': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
  // background: '-webkit-linear-gradient(45deg, #680aca, #202036)',
  background: 'linear-gradient(60deg, #c0c0c0, #5073b8, #1098ad, #148676) !important',
  WebkitAnimation: 'animatedgradient 6s ease infinite alternate',
  animation: 'animatedgradient 6s ease infinite alternate',
  backgroundSize: '300% 300%',
  // border: '1px solid #000000',
  color: '#fff',
  // '&:hover': {
  //   // border: '1px solid #fff',
  //   background: 'none',

  //   border: '1px solid #202036',
  //   color: '#202036',
  // },
  display: 'inline-block',
  margin: 7,
  fontWeight: 'bold',
  borderRadius: 12,
  textDecoration: 'none',
  fontSize: 16,
  textAlign: 'center',
  '&:last-of-type': {
    marginRight: 0,
  },
}))

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

export default ColorButton
