'use client'
import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { UserAccount } from '@/models'
import { BasicInfoSection } from '@/components'
import Grid2 from '@mui/material/Grid2'
import { Divider, Typography } from '@mui/material'
import Edit from '@mui/icons-material/Edit'
import blue from '@mui/material/colors/blue'
import { Person } from '@mui/icons-material'

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
      <PersonalInfoSection></PersonalInfoSection>
    </Stack>
  </Container>)
}


type PersonalInfoSectionProps = {

}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = props => {
  return (
    <Stack>
      <Box sx={{ cursor: "pointer" }} width={"fit-content"}>
        <Stack direction={"row"} color={blue[900]} >
          <Person fontSize='medium'></Person>
          <Typography variant='subtitle1'><strong>THÔNG TIN CÁ NHÂN</strong></Typography>
        </Stack>
        <Divider sx={{ borderBottomWidth: 5, borderColor: blue[900] }} />
      </Box>
      <Divider />
      <PersonalInfoItem label='Họ và tên'>
        <Typography>{'An Nguyen'}</Typography>
      </PersonalInfoItem>
      <PersonalInfoItem label='Họ và tên'>
        <Typography>{'An Nguyen'}</Typography>
      </PersonalInfoItem>
    </Stack>
  );
}

type PersonalInfoItemProps = {
  label: string,
  isEditable?: boolean,
  onEdit?: () => void,
  children?: React.ReactNode
}

const PersonalInfoItem: React.FC<PersonalInfoItemProps> = ({ label, isEditable = false, children, onEdit }) => {
  const props = { label, isEditable, children, onEdit }
  return (
    <Stack>
      <Box
        display={"flex"}
        justifyContent={"space-between"}>
        <Typography
          variant='h5'
          fontWeight={"bold"}
          textTransform={"uppercase"}>
          {props.label}
        </Typography>
        {
          props.isEditable &&
          <Stack
            sx={{ cursor: 'pointer', ":hover": { color: blue[900] }, color: blue[500] }}
            direction={"row"}>
            <Edit fontSize='small'></Edit>
            <Typography>CHỈNH SỬA</Typography>
          </Stack>
        }
      </Box>
      <Divider />
      {props.children}
    </Stack>
  );
}


export default Profile