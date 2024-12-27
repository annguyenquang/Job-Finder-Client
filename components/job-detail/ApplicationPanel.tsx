'use client'
import { ApplicationTab, DateTimePicker } from '@/components'
import { Box, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ApplicationTable } from './ApllicationTable'
import { useJobDetailStore } from '@/stores'
import { Account, ApplicationTableData } from '@/models'
import { AccountService } from '@/services'
import Pagination from '../common/Pagination'
import SortMenu from './SortMenu'

export const ApplicationPanel = () => {
  const jobDetailStore = useJobDetailStore()

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= jobDetailStore.total) {
      const updateParam = jobDetailStore.jobApplicationParam
      updateParam.setPage(page)
      jobDetailStore.updateJobApplicationParam(updateParam)
      jobDetailStore.loadApplication(jobDetailStore.jobApplicationParam)
    }
  }

  const handleFromDateChange = (fromDate: string) => {
    const param = jobDetailStore.jobApplicationParam
    param.setFromDate(fromDate)
    param.setPage(1)
    jobDetailStore.updateJobApplicationParam(param)
    jobDetailStore.loadApplication(param)
  }

  const handleToDateChange = (toDate: string) => {
    const param = jobDetailStore.jobApplicationParam
    param.setToDate(toDate)
    param.setPage(1)
    jobDetailStore.updateJobApplicationParam(param)
    jobDetailStore.loadApplication(param)
  }

  const [applicationTableData, setData] = useState<ApplicationTableData>({
    applications: [],
    user: []
  })

  const fetchListUser = async () => {
    const listId = jobDetailStore.jobApplications.map((application) => application.userId)
    const listUser: Account[] = await Promise.all(
      listId.map(async (e, i) => {
        const result = await AccountService.getAccountByUserId(e)
        return result
      })
    )

    setData((prev) => ({
      ...prev,
      user: listUser
    }))
  }

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      applications: [...jobDetailStore.jobApplications]
    }))

    fetchListUser()
  }, [jobDetailStore.jobApplications])

  return (
    <Card
      className='rounded-lg text-gray-400'
      sx={{
        width: '100%',
        background: 'white',
        marginTop: '1rem',
        padding: '1rem'
      }}
    >
      <Box
        sx={{
          width: '100%',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '1rem'
        }}
      >
        <ApplicationTab />

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingY: '1rem',
            gap: 1
          }}
        >
          <SortMenu />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <DateTimePicker onDateChange={handleFromDateChange} />
            <Box sx={{ mx: 1, fontWeight: 'bold' }}>TO</Box>
            <DateTimePicker onDateChange={handleToDateChange} />
          </Box>
        </Box>

        <ApplicationTable
          data={applicationTableData.applications}
          users={applicationTableData.user}
        />
      </Box>
      <Pagination
        currentPage={jobDetailStore.jobApplicationParam.pagination.page}
        totalPages={jobDetailStore.total}
        onPageChange={handlePageChange}
      />
    </Card>
  )
}
