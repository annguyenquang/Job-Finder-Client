'use client'
import {
  AlertProps,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Slide,
  styled,
  TextField,
  Typography
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import * as React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { useAlertStore, useCompanyStore, useEditCompanyStore, useLocationStore } from '@/stores'
import { District, LocationService, Province } from '@/services'
import dynamic from 'next/dynamic'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useRouter } from 'next/navigation'

// Import ReactQuill động và tắt SSR
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>
})
import 'react-quill/dist/quill.snow.css'

type EditProfileDialogProps = {
  open: boolean
  handleClickOpen: () => void
  handleClose: () => void
  slug: string
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction='up'
      ref={ref}
      {...props}
    />
  )
})

const generateSlug = (name: string): string => {
  return name
    .toLowerCase() // chuyển thành chữ thường
    .normalize('NFD') // chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu tiếng Việt
    .replace(/[đĐ]/g, 'd') // thay thế đ/Đ thành d
    .replace(/[^a-z0-9\s-]/g, '') // chỉ giữ lại chữ cái, số và khoảng trắng
    .trim() // xóa khoảng trắng đầu cuối
    .replace(/\s+/g, '-') // thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-') // xóa các dấu gạch ngang liên tiếp
}

export const EditProfileDialog: React.FC<EditProfileDialogProps> = (props: EditProfileDialogProps) => {
  const locationStore = useLocationStore()
  const editCompanyStore = useEditCompanyStore()
  const companyStore = useCompanyStore()
  const alertStore = useAlertStore()
  const router = useRouter()
  const [listDistrict, setListDistrict] = React.useState<District[] | undefined>([])
  const [inputDistrictText, setInputDistrictText] = React.useState<string>('')
  const [inputProvinceText, setInputProvinceText] = React.useState<string>('')
  const [previewImage, setPreviewImage] = React.useState<string>('')

  React.useEffect(() => {
    editCompanyStore.loadCompany(props.slug)
  }, [props.slug])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editCompanyStore.setName(event.target.value)
    const slug = generateSlug(event.target.value)
    editCompanyStore.setSlug(slug)
  }
  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const slug = generateSlug(event.target.value)
    editCompanyStore.setSlug(slug)
  }
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editCompanyStore.setEmail(event.target.value)
  }
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editCompanyStore.setPhone(event.target.value)
  }
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editCompanyStore.setAddress(event.target.value)
  }
  const handleWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editCompanyStore.setWebsite(event.target.value)
  }
  const handleEmployeeCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editCompanyStore.setEmployeeCount(parseInt(event.target.value))
  }

  React.useEffect(() => {
    const fetchDistrictName = async () => {
      const districtId = editCompanyStore.company.districtId

      if (locationStore.allDistrict.length === 0) {
        await locationStore.loadAllDistrict()
      }

      const districtName = locationStore.allDistrict.find((district) => district.code === districtId)?.name || ''

      setInputDistrictText(districtName)
    }

    fetchDistrictName()
  }, [editCompanyStore.company.districtId, locationStore])

  const handleProvinceChange = (event: React.SyntheticEvent, newValue: Province | string | null) => {
    const code = (newValue as Province)?.code
    setListDistrict([])
    setInputDistrictText('')
    editCompanyStore.setDistrictId(0)
    editCompanyStore.setProvinceId(code)
  }

  const handleDistrictChange = (event: React.SyntheticEvent, newValue: District | string | null) => {
    const code = (newValue as District)?.code
    editCompanyStore.setDistrictId(code)
  }

  React.useEffect(() => {
    if (!locationStore.allProvince) {
      const fetchAllProvince = async () => {
        await locationStore.loadAllProvince()
      }

      fetchAllProvince()
    }
    setInputProvinceText(
      locationStore.allProvince.find((province) => province.code === editCompanyStore.company.provinceId)?.name || ''
    )
  }, [editCompanyStore.company.provinceId, locationStore.allProvince])

  React.useEffect(() => {
    if (editCompanyStore.company.provinceId === 0 || null) {
      setInputProvinceText('')
    }
    if (editCompanyStore.company.provinceId) {
      const fetchAllDistrict = async (selectedProvinceId: number) => {
        const listDistrict = await LocationService.getDistrictsByProvinceId(selectedProvinceId)
        setListDistrict(listDistrict)
      }
      fetchAllDistrict(editCompanyStore.company.provinceId)
    }
  }, [editCompanyStore.company.provinceId])

  const handleQuillChange = (value: string): void => {
    editCompanyStore.setDescription(value)
  }

  const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB in bytes
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      // Kiểm tra kích thước
      if (file.size > MAX_FILE_SIZE) {
        alert('Kích thước file không được vượt quá 25MB')
        event.target.value = '' // Reset input
        return
      }

      // Kiểm tra định dạng
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        alert('Chỉ chấp nhận file định dạng .jpg, .jpeg hoặc .png')
        event.target.value = '' // Reset input
        return
      }

      // Nếu file hợp lệ, tạo preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    const res = await editCompanyStore.editCompany()

    if (res) {
      const sucessAlertSettings: AlertProps = {
        severity: 'success',
        children: <AlertTitle>Bạn đã thay đổi thành công thông tin Công Ty</AlertTitle>
      }

      alertStore.alert(
        { ...alertStore.snackbarSettings, TransitionComponent: Transition },
        {
          ...alertStore.alertSettings,
          ...sucessAlertSettings
        }
      )

      if (editCompanyStore.company.slug === props.slug) {
        companyStore.loadCompany(editCompanyStore.company.slug)
        props.handleClose()
      } else {
        router.push(`/company-profile/${editCompanyStore.company.slug}`)
      }
    }

    if (!res) {
      const serverErrorAlertSettings: AlertProps = {
        severity: 'info',
        children: <AlertTitle>Vui lòng điền đầy đủ thông tin!</AlertTitle>
      }
      alertStore.alert(
        { ...alertStore.snackbarSettings, TransitionComponent: Transition },
        {
          ...alertStore.alertSettings,
          ...serverErrorAlertSettings
        }
      )
    }
  }

  return (
    <Box>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        fullWidth={true}
        maxWidth={'md'}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>Chỉnh sửa thông tin công ty</DialogTitle>
        <DialogContent dividers>
          <Box className='flex flex-row justify-around mb-4'>
            <Box>
              <Typography className='font-semibold font-sans text-base mb-2'>Tên công ty:</Typography>

              <TextField
                id='outlined-basic'
                size='small'
                variant='outlined'
                placeholder='Tên'
                className='min-w-80'
                value={editCompanyStore.company.name}
                onChange={handleNameChange}
                slotProps={{
                  input: {
                    inputProps: {
                      maxLength: 40
                    }
                  }
                }}
              />
            </Box>

            <Box>
              <Typography className='font-semibold font-sans text-base mb-2'>Email:</Typography>

              <TextField
                id='outlined-basic'
                size='small'
                variant='outlined'
                type='email'
                placeholder='Email'
                className='min-w-80'
                value={editCompanyStore.company.emailContact}
                onChange={handleEmailChange}
              />
            </Box>
          </Box>

          <Box className='flex flex-row justify-around mb-4'>
            <Box>
              <Typography className='font-semibold font-sans text-base mb-2'>Số điện thoại:</Typography>

              <TextField
                id='max-age'
                size='small'
                variant='outlined'
                placeholder='Số điện thoại'
                className='min-w-80'
                value={editCompanyStore.company.phoneContact}
                onChange={handlePhoneChange}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*'
                }}
              />
            </Box>
            <Box>
              <Typography className='font-semibold font-sans text-base mb-2'>Địa chỉ:</Typography>

              <TextField
                id='outlined-basic'
                size='small'
                variant='outlined'
                placeholder='Địa chỉ'
                className='min-w-80'
                value={editCompanyStore.company.address}
                onChange={handleAddressChange}
              />
            </Box>
          </Box>

          <Box className='flex flex-row justify-around mb-4'>
            <Box>
              <Typography className='font-semibold font-sans text-base mb-2'>Liên kết Website:</Typography>

              <TextField
                id='max-age'
                size='small'
                variant='outlined'
                placeholder='Link'
                className='min-w-80'
                value={editCompanyStore.company.website}
                onChange={handleWebsiteChange}
              />
            </Box>
            <Box>
              <Typography className='font-semibold font-sans text-base mb-2'>Số lượng nhân viên:</Typography>

              <TextField
                id='max-age'
                size='small'
                variant='outlined'
                placeholder='Số lượng'
                className='min-w-80'
                value={editCompanyStore.company.employeeCount ?? ''}
                onChange={handleEmployeeCountChange}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*'
                }}
              />
            </Box>
          </Box>

          <Box className='flex flex-row ml-12 mb-4'>
            <Box>
              <Typography className='font-semibold font-sans text-base mb-2'>Tên giả:</Typography>

              <TextField
                id='outlined-basic'
                size='small'
                variant='outlined'
                placeholder='ví dụ: thinh-phat'
                className='min-w-80'
                value={editCompanyStore.company.slug}
                onChange={handleSlugChange}
                slotProps={{
                  input: {
                    inputProps: {
                      maxLength: 40
                    }
                  }
                }}
              />
            </Box>
          </Box>

          <Box className='ml-11'>
            <Typography className='font-semibold font-sans text-base ml-1 pb-4'>Địa điểm làm việc:</Typography>

            <Box className='flex flex-row'>
              {locationStore.allProvince && (
                <Autocomplete
                  freeSolo
                  options={locationStore.allProvince}
                  getOptionLabel={(option) => (typeof option === 'string' ? option : option.name) || ''}
                  isOptionEqualToValue={(option, value) => option.code === value?.code}
                  className='w-60 pl-2 mr-4'
                  value={locationStore.allProvince.find(
                    (province) => province.code === editCompanyStore.company.provinceId
                  )}
                  inputValue={inputProvinceText}
                  onInputChange={(event, newInputValue) => setInputProvinceText(newInputValue)}
                  onChange={handleProvinceChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Tỉnh/Thành phố'
                      size='small'
                      className='text-sm pb-4'
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              )}

              {listDistrict && (
                <Autocomplete
                  freeSolo
                  options={listDistrict}
                  getOptionLabel={(option) => (typeof option === 'string' ? option : option.name) || ''}
                  isOptionEqualToValue={(option, value) => option.code === value?.code}
                  className='w-60 pl-2 mr-1'
                  value={listDistrict.find((district) => district.code === editCompanyStore.company.districtId)}
                  inputValue={inputDistrictText}
                  onInputChange={(event, newInputValue) => setInputDistrictText(newInputValue)}
                  onChange={handleDistrictChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Quận/Huyện'
                      size='small'
                      className='text-sm pb-4'
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SearchIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              )}
            </Box>
          </Box>

          <Box className='pb-2 pl-11 pr-11'>
            <Typography className='font-semibold font-sans text-base ml-1'>Giới thiệu công ty:</Typography>
            <ReactQuill
              theme='snow'
              value={editCompanyStore.company.description}
              className='p-2 [&_.ql-editor]:min-h-[200px] [&_.ql-container]:mb-2 [&_.ql-editor]:text-[16px]'
              onChange={handleQuillChange}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ color: [] }, { background: [] }],
                  [{ font: [] }],
                  [{ align: [] }],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ script: 'sub' }, { script: 'super' }],
                  ['blockquote', 'code-block'],
                  ['link', 'image', 'video'],
                  [{ indent: '-1' }, { indent: '+1' }],
                  ['clean']
                ]
              }}
            />
          </Box>

          <Box>
            <Box className='ml-11'>
              <Typography className='font-semibold font-sans text-base ml-1'>Ảnh công ty:</Typography>
            </Box>

            <Box className='flex flex-col items-center gap-4'>
              {previewImage && (
                <img
                  src={previewImage}
                  alt='Company preview'
                  className='max-w-[300px] max-h-[200px] object-contain'
                />
              )}
              <Button
                component='label'
                variant='contained'
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput
                  type='file'
                  accept='image/*'
                  onChange={handleFileChange}
                />
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            className='text-white bg-red-500 font-bold items-center'
            size='medium'
            variant='contained'
            style={{ textTransform: 'none' }}
            onClick={props.handleClose}
          >
            Hủy
          </Button>
          <Button
            className='text-white bg-colorPrimaryText font-bold items-center'
            size='medium'
            variant='contained'
            style={{ textTransform: 'none' }}
            onClick={handleSubmit}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
