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

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const headers = [
  { label: 'Candidate' },
  { label: 'Gender' },
  { label: 'CV' },
  { label: 'Date Applied' },
  { label: 'Action' }
]

export const ApplicationTable = () => {
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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell
                component='th'
                scope='row'
              >
                {row.name}
              </TableCell>
              <TableCell align='center'>{row.calories}</TableCell>
              <TableCell align='center'>
                <AttachFileIcon sx={{ color: 'primary.main', cursor: 'pointer' }} />
              </TableCell>
              <TableCell align='center'>{row.carbs}</TableCell>
              <TableCell align='center'>
                <DropdownMenuBtn />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
