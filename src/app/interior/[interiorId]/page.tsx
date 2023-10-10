'use client'

import { useQueryInterior } from '@/api/query-hooks/interior'
import RenderCard from '@/components/RenderCard/RenderCard'
import { Grid } from '@mui/material'
import Link from 'next/link'

export default function Page({ params }: { params: { interiorId: string } }) {
  const { data: interior } = useQueryInterior(params.interiorId)

  return (
    // <Fade in={true}>
    <Grid container spacing={2}>
      <Grid
        display="flex"
        // className="first-of-type:pl-0 float-left"
        height="50%"
        xs={6}
        item
        key={interior?.id}
      >
        <RenderCard
          render={interior!}
          // objects={r?.objects}
          raised={false}
          showCursor={false}
          hasOverlay
          hasZoom
        />
      </Grid>

      {interior?.renders?.map((r) => (
        <Grid
          display="flex"
          justifyContent="center"
          // className="first-of-type:pl-0 float-left"
          height="50%"
          xs={6}
          item
          key={r.id}
        >
          <Link className="flex flex-grow justify-center" href={`/interior/${params.interiorId}/render/${r.id}`}>
            <RenderCard hasOverlay hasZoom render={r} objects={r?.objects} raised={false} fill showCursor />
          </Link>
        </Grid>
      ))}
    </Grid>
    // </Fade>
  )
}
