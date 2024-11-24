'use client'
import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { AccountType, UserAccount } from '@/models'
import { BasicInfoSection, PersonalInfoSection } from '@/components'
import { useAccountStore } from '@/stores'

type ProfileProps = {}
const TestValue: UserAccount = {
  id: '123',
  username: 'annguyeen0',
  firstName: 'An',
  lastName: 'Nguyen',
  phone: '0389553233',
  email: 'annguyeen0@gmail.com',
  selfDescription: 'I am a software engineer',
  skills: ['React', 'NodeJS'],
  certifications: [
    { issueDate: new Date(), expirationDate: new Date(), name: 'React', issuingOrganization: 'Facebook' }
  ],
  dateOfBirth: new Date()
}

const Profile: React.FC<ProfileProps> = (props) => {
  const accountStore = useAccountStore()
  const [user, setUser] = React.useState<UserAccount | null>(TestValue)

  useEffect(() => {
    if (!accountStore.account) {
      accountStore.loadAccountByJwt()
    }
  }, [])
  useEffect(() => {
    if (accountStore.accountType === AccountType.User) {
      setUser(accountStore.account as UserAccount)
    }
  }, [accountStore.account, accountStore.accountType])

  return (
    <Container>
      <Stack>
        <BasicInfoSection user={user}></BasicInfoSection>
        <PersonalInfoSection user={user}></PersonalInfoSection>
      </Stack>
    </Container>
  )
}

export default Profile
