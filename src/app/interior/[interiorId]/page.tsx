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
        justifyContent="center"
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
          <Link className="flex justify-center" href={`/interior/${params.interiorId}/render/${r.id}`}>
            <RenderCard render={r} objects={r?.objects} raised={false} objectsShown showCursor />
          </Link>
        </Grid>
      ))}
    </Grid>
    // </Fade>
  )
}
