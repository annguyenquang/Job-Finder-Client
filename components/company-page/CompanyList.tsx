'use client'
import { Grid2, Pagination } from '@mui/material'
import React from 'react'
import CompanyCard from './CompanyCard'
import { useCompanyStore } from '@/stores'
import JobCardSkeleton from '../viec-lam-page/skeleton/JobCardSkeleton'

const CompanyList = () => {
  const companyStore = useCompanyStore()

  return (
    <Grid2 container spacing={1}>
      {companyStore.isLoading
        ? Array.from({ length: 6 }).map((_, idx) => (
            <Grid2 key={idx} size={4}>
              <JobCardSkeleton />
            </Grid2>
          ))
        : companyStore.companies.map((company, idx) => (
            <Grid2 key={idx} size={4}>
              <CompanyCard company={company} />
            </Grid2>
          ))}
    </Grid2>
  )
}

export default CompanyList
