import { Grid } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import predictionItems from '../Content/prediction-items'
import Fade from '../Fade/Fade'
import PredictionCard from '../PredictionCard/PredictionCard'

export type Render = {
  id: number
  img: string
  description: string
}

type Props = {
  currentInterior?: {
    images: Render[]
  }
  currentRender?: Render
  setCurrentRender?: Dispatch<SetStateAction<Render | undefined>>
}

export default function Interior({ currentInterior, currentRender, setCurrentRender }: Props) {
  return (
    <>
      <Fade in={!currentRender && !!currentInterior}>
        <Grid
          container
          spacing={2}
          style={{
            height: '85vh',
          }}
        >
          {currentInterior?.images?.map((image, ind) => (
            <Grid
              display="flex"
              className="first-of-type:pl-0 float-left"
              xs={6}
              item
              key={image.img}
              style={{
                height: '50%',
              }}
            >
              <PredictionCard
                image={image}
                prediction={predictionItems.find((pred) => pred.name === image.img)?.predictions}
                onClick={() => setCurrentRender?.(image)}
                raised={false}
                showCursor={ind > 0}
              />
            </Grid>
          ))}
        </Grid>
      </Fade>

      <Fade in={!!currentRender} className="flex items-center justify-center">
        <PredictionCard
          image={currentRender as Render}
          prediction={predictionItems.find((pred) => pred.name === (currentRender as Render)?.img)?.predictions}
          onClick={() => setCurrentRender?.(currentRender)}
          objectsShown={true}
          raised={false}
          showCursor
        />
      </Fade>
    </>
  )
}
