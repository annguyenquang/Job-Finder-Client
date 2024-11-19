'use client'
import Image from 'next/image'
import React, { SyntheticEvent } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Grid2 from '@mui/material/Grid2'
import { UserAccount } from '@/models'
import Edit from '@mui/icons-material/Edit'
import blue from '@mui/material/colors/blue'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { ArrowDownward, NavigateNext, PlusOne } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import Add from '@mui/icons-material/Add'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import grey from '@mui/material/colors/grey'
import { BasicInfoSection } from '@/components'

type ProfileProps = {}
const TestValue: UserAccount = {
  id: '123',
  username: 'annguyeen0',
  firstName: 'An',
  lastName: 'Nguyen',
  phone: '0389553233',
  email: 'annguyeen0@gmail.com',
  dateOfBirth: new Date()
}
const Profile: React.FC<ProfileProps> = props => {
  const [user, setUser] = React.useState<UserAccount | null>(TestValue)

  return (<Container>
    <Stack>
      <BasicInfoSection user={user}></BasicInfoSection>
      <Box></Box>
    </Stack>
  </Container>)
}





export default Profile