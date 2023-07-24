import { useMutateInterior } from '@/api/query-hooks/Interior'
import ColorButton from '@/components/ColorButton/ColorButton'
import Select from '@/components/Select/Select'
import UploadButton from '@/components/UploadButton/UploadButton'
import { css } from '@emotion/css'
import { yupResolver } from '@hookform/resolvers/yup'
import UploadIcon from '@mui/icons-material/Upload'
import { Box, DialogActions, DialogContent, FadeProps } from '@mui/material'
import { forwardRef } from 'react'
import Dropzone from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { mixed, object, string } from 'yup'
import roomList from './roomList'
import styleList from './styleList'

const styles = {
  // new_render_container: css`
  //   // height: variables.$middle-elements-height;
  //   // width: variables.$new-render-width;
  //   box-sizing: border-box;
  //   // top: 50%;
  //   // left: 50%;
  //   // transform: translate(-50%, -50%);
  // `,
  sub_info: css`
    display: block;
    font-size: 12px;
    margin-top: 7px;
  `,
  new_render_button: css`
    border: 1px solid rgba(255, 255, 255, 0.2);
    /* padding: 21px; */
  `,
  new_render_content: css`
    // overflow-y: scroll;
    padding-left: 21px;
    padding-right: 21px;
    height: calc(100% - 82px);
  `,
}

const interiorFormSchema = object({
  image: mixed().required('Image is required'),
  style: string().required('Style is required'),
  room: string().required('Room is required'),
}).required()

type Props = { setNewInteriorId: (id: string) => void } & Omit<FadeProps, 'children'>

export default forwardRef<HTMLFormElement, Props>(function InteriorForm({ setNewInteriorId, ...props }, ref) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(interiorFormSchema),
  })

  const mutation = useMutateInterior({
    onSuccess: (interior) => {
      localStorage.setItem('renderInteriorId', interior.id)

      setNewInteriorId(interior.id)
    },
  })

  return (
    <Box {...props} sx={{ display: 'flex', flexGrow: 1 }} ref={ref}>
      <form onSubmit={handleSubmit((data: any) => mutation.mutate(data))} className="flex justify-between flex-col">
        <DialogContent>
          {/* <div /* className={styles.new_render_container} *\/> */}
          {/* <div className={styles.new_render_content}> */}
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
          <p className={`${styles.sub_info}`}>
            Take a photo of your current room. For best results make sure it shows the entire room in a 90° straight
            angle facing a wall or window horizontally (click for example). Not from a corner or angled, and not a wide
            angle photo as it&apos;s trained on regular photos. The AI isn&apos;t great at angled pics (yet)!
            {/* Uploads + renders
          are shown on site but auto deleted after 15 mins. To make 100% private HQ renders without deletion and
          watermark upgrade to Pro and you get your own private workspace. */}
          </p>
          <Select selectList={roomList} title="ROOM" inputProps={register('room')} />
          {/* <SelectElement selectList={modeList} title={'MODE'} /> */}
          <p className={`${styles.sub_info}`}>
            You get widely different results with each mode. Virtual Staging mode will auto detect the construction
            (like walls, ceiling, beams) and tries to avoid changing it, while Interior Design mode doesn&apos;t but
            gives you more creative ideas. A good idea is to use Interior Design mode and then Mix w/ Original to get
            the original auto masked background back.
          </p>
          <Select selectList={styleList} title="STYLE" inputProps={register('style')} />
          {/* <SelectElement selectList={numberOfRendersList} title={'NUMBER OF RENDERS'} /> */}
          {/* <SelectElement selectList={resolutionsList} title={'RESOLUTION'} /> */}
          {/* <SelectElement selectList={privacyList} title={'PRIVACY'} /> */}
          {/* </div> */}
        </DialogContent>

        <DialogActions>
          <div className={`${styles.new_render_button}`}>
            <ColorButton type="submit" sx={{ textTransform: 'none' }} style={{ margin: 0 }}>
              Render new designs
            </ColorButton>
          </div>
        </DialogActions>
        {/* </div> */}
      </form>
    </Box>
  )
})
