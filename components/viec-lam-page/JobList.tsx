'use client'
import Grid from '@mui/material/Grid2'
import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'
import Pagination from '../common/Pagination'
import { useJobListStore } from '@/stores'
import { Metadata } from '@/models/common/Metadata'
import { JobService } from '@/services'
import Grid2 from '@mui/material/Grid2'
import JobCardSkeleton from './skeleton/JobCardSkeleton'

const JobList = () => {
  const jobStore = useJobListStore()
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= jobStore.total) {
      const updateParam = jobStore.reqParam
      updateParam.setPage(page)
      jobStore.updateParam(updateParam)
      jobStore.loadJobs()
    }
  }

  return (
    <Grid marginLeft={2} container spacing={1}>
      {jobStore.isLoading
        ? Array.from({ length: 6 }).map((_, idx) => (
          <Grid2 key={idx} size={4}>
            <JobCardSkeleton />
          </Grid2>
        ))
        : jobStore.jobs.map((job, idx) => (
          <Grid2 key={idx} size={4}>
            <JobCard job={job} />
          </Grid2>
        ))}
      <Grid size={12} display='flex' justifyContent='center'>
        <Pagination
          currentPage={jobStore.reqParam.pagination.page}
          totalPages={jobStore.total}
          onPageChange={handlePageChange}
        />
      </Grid>
    </Grid>
  )
}

export default JobList
