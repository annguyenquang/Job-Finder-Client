'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUserJobApplicationStore, useAccountStore, useLocationStore, useCoverLetterDialogStore } from '@/stores'
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
import { Check, Download } from '@mui/icons-material'
import Close from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'

export const UserJobApplicationsTable: React.FC = () => {
  const locationStore = useLocationStore()
  const accountStore = useAccountStore()
  const coverLetterDialogStore = useCoverLetterDialogStore()
  const userJobApplicationStore = useUserJobApplicationStore()

  const handlePageChanged = (_: unknown, page: number) => {
    userJobApplicationStore.setPage(page)
  }

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
  React.useEffect(() => {
    if (accountStore.account) {
      console.log('load job applications')
      userJobApplicationStore.loadJobApplications(accountStore.account.id)
    }
  }, [userJobApplicationStore.page, userJobApplicationStore.pageSize, accountStore.account])

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: '70vh', overflow: 'auto' }}
      >
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight={'bold'}>Công việc</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={'bold'}>Thời gian ứng tuyển</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={'bold'}>Cover Letter</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={'bold'}>CV</Typography>
              </TableCell>
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
                    {application.coverLetter !== null && application.coverLetter.length > 0 ? (
                      <Stack
                        direction={'row'}
                        spacing={1}
                      >
                        <Check sx={{ color: 'green' }} />
                        <Typography
                          onClick={() => {
                            coverLetterDialogStore.openCoverLetterDialog(application.coverLetter)
                          }}
                          sx={{
                            color: blue[500],
                            ':hover': { cursor: 'pointer', textDecoration: 'underline', fontStyle: 'italic' }
                          }}
                        >
                          Xem
                        </Typography>
                      </Stack>
                    ) : (
                      <EmptyCell />
                    )}
                  </TableCell>

                  <TableCell>
                    {application.cvLink !== null && application.cvLink.length > 0 ? (
                      <Button startIcon={<Download />}>
                        <Link href={application.cvLink}>
                          <Typography>Tải về</Typography>
                        </Link>
                      </Button>
                    ) : (
                      <EmptyCell />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        display={'flex'}
        justifyContent={'center'}
        mt={2}
      >
        <Pagination
          variant='outlined'
          size='large'
          shape='rounded'
          count={Math.ceil(userJobApplicationStore.total / userJobApplicationStore.pageSize)}
          page={userJobApplicationStore.page}
          onChange={handlePageChanged}
        />
      </Box>
    </Box>
  )
}

const EmptyCell = () => {
  return (
    <Stack
      direction={'row'}
      spacing={1}
    >
      <Close color='error' />
      <Typography>Không có</Typography>
    </Stack>
  )
}
