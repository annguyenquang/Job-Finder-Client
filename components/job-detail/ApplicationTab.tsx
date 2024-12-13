import React from 'react'
import { SxProps, Theme } from '@mui/material/styles'
import Tab, { tabClasses } from '@mui/material/Tab'
import Tabs, { tabsClasses, TabsProps } from '@mui/material/Tabs'

export const tabsStyles = (theme: Theme) => ({
  backgroundColor: 'transparent',
  borderRadius: '10px',
  minHeight: 44,
  display: 'flex',
  [`& .${tabsClasses.flexContainer}`]: {
    position: 'relative',
    padding: '0',
    zIndex: 1
  },
  [`& .${tabsClasses.indicator}`]: {
    top: 3,
    bottom: 3,
    height: 'auto',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.16)'
  }
})

export const tabItemStyles = (theme: Theme) => ({
  fontWeight: 500,
  minHeight: 44,
  flex: 1,
  textAlign: 'center',
  opacity: 0.7,
  color: theme.palette.text.primary,
  textTransform: 'initial',
  '&:hover': {
    opacity: 1
  },
  [`&.${tabClasses.selected}`]: {
    color: theme.palette.text.primary,
    opacity: 1
  }
})

export const ApplicationTab = ({ sx }: TabsProps) => {
  const [tabIndex, setTabIndex] = React.useState(0)

  return (
    <Tabs
      className='mx-1'
      value={tabIndex}
      onChange={(e, index) => setTabIndex(index)}
      sx={[(theme) => tabsStyles(theme), ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Tab
        disableRipple
        label='Tất cả'
        sx={(theme) => tabItemStyles(theme)}
      />
      <Tab
        disableRipple
        label='Đang xem xét'
        sx={(theme) => tabItemStyles(theme)}
      />
      <Tab
        disableRipple
        label='Loại bỏ'
        sx={(theme) => tabItemStyles(theme)}
      />
      <Tab
        disableRipple
        label='Đã chọn'
        sx={(theme) => tabItemStyles(theme)}
      />
    </Tabs>
  )
}
