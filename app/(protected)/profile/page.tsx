'use client'
import React from 'react'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { AccountType, UserAccount } from '@/models'
import { BasicInfoSection, PersonalInfoSection } from '@/components'
import { useAccountStore } from '@/stores'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ProfileProps = {}

const Profile: React.FC<ProfileProps> = (props) => {
  const accountStore = useAccountStore()
  const [user, setUser] = React.useState<UserAccount | null>(null)

  React.useEffect(() => {
    if (!accountStore.account) {
      accountStore.loadAccountByJwt()
    }
  }, [])
  React.useEffect(() => {
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
