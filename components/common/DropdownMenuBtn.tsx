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
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { JobApplicationService, JobService } from '@/services'
import { useJobDetailStore } from '@/stores'

type DropdownProp = {
  applicationId: string
  state: number
}

export const DropdownMenuBtn: React.FC<DropdownProp> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedValue, setSelectedValue] = React.useState<number | null>(null)
  const jobDetailStore = useJobDetailStore()

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const updateState = async (newState: number) => {
    await JobApplicationService.updateApplication(props.applicationId, newState)
  }
  const handleClose = (value: number) => {
    if (value !== undefined) {
      setSelectedValue(value)
      updateState(value)
      jobDetailStore.loadApplication(jobDetailStore.jobApplicationParam)
      console.log('Selected value:', value)
    }
    setAnchorEl(null)
  }

  // Determine button properties based on the current state
  const getButtonProps = () => {
    switch (props.state) {
      case 1:
        return { color: '##63f011', label: 'Selected' }
      case 2:
        return { color: '#f01132', label: 'Rejected' }
      case 0:
      default:
        return { color: '#f09541', label: 'Reviewing' }
    }
  }

  const getButtonIcon = (state: number) => {
    switch (state) {
      case 1:
        return <CheckIcon /> // Icon for "Đã chọn"
      case 2:
        return <NotInterestedIcon /> // Icon for "Đã loại"
      default:
        return <HourglassEmptyIcon /> // Icon for "Đang xem xét"
    }
  }

  const { color, label } = getButtonProps()

  return (
    <div>
      <Button
        id='demo-customized-button'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        sx={{
          backgroundColor: color,
          minWidth: '140px'
        }}
        variant='contained'
        disableElevation
        onClick={handleClick}
        startIcon={getButtonIcon(props.state)}
      >
        {label}
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
          onClick={() => handleClose(1)}
          disableRipple
          value={1}
        >
          <CheckIcon />
          Chọn
        </MenuItem>
        <MenuItem
          onClick={() => handleClose(2)}
          disableRipple
          value={2}
        >
          <NotInterestedIcon />
          Loại
        </MenuItem>
      </Menu>
    </div>
  )
}
