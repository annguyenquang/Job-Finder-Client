'use client'
import { ApplicationTab } from '@/components'
import { Box, Card } from '@mui/material'
import React, { useEffect } from 'react'
import { ApplicationTable } from './ApllicationTable'
import { useJobDetailStore } from '@/stores'

export const ApplicationPanel = () => {
  const jobDetailStore = useJobDetailStore()

  useEffect(() => {
    console.log('Job applications: ', jobDetailStore.jobApplication)
  }, [jobDetailStore.jobApplication])

  return (
    <Card
      className='rounded-lg text-gray-400'
      sx={{
        width: '100%',
        height: '500px',
        background: 'white',
        marginTop: '1rem',
        padding: '1rem'
      }}
    >
      <Box
        sx={{
          width: '100%',
          background: '#eee',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <ApplicationTab />
        <ApplicationTable />
      </Box>
    </Card>
  )
}
