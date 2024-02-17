'use client'

import { useQueryInterior } from '@/api/query-hooks/interior'
import Referrals from '@/components/Referrals/Referrals'
import RenderCard from '@/components/RenderCard/RenderCard'
import { RenderObjectType, ignoreObjects } from '@/components/RenderObject/RenderObject'
import { Render } from '@/state/interior/InteriorState'
import { useCallback, useMemo, useState } from 'react'

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

  const objects = useMemo(
    () =>
      render?.objects?.filter(
        (obj) => ((obj?.[1] as number) ?? 0) > 0.8 && !!obj?.[0] && !ignoreObjects.includes(obj?.[0] as string)
      ),
    [render?.objects]
  )

  const renderObjects = useMemo(
    () => objects?.filter((obj) => !referralObject || obj === referralObject),
    [objects, referralObject]
  )

  const referrals = useMemo(
    () => objects?.filter((obj) => !predictionObject || obj === predictionObject),
    [objects, predictionObject]
  )

  return (
    // <Fade in={true} className="flex max-h-full overflow-hidden justify-between">
    <>
      <div
        className="flex flex-grow justify-center items-start"
        style={{
          maxWidth: '50vw',
        }}
      >
        <RenderCard
          interiorId={params.interiorId}
          render={render}
          objects={renderObjects}
          objectsShown={true}
          onObjectHover={onObjectHover}
          raised={false}
          fill
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
      <Referrals objects={referrals} onObjectHover={onObjectHover} />
      {/* </ReactSpring.FadeIn> */}
    </>
    // </Fade>
  )
}
