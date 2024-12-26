import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import React from 'react'
import { useJobDetailStore } from '@/stores'

const SortMenu = () => {
  const [sortOption, setSortOption] = React.useState<number | ''>('') // Allow empty initial value
  const jobDetailStore = useJobDetailStore()

  const handleChange = (event: SelectChangeEvent<number>) => {
    const selectedValue = parseInt(event.target.value as unknown as string, 10)
    setSortOption(selectedValue)

    // Integrate with store
    const param = jobDetailStore.jobApplicationParam
    param.setSort(selectedValue) // Update the sort option in the store
    jobDetailStore.updateJobApplicationParam(param)
    jobDetailStore.loadApplication(param)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Select
        value={sortOption}
        onChange={handleChange} // Fixed handler
        size='small'
        displayEmpty
        sx={{
          width: 120,
          fontSize: '14px'
        }}
        IconComponent={ArrowDropDownIcon} // Custom arrow icon
      >
        <MenuItem
          value=''
          disabled
        >
          Select an option
        </MenuItem>
        <MenuItem value={1}>Newest</MenuItem>
        <MenuItem value={0}>Oldest</MenuItem>
      </Select>
    </Box>
  )
}

export default SortMenu
