'use client'

import { useQueryInteriors } from '@/api/query-hooks/Interior'
import { useInteriorItems } from '@/components/InteriorManager/useInteriorItems'
import RenderCard from '@/components/RenderCard/RenderCard'
import { Grid, Stack } from '@mui/material'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect } from 'react'
import styles from './home.module.scss'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: serverInteriors } = useQueryInteriors()

  const { items: interiorItems, setItems: setInteriorItems } = useInteriorItems()

  useEffect(() => {
    if (serverInteriors) {
      setInteriorItems(serverInteriors.pages.flat())
    }
  }, [])

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
        {interiorItems.map(
          (interior, ind) =>
            interior?.progress === 100 && (
              <Grid
                key={`${interior.id}+${ind}`}
                // paddingTop={0}
                paddingLeft={0}
                marginTop={2}
                display="flex"
                className="items-center !pt-0 rounded-md !px-3 border hover:shadow-xl"
                sx={{ height: '33vh', backgroundColor: '#ebebeb' }}
                container
                item
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                // boxShadow={3}
              >
                <Grid display="flex" className="first-of-type:!pl-0" xs={3} item key={interior.id}>
                  <Link href={`/interior/${interior.id}`}>
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
                  <Grid display="flex" className="first-of-type:!pl-0" xs={3} item key={render.id}>
                    <Link href={`/interior/${interior.id}/render/${render.id}`}>
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
              </Grid>
            )
        )}
      </Grid>
    </Stack>
  )
}
