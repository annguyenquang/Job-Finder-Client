import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
import Person from '@mui/icons-material/Person'
import Settings from '@mui/icons-material/Settings'
import Apartment from '@mui/icons-material/Apartment'
import Dashboard from '@mui/icons-material/Dashboard'
import { useAccountStore } from '@/stores'
import { AccountType, CompanyAccount } from '@/models'

export const AccountMenu = () => {
  const accountStore = useAccountStore()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = async () => {
    handleClose()
    await accountStore.logout()
    router.push('/login')
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href={accountStore.accountType == AccountType.User ? '/profile' : 'company/dashboard'}>
          <MenuItem onClick={handleClose}>
            <Avatar /> {accountStore.account?.username}
          </MenuItem>
        </Link>
        <Divider />
        {accountStore.accountType == AccountType.User ? <UserItem handleOnClose={handleClose} /> : <CompanyItem />}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

const UserItem: React.FC<{ handleOnClose: () => void }> = (props) => {
  return (
    <>
      <MenuItem onClick={props.handleOnClose}>
        <ListItemIcon>
          <Person fontSize='small' />
        </ListItemIcon>
        <Link href={'/profile'}> Quản lý hồ sơ</Link>
      </MenuItem>
      <MenuItem onClick={props.handleOnClose}>
        <ListItemIcon>
          <WorkHistoryIcon fontSize='small' />
        </ListItemIcon>
        Đơn ứng tuyển của tôi
      </MenuItem>
      <MenuItem onClick={props.handleOnClose}>
        <ListItemIcon>
          <Settings fontSize='small' />
        </ListItemIcon>
        Cài đặt tài khoản
      </MenuItem>
    </>
  )
}

const CompanyItem: React.FC = () => {
  const accountStore = useAccountStore()
  const companyAccount = accountStore.account as CompanyAccount
  return (
    <>
      <MenuItem>
        <ListItemIcon>
          <Dashboard fontSize='small' />
        </ListItemIcon>
        <Link href={'/company/dashboard'}>Dashboard</Link>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Apartment fontSize='small' />
        </ListItemIcon>
        <Link href={`/company-profile/${companyAccount.slug}`}>Your profile</Link>
      </MenuItem>
    </>
  )
}
