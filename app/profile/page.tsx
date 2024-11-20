'use client'
import React from 'react'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { UserAccount } from '@/models'
import { BasicInfoSection, PersonalInfoSection } from '@/components'

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
      <PersonalInfoSection user={user}></PersonalInfoSection>
    </Stack>
  </Container>)
}






export default Profile