import * as React from 'react'
import { alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import Divider from '@mui/material/Divider'
import ArchiveIcon from '@mui/icons-material/Archive'
import MailIcon from '@mui/icons-material/Mail'
import CheckIcon from '@mui/icons-material/Check'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
export const DropdownMenuBtn = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id='demo-customized-button'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Move to
      </Button>
      <Menu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: 1,
            minWidth: 180,
            color: 'rgb(55, 65, 81)',
            boxShadow:
              'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
              padding: '4px 0'
            },
            '& .MuiMenuItem-root': {
              '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: 'text.secondary',
                marginRight: 1.5
              },
              '&:active': {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
              }
            }
          }
        }}
      >
        <MenuItem
          onClick={handleClose}
          disableRipple
        >
          <CheckIcon />
          Chọn
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          disableRipple
        >
          <NotInterestedIcon />
          Loại
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={handleClose}
          disableRipple
        >
          <MailIcon />
          Email
        </MenuItem>
      </Menu>
    </div>
  )
}
