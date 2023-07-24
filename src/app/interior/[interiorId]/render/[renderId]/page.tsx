'use client'

import { useQueryInterior } from '@/api/query-hooks/Interior'
import { Render } from '@/components/InteriorManager/InteriorManager'
import Referrals from '@/components/Referrals/Referrals'
import RenderCard from '@/components/RenderCard/RenderCard'
import { RenderObjectType } from '@/components/RenderObject/RenderObject'
import { useCallback, useState } from 'react'

export default function Page({ params }: { params: { interiorId: string; renderId: string } }) {
  const { data: interior } = useQueryInterior(params.interiorId)

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

  const render = interior?.renders?.find((r) => r.id === params.renderId) as Render

  return (
    // <Fade in={true} className="flex max-h-full overflow-hidden justify-between">
    <>
      <div
        className="flex flex-grow justify-center items-start"
        style={{
          minWidth: '50vw',
        }}
      >
        <RenderCard
          render={render}
          objects={render?.objects?.filter((obj) => !referralObject || obj === referralObject)}
          objectsShown={true}
          onObjectHover={onObjectHover}
          raised={false}
          showCursor
        />
      </div>

      {/* <ReactSpring.FadeIn
        active={true}
        className="overflow-auto max-h-full ml-2"
        style={{
          maxWidth: '50%',
          minWidth: '30vw',
        }}
      > */}
      <Referrals
        objects={render?.objects?.filter((obj) => !predictionObject || obj === predictionObject)}
        onObjectHover={onObjectHover}
      />
      {/* </ReactSpring.FadeIn> */}
    </>
    // </Fade>
  )
}
