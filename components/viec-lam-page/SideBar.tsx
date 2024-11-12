'use client'
import { Box, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FilterBox from './FilterBox'
import { useJobListStore } from '@/stores'

const SideBar = () => {
  const jobStore = useJobListStore()
  const [uniqueTypes, setUniqueTypes] = useState<number[]>([])
  const [jobStatus, setJobStatus] = useState<number>(1)

  useEffect(() => {
    if (jobStatus) {
      const updateParam = jobStore.reqParam
      updateParam.setStatus(jobStatus)
      jobStore.updateParam(updateParam)
      jobStore.loadJobs()
    }
  }, [jobStatus])

  useEffect(() => {
    const getJob = async () => {
      jobStore.loadJobs()
    }
    //Every time filter reset, get the unique type of filter
    const uniqueTypes: number[] = jobStore.filter.reduce<number[]>((acc, item) => {
      if (!acc.includes(item.type)) {
        acc.push(item.type)
      }
      return acc
    }, [])
    setUniqueTypes(uniqueTypes)
    //Update param filter
    const currentParam = jobStore.reqParam
    const currentActiveFilter = jobStore.filter.filter((e) => e.active === 1) // TODO
    currentParam.setFilter(currentActiveFilter)
    jobStore.updateParam(currentParam)

    getJob()
  }, [jobStore.filter])

  useEffect(() => {
    const getFilter = async () => {
      await jobStore.loadFilter() // Await to ensure completion
    }
    getFilter()
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
            value={jobStatus}
            onChange={(e) => setJobStatus(Number(e.target.value))}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label={<Typography sx={{ fontSize: '0.875rem' }}>Active</Typography>}
            />
            <FormControlLabel
              value={0}
              control={<Radio />}
              label={<Typography sx={{ fontSize: '0.875rem' }}>Inactive</Typography>}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {uniqueTypes.map((e) => (
        <FilterBox key={e} type={e} filter={jobStore.filter} />
      ))}
    </Container>
  )
}

export default SideBar
