'use client'

import { useMutateInterior, useQueryInterior, useQueryInteriors } from '@/api/query-hooks/Interior'
import { useInteriorItems } from '@/components/InteriorManager/useInteriorItems'
import ColorButton from '@/components/NewRender/ColorButton'
import UploadButton from '@/components/NewRender/UploadButton'
import roomList from '@/components/NewRender/roomList'
import styleList from '@/components/NewRender/styleList'
import Select from '@/components/Select/Select'
import { yupResolver } from '@hookform/resolvers/yup'
import UploadIcon from '@mui/icons-material/Upload'
import { Box, CircularProgress, Dialog, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { mixed, object, string } from 'yup'
import styles from './styles.module.scss'

const interiorFormSchema = object({
  image: mixed().required('Image is required'),
  style: string().required('Style is required'),
  room: string().required('Room is required'),
}).required()

export default function Page() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(interiorFormSchema),
  })

  const router = useRouter()

  const [newInteriorId, setNewInteriorId] = useState<string>()

  const { fetchNextPage } = useQueryInteriors()

  const { unshift: unshiftInteriors } = useInteriorItems()

  const mutation = useMutateInterior({ onSuccess: (interior) => setNewInteriorId(interior.id) })

  const { data: newInterior } = useQueryInterior(newInteriorId, 1000, !newInteriorId)

  useEffect(() => {
    // Update UI after rendering finished
    if (newInterior?.progress === 100 && !!newInterior.renders && newInterior.renders.length > 0) {
      // Clear new interior id to stop polling
      setNewInteriorId(undefined)

      fetchNextPage()

      unshiftInteriors(newInterior)
    }
  }, [newInterior])

  return (
    <Dialog fullWidth maxWidth="sm" open onClose={() => router.push('/')}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={newInterior?.progress ?? 0} /* style={{ width: '100%' }} */ />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(
            newInterior?.progress ?? 0
          )}%`}</Typography>
        </Box>
      </Box>
      <form onSubmit={handleSubmit((data: any) => mutation.mutate(data))}>
        <div /* className={styles.new_render_container} */>
          <div className={styles.new_render_content}>
            {/* <h3>Start using Interior AI for free</h3>
        <OutlinedInput
          placeholder="Your real email"
          style={{
            color: '#fff',
            backgroundColor: '#161616',
            border: '1px solid #ffffff33',
            width: '100%',
            borderRadius: 12,
          }}
        />
        <ColorButton sx={{ textTransform: 'none' }}>Confirm your email to use Interior AI</ColorButton> */}
            <h3>Your current interior</h3>
            <Dropzone accept={{ 'image/*': ['.jpg', '.jpeg'] }} onDrop={(files) => setValue('image', files[0])}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <UploadButton sx={{ textTransform: 'none', border: '1px dashed grey' }} startIcon={<UploadIcon />}>
                    Drop an image, tap to select, take a photo, or ⌘ + V
                  </UploadButton>
                  <input type="file" name="image" {...getInputProps()} />
                </div>
              )}
            </Dropzone>
            <p className={styles.sub_info}>
              Take a photo of your current room. For best results make sure it shows the entire room in a 90° straight
              angle facing a wall or window horizontally (click for example). Not from a corner or angled, and not a
              wide angle photo as it&apos;s trained on regular photos. The AI isn&apos;t great at angled pics (yet)!
              {/* Uploads + renders
          are shown on site but auto deleted after 15 mins. To make 100% private HQ renders without deletion and
          watermark upgrade to Pro and you get your own private workspace. */}
            </p>
            <Select selectList={roomList} title="ROOM" inputProps={register('room')} />
            {/* <SelectElement selectList={modeList} title={'MODE'} /> */}
            <p className={styles.sub_info}>
              You get widely different results with each mode. Virtual Staging mode will auto detect the construction
              (like walls, ceiling, beams) and tries to avoid changing it, while Interior Design mode doesn&apos;t but
              gives you more creative ideas. A good idea is to use Interior Design mode and then Mix w/ Original to get
              the original auto masked background back.
            </p>
            <Select selectList={styleList} title="STYLE" inputProps={register('style')} />
            {/* <SelectElement selectList={numberOfRendersList} title={'NUMBER OF RENDERS'} /> */}
            {/* <SelectElement selectList={resolutionsList} title={'RESOLUTION'} /> */}
            {/* <SelectElement selectList={privacyList} title={'PRIVACY'} /> */}
          </div>
          <div className={styles.new_render_button}>
            <ColorButton type="submit" sx={{ textTransform: 'none' }} style={{ margin: 0 }}>
              Render new designs
            </ColorButton>
          </div>
        </div>
      </form>
    </Dialog>
  )
}
