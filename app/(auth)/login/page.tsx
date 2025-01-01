'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import blue from '@mui/material/colors/blue'
import Image from 'next/image'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import { useAccountStore } from '@/stores'
import AccountAndPasswordForm from '../../../components/login/AccountAndPasswordForm'
import Link from 'next/link'
import { Link as MuiLink } from '@mui/material'

const LoginPage: React.FC = () => {
  const accountStore = useAccountStore()
  const router = useRouter()
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const onUpdateUsername = (newUsername: string) => {
    setUsername(newUsername)
  }
  const onUpdatePassword = (newPassword: string) => {
    setPassword(newPassword)
  }
  const onLogin = async () => {
    const account = await accountStore.login(username, password)
    if (account) {
      router.push('/viec-lam')
    } else {
      alert('Đăng nhập thất bại. Tài khoản hoặc mật khẩu không đúng.')
    }
  }
  return (
    <Grid2
      direction={'column'}
      container
      justifyContent='center'
      alignItems={'center'}
    >
      <div className='w-full'>
        <Image
          src='/jobfinder-logo.png'
          width={180}
          height={180}
          alt='JobFinder logo'
        ></Image>
      </div>
      <Card
        variant='outlined'
        className='w-[450px] h-[600px]'
        sx={{ boxShadow: 3 }}
      >
        <CardContent>
          <Grid2
            rowSpacing={2}
            container
            direction='column'
            justifyContent={'center'}
          >
            <Typography
              variant='h5'
              textTransform='uppercase'
              fontWeight='bold'
            >
              Sign in
            </Typography>

            <Divider />

            <Typography variant='h6'>Đăng nhập JobFinder để tiếp tục</Typography>

            <AccountAndPasswordForm
              password={password}
              username={username}
              updatePassword={onUpdatePassword}
              updateUsername={onUpdateUsername}
            />

            <MuiLink
              textAlign={'center'}
              color={blue[600]}
              href='#'
            >
              Quên mật khẩu?
            </MuiLink>

            <Button
              onClick={onLogin}
              variant='contained'
            >
              Đăng nhập
            </Button>
            <Grid2 direction={'row'}>
              <Divider>
                <Typography
                  fontSize={18}
                  textAlign={'center'}
                >
                  Hoặc
                </Typography>
              </Divider>
            </Grid2>

            <Grid2
              columnGap={5}
              justifyContent={'center'}
              alignItems={'center'}
              container
            >
              <Button
                color='inherit'
                className='w-full justify-start p-3'
                variant='outlined'
              >
                <Avatar
                  className='w-[26px] h-[26px] mr-3'
                  variant='square'
                  src='/google-logo.png'
                ></Avatar>
                <Typography textTransform={'none'}>Countinue with Google</Typography>
              </Button>
              <Button
                color='inherit'
                className='w-full justify-start p-3'
                variant='outlined'
              >
                <Avatar
                  className='w-[26px] h-[26px] mr-3'
                  variant='square'
                  src='/facebook-logo.png'
                ></Avatar>
                <Typography textTransform={'none'}>Countinue with Facebook</Typography>
              </Button>
              <Button
                color='inherit'
                className='w-full justify-start p-3'
                variant='outlined'
              >
                <Avatar
                  className='w-[26px] h-[26px] mr-3'
                  variant='square'
                  src='/linkedin-logo.png'
                ></Avatar>
                <Typography textTransform={'none'}>Countinue with LinkedIn</Typography>
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
      <Typography marginTop={1}>
        Chưa có tài khoản?{' '}
        <Link href='/register/company'>
          <span className='text-blue-500'>Tạo ngay</span>
        </Link>
      </Typography>
    </Grid2>
  )
}
export default LoginPage
