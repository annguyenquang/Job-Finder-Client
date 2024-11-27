'use client'
import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { AccountType, UserAccount } from '@/models'
import { BasicInfoSection, PersonalInfoSection } from '@/components'
import { useAccountStore } from '@/stores'

type ProfileProps = {}

const Profile: React.FC<ProfileProps> = (props) => {
  const accountStore = useAccountStore()
  const [user, setUser] = React.useState<UserAccount | null>(null)

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
