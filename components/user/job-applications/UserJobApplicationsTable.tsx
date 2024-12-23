'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUserJobApplicationStore, useAccountStore, useLocationStore } from '@/stores'
import { AccountType } from '@/models'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import blue from '@mui/material/colors/blue'
import grey from '@mui/material/colors/grey'

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
    <TableContainer component={Paper}>
      <Table size='small'>
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
                    <Link href={`/company-profile/${application.job.company.slug}`}>
                      <Image
                        alt='company-logo'
                        src={application.job.company.logo}
                        width={100}
                        height={100}
                      />
                    </Link>

                    <Stack>
                      <Link href={`/job-detail/${application.job.id}`}>
                        <Typography
                          variant='h6'
                          fontWeight={'bold'}
                          sx={{ ':hover': { color: blue[500], textDecoration: 'underline' } }}
                        >
                          {application.job.title}
                        </Typography>
                      </Link>

                      <Link href={`/company-profile/${application.job.company.slug}`}>
                        <Typography sx={{ color: grey[500], ':hover': { textDecoration: 'underline' } }}>
                          {application.job.company.name}
                        </Typography>
                      </Link>

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
