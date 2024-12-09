"use client";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Divider, Stack, Typography } from '@mui/material'
import { companyLogo } from '../../assets'
import React from 'react'
import { getProvinceName } from '../../core/utils/LocationUtils'
import { Company } from '@/models'
import { useRouter } from 'next/navigation'

type CompanyCardProps = {
  company: Company
}

const CompanyCard: React.FC<CompanyCardProps> = (props) => {
  const router = useRouter();
  const handleCompanyClick = (): void => {
    router.push(`/company-profile/${props.company.slug}`);
  };
  return (
    <Card
      onClick={handleCompanyClick}
      className='flex flex-col p-3 cursor-pointer '
      sx={{
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          boxShadow: '0 4px 20px rgb(106 147 217 / var(--tw-bg-opacity))',
          transform: 'scale(1.02)'
        }
      }}
    >
      <div className='flex w-[100%] flex-row items-center'>
        <CardMedia sx={{ width: 100, height: '32px', objectFit: 'contain' }} image={props.company.logo}></CardMedia>
        <CardContent>
          <Typography gutterBottom className='text-lg' component='div'>
            {props.company.name}
          </Typography>
          <Typography variant='body1' className='text-primary'>
            {props.company.description}
          </Typography>
          <Typography variant='body2'>{props.company.address}</Typography>
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
            Lĩnh vực:
          </Typography>
          <Stack direction='row' spacing={1}>
            <Chip label={props.company.industry} size='medium' />
          </Stack>
        </Box>
      </div>
    </Card>
  )
}

export default CompanyCard
