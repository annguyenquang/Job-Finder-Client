import { Box, IconButton, MenuItem, Select } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import React from 'react'

const SortMenu = () => {
  const [sortOption, setSortOption] = React.useState('')

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortOption(event.target.value as string) // Cast value to the expected type
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
        // onChange={}
        size='small'
        displayEmpty
        sx={{
          width: 120,
          fontSize: '14px'
        }}
        IconComponent={ArrowDropDownIcon} // Disable default arrow
      >
        <MenuItem
          value=''
          disabled
        >
          Select an option
        </MenuItem>

        <MenuItem value='date'>Newest</MenuItem>
        <MenuItem value='name'>Date</MenuItem>
      </Select>
    </Box>
  )
}

export default SortMenu
