import { Paper, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useElementSize } from 'usehooks-ts'
import { RenderObjectType } from '../RenderObject/RenderObject'

type Props = {
  objects?: Array<Array<number[] | number | string | Array<string>>>
  onObjectHover?: (object: RenderObjectType) => void
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function Referrals({ objects, onObjectHover }: Props) {
  const [referralRef, { width: referralWidth, height: referralHeight }] = useElementSize()

  return (
    // <ReactSpring.FadeIn active={true} className="inline-flex flex-grow overflow-hidden">
    <Stack
      className="flex-grow border overflow-hidden p-2"
      spacing={2}
      ref={referralRef}
      style={{
        minWidth: referralWidth,
        minHeight: referralHeight,
      }}
    >
      {objects?.map((el, ind) =>
        Array.isArray(el[4]) ? (
          el[4].map((ref) => (
            <a
              key={`${ref}+${ind}`}
              className="h-14 group inline-flex hover:text-black my-1"
              target="_blank"
              style={{
                color: `#${el[3]}`,
              }}
              href={ref as string}
              onMouseEnter={() => onObjectHover?.({ object: el, isReferral: true })}
              onMouseLeave={() => onObjectHover?.({ object: undefined, isReferral: true })}
            >
              <div
                className="flex flex-grow border border-dashed hover:border-solid justify-between items-center p-2 overflow-hidden"
                style={{
                  borderColor: `#${el[3]}`,
                }}
              >
                <span className="flex self-center capitalize select-none text-lg">{el[0]}</span>

                <Item
                  sx={{
                    maxWidth: '50%',
                  }}
                  className="truncate group-hover:text-black !p-1"
                >
                  {ref}
                </Item>
              </div>
            </a>
          ))
        ) : (
          <div
            className="h-14 flex border border-dashed hover:border-solid justify-between items-center p-2 overflow-hidden"
            style={{
              borderColor: `#${el[3]}`,
              color: `#${el[3]}`,
            }}
            key={ind}
            onMouseEnter={() => onObjectHover?.({ object: el, isReferral: true })}
            onMouseLeave={() => onObjectHover?.({ object: undefined, isReferral: true })}
          >
            <span className="flex self-center capitalize select-none text-lg">{el[0]}</span>

            <span className="text-sm text-black">No referrals found for this item!</span>
          </div>
        )
      )}
    </Stack>
    // </ReactSpring.FadeIn>
  )
}
