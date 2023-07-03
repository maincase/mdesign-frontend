import { Grid, Stack } from '@mui/material'
import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'
import { Render } from '../InteriorManager/InteriorManager'
import { useInteriorItems } from '../InteriorManager/useInteriorItems'
import RenderCard from '../RenderCard/RenderCard'
import styles from './Content.module.scss'

type Props = ComponentPropsWithoutRef<typeof Stack> & {
  onInteriorSelect: ({
    currentInterior,
    interiorIndex,
  }: {
    currentInterior?: {
      image: string
      renders: Render[]
    }
    interiorIndex: number
  }) => void
  onRenderSelect: ({ currentRender, renderIndex }: { currentRender?: Render; renderIndex: number }) => void
}

export default function Content({ onInteriorSelect, onRenderSelect }: Props) {
  const [interiorItems] = useInteriorItems()

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
                  <RenderCard
                    render={interior}
                    interiorInd={ind}
                    // renderInd={0}
                    // objects={render?.objects}
                    onClick={() => onInteriorSelect({ currentInterior: interior, interiorIndex: ind })}
                    showCursor
                  />
                </Grid>

                {interior.renders.map((render, renderInd) => (
                  <Grid display="flex" className="first-of-type:!pl-0" xs={3} item key={`${render.id}+${renderInd}`}>
                    <RenderCard
                      render={render}
                      interiorInd={ind}
                      renderInd={renderInd}
                      objects={render?.objects}
                      onClick={() =>
                        renderInd === 0
                          ? onInteriorSelect({ currentInterior: interior, interiorIndex: ind })
                          : onRenderSelect({ currentRender: render, renderIndex: renderInd })
                      }
                      showCursor
                    />
                  </Grid>
                ))}
              </Grid>
            )
        )}
      </Grid>
    </Stack>
  )
}
