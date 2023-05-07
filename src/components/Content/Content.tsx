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
      images: Render[]
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
        {interiorItems.map((el, ind) => (
          <Grid
            key={`${el.name}+${ind}`}
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
            {el.images.map((image, imgInd) => (
              <Grid display="flex" className="first-of-type:!pl-0" xs={3} item key={`${image.id}+${imgInd}`}>
                <RenderCard
                  image={image}
                  interiorInd={ind}
                  renderInd={imgInd}
                  objects={image?.objects}
                  onClick={() =>
                    imgInd === 0
                      ? onInteriorSelect({ currentInterior: el, interiorIndex: ind })
                      : onRenderSelect({ currentRender: image, renderIndex: imgInd })
                  }
                  showCursor
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
