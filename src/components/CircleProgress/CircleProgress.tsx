import { Box, CircularProgress, CircularProgressProps, Typography } from '@mui/material'
import { useMemo } from 'react'

// const useStyles = makeStyles({
//   '@keyframes ': {
//     0% {}
//   },
// })

// const animatedgradient = keyframes\`
//   0% {
//     stroke-dashoffset: 0%;
//   }
//   50% {
//     stroke-dashoffset: 50%;
//   }
//   100% {
//     stroke-dashoffset: 100%;
//   }
// `

type Props = CircularProgressProps

export default function CircleProgress({ value = 0 }: Props) {
  const progressTitle = useMemo(() => {
    if (value <= 2) {
      return 'Kickstarting Design Rendering'
    } else if (value > 2 && value <= 25) {
      return 'Crafting First AI-Driven Design'
    } else if (value > 25 && value <= 50) {
      return 'Assembling Second AI-Driven Design'
    } else if (value > 50 && value <= 70) {
      return 'Building Third AI-Driven Design'
    } else if (value > 70 && value <= 100) {
      return 'Finalizing and Incorporating Partner Store Recommendations'
    }
  }, [value])

  return (
    <Box
      width="100%"
      // height="80%"
      display="flex"
      // flexGrow={1}
      // alignItems="center"
      // justifyContent="space-between"
      // height="100%"
      // sx={{
      //   display: 'flex',
      //   flexGrow: 1,
      //   // color: ,
      // }}
      position="relative"
    >
      <svg className="absolute">
        <defs>
          <linearGradient
            id="progress_gradient"
            gradientUnits="userSpaceOnUse"
            x1="-9.15%"
            y1="84.15%"
            x2="109.15%"
            y2="15.85%"
          >
            <stop stop-color="#c0c0c0" />
            <stop offset=".333" stop-color="#5073b8" />
            <stop offset=".667" stop-color="#1098ad" />
            <stop offset="1" stop-color="#148676" />
          </linearGradient>
        </defs>
      </svg>

      <CircularProgress
        size="100%"
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        value={100}
      />

      <CircularProgress
        // className="absolute inset-0"
        size="100%"
        variant="determinate"
        // color="inherit"
        sx={{
          'svg circle': {
            stroke: 'url(#progress_gradient)',
            strokeLinecap: 'round',
            // animation: `${animatedgradient} 6s ease infinite alternate`,
          },
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
        }}
        value={value} /* style={{ width: '100%' }} */
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary" fontSize="5rem">{`${Math.round(
          value ?? 0
        )}%`}</Typography>
        <Typography fontSize="0.8rem" className="flex mt-4">
          {progressTitle}
        </Typography>
      </Box>
    </Box>
  )
}
