import { Grid } from '@mui/material'
import predictionItems from '../Content/prediction-items'
import PredictionCard from '../PredictionCard/PredictionCard'

type Props = {
  currentInterior?: {
    name: string
    images: {
      id: number
      img: string
      description: string
    }[]
  }
}

export default function Interior({ currentInterior }: Props) {
  return (
    <>
      {currentInterior
        ? currentInterior.images.map((image) => (
            <Grid display="flex" className="first-of-type:pl-0 float-left" xs={3} item key={image.img}>
              <PredictionCard
                image={image}
                prediction={predictionItems.find((pred) => pred.name === image.img)?.predictions}
              />
            </Grid>
          ))
        : null}
    </>
  )
}
