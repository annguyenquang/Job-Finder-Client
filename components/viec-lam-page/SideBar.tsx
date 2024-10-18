import { Box, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import FilterBox from './FilterBox'

const SideBar = () => {
  return (
    <Container disableGutters={true} className='h-[100%] bg-background'>
      <Box
        sx={{
          padding: '0.5rem',
          width: '100%',
          backgroundColor: 'white',
          boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px'
        }}
      >
        <FormControl>
          <Typography variant='body1' sx={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}>
            Trạng thái
          </Typography>
          <RadioGroup
            aria-labelledby='demo-controlled-radio-buttons-group'
            name='controlled-radio-buttons-group'
            // value={value}
            // onChange={handleChange}
          >
            <FormControlLabel
              value='female'
              control={<Radio />}
              label={<Typography sx={{ fontSize: '0.875rem' }}>Active</Typography>}
            />
            <FormControlLabel
              value='male'
              control={<Radio />}
              label={<Typography sx={{ fontSize: '0.875rem' }}>Inactive</Typography>}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <FilterBox />
      <FilterBox />
      <FilterBox />
      <FilterBox />
    </Container>
  )
}

export default SideBar
