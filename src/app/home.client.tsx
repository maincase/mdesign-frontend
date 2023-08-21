'use client'

import { useQueryInteriors } from '@/api/query-hooks/interior'
import RenderCard from '@/components/RenderCard/RenderCard'
import { useInteriorItems } from '@/state/interior/useInteriorItems'
import variables from '@/styles/variables.module.scss'
import { css } from '@emotion/css'
import { Grid, Link, Paper, Stack } from '@mui/material'
import clsx from 'clsx'
import NextLink from 'next/link'
import { useEffect } from 'react'

const styles = {
  header_text: css`
    font-size: 17px;
    font-weight: bold;
    color: #737373;
  `,
  content_stack: css`
    height: ${variables.middleElementsHeight};
  `,
}

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: serverInteriors } = useQueryInteriors()

  const { items: interiorItems, setItems: setInteriorItems } = useInteriorItems()

  useEffect(() => {
    // Populate global state from server data on initial page load
    if (serverInteriors && interiorItems.length === 0) {
      setInteriorItems(serverInteriors.pages.flat())
    }
  }, [serverInteriors])

  return (
    <Stack className={clsx('overflow-y-auto', styles.content_stack)} spacing={2} padding={2}>
      <Paper className={clsx('flex', styles.header_text)} elevation={0} variant="outlined" sx={{ padding: 2 }}>
        Latest designs and recommendations created by our AI:
      </Paper>
      <Stack spacing={2}>
        {/* <Grid
        container
        // sx={{ flexGrow: 1 }}
        spacing={2}
        // rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        // paddingLeft={3}
        // style={{
        //   marginTop: 0,
        // }}
      > */}
        {interiorItems.map(
          (interior, ind) =>
            interior?.progress === 100 && (
              <Paper
                key={interior.id}
                sx={{ /* flexGrow: 1, */ /* minHight: '33vh', */ backgroundColor: '#ebebeb' }}
                className="flex rounded-md border hover:shadow-xl p-3"
              >
                {/* <Grid key={interior.id} item xs={12}> */}
                <Grid
                  // key={interior.id}
                  // paddingTop={0}
                  // paddingLeft={0}
                  // marginTop={2}
                  // display="flex"
                  // className="items-center !pt-0 rounded-md !px-3 border hover:shadow-xl"
                  container
                  justifyContent="center"
                  alignItems="center"
                  // spacing={2}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  // boxShadow={3}
                >
                  {/* <Grid item xs={12}> */}
                  <Grid
                    // /* display="flex" sx={{ flexGrow: 1 }} */ className="first-of-type:!pl-0"
                    xs={3}
                    item
                    // height="100%"
                    key={interior.id}
                  >
                    <Link /* display="block" height="100%" */ component={NextLink} href={`/interior/${interior.id}`}>
                      <RenderCard
                        render={interior}
                        interiorInd={ind}
                        // renderInd={0}
                        // objects={render?.objects}
                        showCursor
                      />
                    </Link>
                  </Grid>

                  {interior.renders?.map((render, renderInd) => (
                    <Grid
                      // /* display="flex" sx={{ flexGrow: 1 }} */ className="first-of-type:!pl-0"
                      xs={3}
                      item
                      // height="100%"
                      key={render.id}
                    >
                      <Link
                        // display="block"
                        // height="100%"
                        component={NextLink}
                        href={`/interior/${interior.id}/render/${render.id}`}
                      >
                        <RenderCard
                          render={render}
                          interiorInd={ind}
                          renderInd={renderInd}
                          objects={render?.objects}
                          showCursor
                        />
                      </Link>
                    </Grid>
                  ))}
                  {/* </Grid> */}
                </Grid>
                {/* </Grid> */}
              </Paper>
            )
        )}
      </Stack>
      {/* </Grid> */}
    </Stack>
  )
}
