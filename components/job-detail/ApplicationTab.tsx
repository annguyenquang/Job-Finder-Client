'use client'
import React, { useEffect } from 'react'
import { SxProps, Theme } from '@mui/material/styles'
import Tab, { tabClasses } from '@mui/material/Tab'
import Tabs, { tabsClasses, TabsProps } from '@mui/material/Tabs'
import { useJobDetailStore } from '@/stores'
import { ApplicationStatus } from '@/models'

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
    top: 0, // Position the line at the top
    height: 3, // Adjust the thickness of the line
    backgroundColor: theme.palette.primary.main, // Use primary color for the line
    borderRadius: '3px 3px 0 0' // Add rounded edges to the top corners
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
    color: theme.palette.text.primary, // Keep the text color consistent when selected
    opacity: 1
  }
})

export const ApplicationTab = ({ sx }: TabsProps) => {
  const [tabIndex, setTabIndex] = React.useState<number | null>(null)
  const jobDetailStore = useJobDetailStore()

  useEffect(() => {
    const param = jobDetailStore.jobApplicationParam
    param.setState(tabIndex === null ? null : tabIndex) // Pass `null` for "Tất cả"
    param.setPage(1)
    jobDetailStore.updateJobApplicationParam(param)
    jobDetailStore.loadApplication(param)
  }, [tabIndex])

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
        value={null}
        sx={(theme) => tabItemStyles(theme)}
      />
      <Tab
        disableRipple
        label='Đang xem xét'
        value={ApplicationStatus.REVIEW}
        sx={(theme) => tabItemStyles(theme)}
      />
      <Tab
        disableRipple
        label='Loại bỏ'
        value={ApplicationStatus.REJECTED}
        sx={(theme) => tabItemStyles(theme)}
      />
      <Tab
        disableRipple
        label='Đã chọn'
        value={ApplicationStatus.SELECTED}
        sx={(theme) => tabItemStyles(theme)}
      />
    </Tabs>
  )
}
