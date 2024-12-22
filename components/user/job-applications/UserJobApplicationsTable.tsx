'use client'

import { useAccountStore, useLocationStore } from '@/stores'
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import Image from 'next/image'
import { AccountType, JobApplicationState, UserJobApplication } from '@/models'
import { useUserJobApplicationStore } from '@/stores/UserJobApplicationStore/UserJobApplicationStore'

export const UserJobApplicationsTable: React.FC = () => {
  const locationStore = useLocationStore()
  const accountStore = useAccountStore()
  const userJobApplicationStore = useUserJobApplicationStore()

  React.useEffect(() => {
    if (!accountStore.account) {
      accountStore.loadAccountByJwt()
    }

    if (locationStore.allProvince.length === 0) {
      locationStore.loadAllProvince()
    }

    if (locationStore.allDistrict.length === 0) {
      locationStore.loadAllDistrict()
    }
  }, [])
  React.useEffect(() => {
    if (accountStore.account) {
      if (accountStore.accountType === AccountType.User) {
        userJobApplicationStore.loadJobApplications(accountStore.account.id)
      }
    }
  }, [accountStore.account?.id])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Công việc</TableCell>
            <TableCell>Thời gian ứng tuyển</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {userJobApplicationStore.jobApplications.length > 0 &&
            userJobApplicationStore.jobApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>
                  <Stack
                    direction='row'
                    spacing={2}
                  >
                    <Image
                      alt='company-logo'
                      src={application.job.company.logo}
                      width={100}
                      height={100}
                    />

                    <Stack>
                      <Typography
                        variant='h6'
                        fontWeight={'bold'}
                      >
                        {application.job.title}
                      </Typography>

                      <Typography sx={{ color: grey[500] }}>{application.job.company.name}</Typography>

                      <Typography sx={{ color: grey[500] }}>
                        {locationStore.getDistrictAndProvinceName(
                          application.job.districtId,
                          application.job.provinceId
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  {application.createdAt
                    ? new Date(application.createdAt).toLocaleTimeString() +
                      ' ' +
                      new Date(application.createdAt).toLocaleDateString()
                    : ''}
                </TableCell>
                <TableCell>
                  <Button
                    className='rounded-full'
                    variant='contained'
                  >
                    Xem
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
