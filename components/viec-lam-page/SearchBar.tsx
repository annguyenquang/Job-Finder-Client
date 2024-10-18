import { Container, Grid2, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SearchIcon from '@mui/icons-material/Search'
import LoadingButton from '@mui/lab/LoadingButton'
import React, { useState } from 'react'

interface SearchBarProps {
  location: string
  handleChange: (event: SelectChangeEvent<string>) => void
}
const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  return (
    <Container className=' bg-background py-2' maxWidth='xl' disableGutters={true}>
      <Grid2 className='px-0' container spacing={1}>
        <Grid2 size={6} display='flex' justifyContent='center' alignItems='center'>
          <TextField fullWidth size='small' label='Tìm việc làm yêu thích' id='fullWidth' />
        </Grid2>
        <Grid2 size={6} display='flex' justifyContent='space-between' alignItems='center'>
          <Container className='flex flex-row items-center justify-between'>
            <InputLabel id='demo-simple-select-label'>Địa điểm</InputLabel>
            <Select
              inputProps={{ 'aria-label': 'Without label' }}
              size='small'
              displayEmpty
              id='location-select'
              IconComponent={LocationOnIcon}
              value={props.location}
              onChange={props.handleChange}
              sx={{ width: '85%' }}
            >
              <MenuItem value={'TP. Hồ Chí Minh'}>TP. Hồ Chí Minh</MenuItem>
              <MenuItem value={'Hà Nội'}>Hà Nội</MenuItem>
              <MenuItem value={'Đà Nẵng'}>Đà Nẵng</MenuItem>
            </Select>
          </Container>
          <LoadingButton
            className='bg-primary text-text'
            loading={false}
            loadingPosition='start'
            startIcon={<SearchIcon />}
            variant='outlined'
          >
            Search
          </LoadingButton>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default SearchBar
