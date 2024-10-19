'use client'
import { Grid2 } from '@mui/material'
import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'
import Pagination from '../common/Pagination'
import { useJobStore } from '@/stores'

const JobList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1) // State for current page
  const totalPages = 5 // Set total pages dynamically or hardcoded
  const jobStore = useJobStore()
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page) // Update current page state
    }
  }
  useEffect(() => {
    const getJob = async () => {
      jobStore.loadJobs()
    }
    getJob()
  }, [])
  return (
    <Grid2 marginLeft={2} container spacing={1}>
      {jobStore.jobs.map((job, idx) => (
        <Grid2 key={idx} size={4} display='flex' justifyContent='end'>
          <JobCard job={job} />
        </Grid2>
      ))}
      <Grid2 size={12} display='flex' justifyContent='center'>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </Grid2>
    </Grid2>
  )
}

export default JobList
