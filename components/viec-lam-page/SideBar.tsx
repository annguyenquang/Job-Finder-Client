'use client'
import { Box, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FilterBox from './FilterBox'
import { useJobStore } from '@/stores'

const SideBar = () => {
  const jobStore = useJobStore()
  const [uniqueTypes, setUniqueTypes] = useState<number[]>([])

  useEffect(() => {
    const uniqueTypes: number[] = jobStore.filter.reduce<number[]>((acc, item) => {
      if (!acc.includes(item.type)) {
        acc.push(item.type)
      }
      return acc
    }, [])

    setUniqueTypes(uniqueTypes)
  }, [])

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
      {uniqueTypes.map((e) => (
        <FilterBox key={e} type={e} filterOptions={jobStore.filter.filter((element) => e === element.type)} />
      ))}
    </Container>
  )
}

export default SideBar
