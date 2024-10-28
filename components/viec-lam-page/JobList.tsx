'use client'
import { Grid2 } from '@mui/material'
import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'
import Pagination from '../common/Pagination'
import { useJobStore } from '@/stores'
import { Metadata } from '@/models/common/Metadata'
import { JobService } from '@/services'

const JobList = () => {
  const jobStore = useJobStore()
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= jobStore.total) {
      jobStore.setPage(page) // Update current page state
    }
  }
  useEffect(() => {
    const getJob = async () => {
      jobStore.loadJobs()
    }
    getJob()
  }, [jobStore.pagination])

  useEffect(() => {
    console.log(jobStore.jobs)
  }, [jobStore.jobs])
  return (
    <Grid2 marginLeft={2} container spacing={1}>
      {jobStore.jobs.map((job, idx) => (
        <Grid2 key={idx} size={4} display='flex' justifyContent='end'>
          <JobCard job={job} />
        </Grid2>
      ))}
      <Grid2 size={12} display='flex' justifyContent='center'>
        <Pagination
          currentPage={jobStore.pagination.page}
          totalPages={jobStore.total}
          onPageChange={handlePageChange}
        />
      </Grid2>
    </Grid2>
  )
}

export default JobList
