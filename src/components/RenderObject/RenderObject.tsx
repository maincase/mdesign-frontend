import getCenterPosition from '@/utils/getCenterPosition'
import { preventDefault } from '@/utils/rxPreventDefault'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { BehaviorSubject, debounceTime, filter, fromEvent, switchMap, tap, withLatestFrom } from 'rxjs'
import { useUpdateEffect } from 'usehooks-ts'
import { ReferralItem } from '../Referrals/Referrals'

export const ignoreObjects = Object.freeze(['book', 'bottle'])

export type RenderObjectType = {
  isReferral?: boolean
  object?: Array<number[] | number | string | Array<string>>
}

type Props = {
  object: Array<number[] | number | string | Array<string>>
  // isSingleObject: boolean
  // mouse?: {
  //   x: number
  //   y: number
  // }
  ratio: {
    x?: number
    y?: number
  }
  // interiorInd?: number
  // renderInd?: number
  // objectInd: number

  // objectHoverTimeoutRef: MutableRefObject<NodeJS.Timeout | undefined>
  deactivate: () => void
  onObjectHover?: (object: any) => void
  onClick?: () => void
  isActive?: boolean

  index: number
  activeIndex?: number
}

export default function RenderObject({
  object,
  /* objectInd, */ ratio,
  isActive,
  deactivate,
  onObjectHover,
  onClick,
  index,
  activeIndex,
}: Props) {
  const objectRef = useRef<HTMLButtonElement>(null)

  // Object params
  const objectName = object[0] ?? ''
  const objectShape = object[2] as number[]
  const objectReferrals = object?.[3] as string[]

  // Actual object rect.
  const objectX = objectShape[0] ?? 0
  const objectY = objectShape[1] ?? 0
  const objectWidth = (objectShape[2] ?? 0) - (objectShape[0] ?? 0)
  const objectHeight = (objectShape[3] ?? 0) - (objectShape[1] ?? 0)

  const canActivate = useRef<boolean>(true)

  const activeObjectIndex$ = useRef(new BehaviorSubject(activeIndex)).current

  // const [applyBg, setApplyBg] = useState(true)

  // Setup RXJS events on mount
  useEffect(() => {
    activeObjectIndex$.next(activeIndex)

    if (!!objectRef?.current) {
      const mouseEnter$ = fromEvent(objectRef.current, 'mouseenter')
      const mouseLeave$ = fromEvent(objectRef.current, 'mouseleave')

      const mouseEnterSub = mouseEnter$
        .pipe(
          preventDefault(),
          tap(() => {
            if (canActivate.current) {
              onObjectHover?.(object)
            }
          }),
          switchMap(() =>
            mouseLeave$.pipe(
              preventDefault(),
              debounceTime(500),
              withLatestFrom(activeObjectIndex$),
              filter(([, activeObjectIndex]) => activeObjectIndex === index),
              tap(deactivate)
            )
          )
        )
        .subscribe()

      const mouseClickSub = fromEvent(objectRef.current, 'click')
        .pipe(preventDefault())
        .subscribe(() => {
          onClick?.()
        })

      return () => {
        mouseEnterSub.unsubscribe()
        mouseClickSub.unsubscribe()
      }
    }
  }, [activeIndex])

  useUpdateEffect(() => {
    if (!isActive) {
      canActivate.current = false

      setTimeout(() => {
        canActivate.current = true
      }, 500)
    }
  }, [isActive])

  // Ratio object rect.
  const ratioX = objectX * (ratio.x ?? 0)
  const ratioY = objectY * (ratio.y ?? 0)
  const ratioWidth = objectWidth * (ratio.x ?? 0)
  const ratioHeight = objectHeight * (ratio.y ?? 0)

  const { x, y } = getCenterPosition(ratioWidth, ratioHeight, ratioX ?? 0, ratioY ?? 0)

  return (
    <button
      ref={objectRef}
      className={clsx('absolute block overflow-visible', {
        'bg-white shadow-lg group-hover/popover:scale-125 -translate-x-2/4 -translate-y-2/4 rounded-full z-20 before:content-[""] before:absolute before:inset-0 before:w-full before:h-full before:rounded-full before:shadow-3d':
          !isActive,
        'border-2 rounded-lg shadow-full z-10 transition-position-size duration-200 ease-[cubic-bezier(.84,1.34,1,1)]':
          isActive,
      })}
      style={{
        top: isActive ? ratioY : y,
        left: isActive ? ratioX : x,
        width: isActive ? ratioWidth : 15,
        height: isActive ? ratioHeight : 15,
      }}
    >
      {!!isActive && (
        <>
          <p
            className="absolute block capitalize break-all whitespace-nowrap font-bold text-md text-white font-['montserrat'] -top-[70px]"
            // style={{
            //   // left: (ratioWidth ?? 0) / 2 - (objectNameWidth ?? 0) / 2 - 5,
            //   top: -(objectNameHeight ?? 0) - 10,
            // }}
          >
            {objectName}
          </p>

          {objectReferrals?.[0] && (
            <ReferralItem className="absolute -top-[40px] max-w-[300px] truncate group-hover:text-black !p-1">
              {objectReferrals[0]}
            </ReferralItem>
          )}
        </>
      )}
    </button>
  )
}
