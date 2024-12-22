import * as React from 'react'
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
import { differenceInDays, parseISO, format } from 'date-fns'
import MailIcon from '@mui/icons-material/Mail'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import { TableRowSkeleton } from './skeleton'

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein }
}

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

export const ApplicationTable: React.FC<ApplicationTableProps> = (props) => {
  const jobDetailStore = useJobDetailStore()
  console.log('List Users: ', props.users)
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
              console.log('Row data:', e)
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
                      {/* Avatar with the first character of the user's first name */}
                      <Avatar
                        sx={{ bgcolor: 'primary.main' }}
                        alt={`${user?.firstName || ''} ${user?.lastName || ''}`}
                      >
                        {user?.firstName?.charAt(0).toUpperCase() || '?'}
                      </Avatar>

                      {/* User details */}
                      <Stack>
                        {/* Full Name */}
                        <Typography
                          variant='body1'
                          fontWeight='medium'
                        >
                          {user ? `${user.firstName} ${user.lastName}` : 'Unknown Name'}
                        </Typography>

                        {/* Age */}
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
                  <TableCell align='center'>
                    {(() => {
                      const createdAt = typeof e.createdAt === 'string' ? parseISO(e.createdAt) : e.createdAt
                      const daysAgo = differenceInDays(new Date(), createdAt)
                      return `${daysAgo} day(s) ago`
                    })()}
                  </TableCell>
                  <TableCell align='center'>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size='small'
                        sx={{
                          borderRadius: '50%', // Makes the button rounded
                          width: 30, // Set a fixed width for square button
                          height: 30, // Set a fixed height for square button
                          border: '1px solid black', // Black border
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Light background on hover
                            transform: 'scale(1.1)', // Slightly enlarge the icon
                            transition: 'all 0.3s ease' // Smooth transition for the hover effect
                          }
                        }}
                      >
                        <MailIcon sx={{ color: 'black' }} /> {/* Set icon color to black */}
                      </IconButton>
                      <DropdownMenuBtn />
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
