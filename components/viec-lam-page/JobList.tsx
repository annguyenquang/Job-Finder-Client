'use client'
import { Grid2 } from '@mui/material'
import React, { useState } from 'react'
import JobCard from './JobCard'
import Pagination from '../common/Pagination'

const JobList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1) // State for current page
  const totalPages = 5 // Set total pages dynamically or hardcoded

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page) // Update current page state
    }
  }
  return (
    <Grid2 marginLeft={2} container spacing={1}>
      <Grid2 size={4} display='flex' justifyContent='end'>
        <JobCard />
      </Grid2>
      <Grid2 size={4} display='flex' justifyContent='end'>
        <JobCard />
      </Grid2>
      <Grid2 size={4} display='flex' justifyContent='end'>
        <JobCard />
      </Grid2>
      <Grid2 size={4} display='flex' justifyContent='end'>
        <JobCard />
      </Grid2>
      <Grid2 size={4} display='flex' justifyContent='end'>
        <JobCard />
      </Grid2>
      <Grid2 size={4} display='flex' justifyContent='end'>
        <JobCard />
      </Grid2>
      <Grid2 size={12} display='flex' justifyContent='center'>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </Grid2>
    </Grid2>
  )
}

export default JobList
