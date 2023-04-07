import { Grid, Stack } from '@mui/material'

import clsx from 'clsx'
import interiorElementsList from './interior-items'

import { ComponentPropsWithoutRef } from 'react'
import PredictionCard from '../PredictionCard/PredictionCard'
import styles from './Content.module.scss'
import predictionItems from './prediction-items'

type Props = ComponentPropsWithoutRef<typeof Stack> & {
  onInteriorSelect: (interior: {
    name: string
    images: {
      id: number
      img: string
      description: string
    }[]
  }) => void
}

export default function Content({ onInteriorSelect }: Props) {
  return (
    <Stack className={clsx('overflow-y-auto', styles.content_stack)} spacing={2} padding={2}>
      <span className={clsx('flex', styles.header_text)}>Latest designs and recommendations created by our AI:</span>
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        paddingLeft={3}
        style={{
          marginTop: 0,
        }}
      >
        {interiorElementsList.map((el, ind) => (
          <Grid
            key={`${el.name}+${ind}`}
            // paddingTop={0}
            paddingLeft={0}
            marginTop={2}
            display="flex"
            className="items-center !pt-0 rounded-md px-3 border hover:shadow-xl cursor-pointer"
            sx={{ height: '33vh', backgroundColor: '#ebebeb' }}
            container
            item
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            // boxShadow={3}
          >
            {el.images.map((image, imgInd) => (
              <Grid display="flex" className="first-of-type:pl-0" xs={3} item key={image.img}>
                <PredictionCard
                  image={image}
                  prediction={predictionItems.find((pred) => pred.name === image.img)?.predictions}
                  onClick={() => (imgInd === 0 ? onInteriorSelect(el) : undefined)}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
