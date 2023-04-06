import { Card, CardMedia, Grid, Stack } from '@mui/material'

import clsx from 'clsx'
import interiorElementsList from './inter-items'

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
        {interiorElementsList.map((el) => (
          <Grid
            key={el.name}
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
                <Card
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <CardMedia sx={{ height: '100%' }} image={image.img} title={image.description} />
                </Card>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
