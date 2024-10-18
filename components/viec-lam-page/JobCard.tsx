import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

const JobCard = () => {
  return (
    <Card
      className='flex flex-col p-3 min-w-[100%]'
      sx={{
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          boxShadow: '0 4px 20px rgb(106 147 217 / var(--tw-bg-opacity))',
          transform: 'scale(1.02)',
          cursor: 'pointer'
        }
      }}
    >
      <div className='flex w-[100%] flex-row items-center'>
        <CardMedia
          sx={{ width: '30%', height: '40%', objectFit: 'contain' }}
          image='https://lh5.googleusercontent.com/proxy/YO7Q18ATUUZZav_-j7VDbUeDIfCepEAyVfcnXIp-4iSzWIeAG21QzFbUp1DSTEc5aQZd0AtRDsKHfYtgQh8j5-UGmKlxoHgmGwl7ZovSyXxeQeiowMSGCmHejiDPxstTLnnMWMzHkVY'
        ></CardMedia>

        <CardContent>
          <Typography gutterBottom className='text-lg text-primary font-bold' component='div'>
            Lập trình viên fullstack
          </Typography>
          <Typography variant='body1' className='text-primary'>
            Viettel Software
          </Typography>
          <Typography variant='body2'> Hồ Chí Minh</Typography>
          <Chip
            className='bg-primary text-text'
            icon={<MonetizationOnIcon sx={{ fill: 'white' }} />}
            label='Thoả thuận'
            size='medium'
          />
        </CardContent>
      </div>
      <div>
        <Divider />
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center'
          }}
        >
          <Typography gutterBottom variant='body2' sx={{ width: '30%', fontWeight: '700', color: 'primary' }}>
            Kĩ năng:
          </Typography>
          <Stack direction='row' spacing={1}>
            <Chip color='primary' label='Java' size='small' />
            <Chip label='SQL' size='small' />
            <Chip label='Angular' size='small' />
          </Stack>
        </Box>
      </div>
    </Card>
  )
}

export default JobCard
