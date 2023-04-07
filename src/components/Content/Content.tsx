import { Grid, Stack } from '@mui/material'

import clsx from 'clsx'
import interiorElementsList from './inter-items'

import PredictionCard from '../PredictionCard/PredictionCard'
import styles from './Content.module.scss'

export default function Content() {
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
            {el.images.map((image) => (
              <Grid sx={{ height: '30vh' }} display="flex" className="first-of-type:pl-0" xs={3} item key={image.img}>
                <PredictionCard
                  image={image}
                  predictions={[
                    [
                      ['potted plant', 0.843, [234.03, 256.13, 285.51, 314.18]],
                      ['bowl', 0.863, [238.3, 353.3, 261.15, 379.45]],
                      ['potted plant', 0.995, [201.82, 288.67, 246.86, 376.29]],
                      ['couch', 0.994, [224.97, 299.32, 578.57, 422.34]],
                    ],
                  ]}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
