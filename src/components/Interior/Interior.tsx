import { Grid } from '@mui/material'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import Fade from '../Fade/Fade'
import { Render } from '../InteriorManager/InteriorManager'
import Referrals from '../Referrals/Referrals'
import RenderCard from '../RenderCard/RenderCard'
import { RenderObjectType } from '../RenderObject/RenderObject'

type Props = {
  interior: {
    currentInterior?: {
      images: Render[]
    }
    interiorIndex: number
  }

  render: {
    currentRender?: Render
    renderIndex: number
  }
  setRender?: Dispatch<SetStateAction<{ currentRender?: Render; renderIndex: number }>>
}

export default function Interior({ interior, render, setRender }: Props) {
  const [predictionObject, setPredictionObject] = useState<RenderObjectType['object']>()
  const [referralObject, setReferralObject] = useState<RenderObjectType['object']>()

  const onObjectHover = useCallback(
    (object: RenderObjectType) => {
      if (object?.isReferral) {
        setReferralObject(object.object)
      } else {
        setPredictionObject(object?.object)
      }
    },
    [setReferralObject, setPredictionObject]
  )

  return (
    <>
      <Fade in={!render.currentRender && !!interior.currentInterior}>
        <Grid container spacing={2}>
          {interior?.currentInterior?.images?.map((image, ind) => (
            <Grid
              display="flex"
              // className="first-of-type:pl-0 float-left"
              className="float-left"
              xs={6}
              item
              key={image.img}
            >
              <RenderCard
                image={image}
                objects={image?.objects}
                onClick={() => setRender?.({ currentRender: image, renderIndex: ind })}
                raised={false}
                showCursor={ind > 0}
              />
            </Grid>
          ))}
        </Grid>
      </Fade>

      <Fade in={!!render?.currentRender} className="flex max-h-full overflow-hidden justify-between">
        <>
          <div
            className="flex flex-grow justify-center items-start"
            style={{
              minWidth: '50vw',
            }}
          >
            <RenderCard
              image={render?.currentRender as Render}
              objects={render?.currentRender?.objects?.filter((obj) => !referralObject || obj === referralObject)}
              objectsShown={true}
              onObjectHover={onObjectHover}
              raised={false}
              showCursor
            />
          </div>

          <Fade
            className="overflow-auto max-h-full ml-2"
            style={{
              maxWidth: '50%',
              minWidth: '30vw',
            }}
          >
            <Referrals
              objects={render?.currentRender?.objects?.filter((obj) => !predictionObject || obj === predictionObject)}
              onObjectHover={onObjectHover}
            />
          </Fade>
        </>
      </Fade>
    </>
  )
}
