/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { logo } from '../../assets'
import Image from 'next/image'
import { useState } from 'react'
import { AccountMenu } from './AccountMenu'
import { useAccountStore } from '@/stores'
import { Button, ButtonGroup, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { grey } from '@mui/material/colors'

export const Navbar = () => {
  const accountStore = useAccountStore()
  const router = useRouter()
  const [link, setLink] = useState([
    {
      direction: '/viec-lam',
      text: 'Việc làm',
      isActive: false
    },
    {
      direction: '/cong-ty',
      text: 'Công ty',
      isActive: false
    },
    {
      direction: '/ho-so',
      text: 'Hồ sơ',
      isActive: false
    }
  ])

  return (
    <div className='flex flex-row justify-between mb-3 gap-6 px-5 h-[75px] border-b-4 border-[#4acd8d]-500 bg-colorPrimary'>
      <div className='flex flex-row '>
        <div className='ml-2 w-[52px] h-[100%] cursor-pointer rounded-full flex flex-row justify-between items-center'>
          <Image
            src={logo}
            alt='user'
            className='w-[80%] h-[80%] object-contain'
          />
        </div>
      </div>

      <div className='flex items-center h-[100%] flex-row'>
        {link.map((e, i) => (
          <div
            key={e.direction}
            className={`px-3 text-center ${e.isActive ? `text-textHover` : `text-text`} font-semibold`}
          >
            <Link href={e.direction}>{e.text}</Link>
          </div>
        ))}
        {accountStore.account ? (
          <AccountMenu />
        ) : (
          <ButtonGroup
            size='small'
            variant='outlined'
            sx={{ backgroundColor: grey[50], color: 'black', textTransform: 'none' }}
          >
            <Button
              onClick={() => {
                router.push('/login')
              }}
            >
              Đăng nhập
            </Button>
            <Button>Đăng ký</Button>
          </ButtonGroup>
        )}
      </div>
    </div>
  )
}
