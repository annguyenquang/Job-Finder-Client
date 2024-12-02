import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { companyLogo } from '../../assets'
import React from 'react'
import { getProvinceName } from '../../core/utils/LocationUtils'

const CompanyCard = () => {
  return (
    <Card className='flex flex-row gap-2 p-3'>
      <div className='flex flex-row items-center'>
        <CardMedia
          sx={{ width: 100, height: '40%', objectFit: 'contain' }}
          image='https://lh5.googleusercontent.com/proxy/YO7Q18ATUUZZav_-j7VDbUeDIfCepEAyVfcnXIp-4iSzWIeAG21QzFbUp1DSTEc5aQZd0AtRDsKHfYtgQh8j5-UGmKlxoHgmGwl7ZovSyXxeQeiowMSGCmHejiDPxstTLnnMWMzHkVY'
        ></CardMedia>
      </div>
      <div>
        <CardContent>
          <Typography
            gutterBottom
            className='text-lg'
            component='div'
          >
            Công ty Viettel Software
          </Typography>
          <Typography
            variant='body1'
            className='text-colorPrimary'
          >
            Viettel Software
          </Typography>
          <Typography variant='body2'></Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            size='small'
          >
            Chi tiết
          </Button>
        </CardActions>
      </div>
    </Card>
  )
}

export default CompanyCard
