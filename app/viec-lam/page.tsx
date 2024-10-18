'use client'

import { Container, Grid2, SelectChangeEvent, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchBar from '../../components/viec-lam-page/SearchBar'
import SideBar from '../../components/viec-lam-page/SideBar'
import JobList from '../../components/viec-lam-page/JobList'

const ViecLamPage = () => {
  const [location, setLocation] = useState<string>('TP. Hồ Chí Minh')

  const handleChange = (event: SelectChangeEvent<string>) => {
    setLocation(event.target.value)
  }
  return (
    <div>
      <Container className='h-screen flex flex-col bg-background rounded-sm' maxWidth={false} sx={{ maxWidth: '95%' }}>
        <SearchBar {...{ location, handleChange }} />
        <Typography variant='h6' className='font-semibold text-primary'>
          Danh sách việc làm
        </Typography>
        <p>Tìm kiếm cho bạn danh sách việc làm phù hợp nhất tại đây</p>
        <Grid2 container className='flex-grow pt-2'>
          <Grid2 size={2} display='flex' justifyContent='center' alignItems='center'>
            <SideBar />
          </Grid2>
          <Grid2 size={10} display='flex' justifyContent='center' alignItems='start'>
            <JobList />
          </Grid2>
        </Grid2>
      </Container>
    </div>
  )
}

export default ViecLamPage
