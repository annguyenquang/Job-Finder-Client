import React from 'react'
import { UserAccount } from '@/models'
import Edit from '@mui/icons-material/Edit'
import blue from '@mui/material/colors/blue'
import Grid2 from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar/Avatar'
import InfoWithLabel from './InfoWithLabel'
import BasicInfoDialog from './BasicInfoDialog'

const LeftBasicInfo: React.FC<{ user: UserAccount | null }> = ({ user }) => {
  const [isOpenBasicInfoDialog, setIsOpenBasicInfoDialog] = React.useState<boolean>(false)
  const closeBasicInfoDialog = () => {
    setIsOpenBasicInfoDialog(false)
  }
  const openBasicInfoDialog = () => {
    setIsOpenBasicInfoDialog(true)
  }
  return (
    <Grid2
      container
      flexDirection={'row'}
      size={9}
      spacing={2}
    >
      <BasicInfoDialog
        user={user}
        isOpen={isOpenBasicInfoDialog}
        onClose={closeBasicInfoDialog}
      />
      <Avatar sx={{ width: 150, height: 150, fontSize: '20px' }} />
      <Stack direction={'column'}>
        <Stack
          spacing={2}
          direction={'row'}
          sx={{ cursor: 'pointer' }}
        >
          <Typography
            fontWeight={'bold'}
            variant={'h5'}
          >
            {user?.firstName + ' ' + user?.lastName}
          </Typography>
          <Stack
            color={blue[500]}
            direction={'row'}
            onClick={openBasicInfoDialog}
          >
            <Edit fontSize={'small'}></Edit>
            <Typography variant={'body1'}>Chỉnh sửa thông tin cơ bản</Typography>
          </Stack>
        </Stack>
        <Grid2 container>
          <Grid2 size={6}>
            <InfoWithLabel
              label={'SỐ ĐIỆN THOẠI'}
              value={user?.phone ? user.phone : '_'}
            ></InfoWithLabel>
            <InfoWithLabel
              label={'NGÀY SINH'}
              value={user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : ''}
            ></InfoWithLabel>
          </Grid2>
          <Grid2 size={6}>
            <InfoWithLabel
              label={'EMAIL'}
              value={user?.email ? user.email : '_'}
            ></InfoWithLabel>
            <InfoWithLabel
              label={'Giới tính'}
              value='_'
            ></InfoWithLabel>
          </Grid2>
        </Grid2>
      </Stack>
    </Grid2>
  )
}

export default LeftBasicInfo
