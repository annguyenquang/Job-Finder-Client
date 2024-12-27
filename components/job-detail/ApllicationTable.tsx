import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { DropdownMenuBtn } from '@/components'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { useJobDetailStore } from '@/stores'
import { Account, JobApplication, UserAccount } from '@/models'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import { differenceInDays, parseISO } from 'date-fns'
import MailIcon from '@mui/icons-material/Mail'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import { TableRowSkeleton } from './skeleton'

const headers = [
  { label: 'Candidate' },
  { label: 'Cover Letter' },
  { label: 'CV' },
  { label: 'Date Applied' },
  { label: 'Action' }
]

type ApplicationTableProps = {
  data: JobApplication[]
  users: Account[]
}

const generateDaysPassed = (date: Date) => {
  const createdAt = typeof date === 'string' ? parseISO(date) : date
  const daysAgo = differenceInDays(new Date(), createdAt)
  return `${daysAgo} day(s) ago`
}

export const ApplicationTable: React.FC<ApplicationTableProps> = (props) => {
  const jobDetailStore = useJobDetailStore()
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          width: '100%',
          flex: 1
        }}
        aria-label='customized table'
      >
        <TableHead>
          <TableRow sx={{ fontSize: '12px' }}>
            {headers.map((header, index) => (
              <TableCell
                key={header.label}
                className='bg-colorPrimary'
                sx={{
                  color: 'white',
                  fontWeight: 'medium',
                  padding: '0.5',
                  textAlign: index === 0 ? 'left' : 'center' // Align first column to right, others to left
                }}
              >
                {header.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {jobDetailStore.jobApplicationLoading ? (
            Array.from({ length: 4 }).map((e, i) => <TableRowSkeleton key={i} />)
          ) : props.data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                align='center'
              >
                <Stack
                  direction='column'
                  alignItems='center'
                  spacing={2}
                  sx={{ py: 3 }}
                >
                  <SentimentDissatisfiedIcon sx={{ fontSize: 50, color: 'gray' }} />
                  <Typography
                    variant='h6'
                    color='text.secondary'
                  >
                    No application meet your condition
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          ) : (
            props.data.map((e, index) => {
              const user: UserAccount = props.users[index] as UserAccount
              return (
                <TableRow key={e.id}>
                  <TableCell
                    component='th'
                    scope='row'
                  >
                    <Stack
                      direction='row'
                      alignItems='center'
                      spacing={2}
                    >
                      <Avatar
                        sx={{ bgcolor: 'primary.main' }}
                        alt={`${user?.firstName || ''} ${user?.lastName || ''}`}
                      >
                        {user?.firstName?.charAt(0).toUpperCase() || '?'}
                      </Avatar>

                      <Stack>
                        <Typography
                          variant='body1'
                          fontWeight='medium'
                        >
                          {user ? `${user.firstName} ${user.lastName}` : 'Unknown Name'}
                        </Typography>

                        <Typography
                          variant='body2'
                          color='text.secondary'
                        >
                          {user?.dateOfBirth
                            ? `${new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()} years old`
                            : 'Unknown Age'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>

                  <TableCell align='center'>{e.coverLetter}</TableCell>

                  <TableCell align='center'>
                    <AttachFileIcon sx={{ color: 'primary.main', cursor: 'pointer' }} />
                  </TableCell>

                  <TableCell align='center'>{generateDaysPassed(e.createdAt)}</TableCell>

                  <TableCell align='center'>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size='small'
                        sx={{
                          borderRadius: '50%',
                          width: 30,
                          height: 30,
                          border: '1px solid black',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            transform: 'scale(1.1)',
                            transition: 'all 0.3s ease'
                          }
                        }}
                      >
                        <MailIcon sx={{ color: 'black' }} />
                      </IconButton>
                      <DropdownMenuBtn
                        applicationId={e.id}
                        state={e.state}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
