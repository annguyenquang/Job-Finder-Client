'use client'
import { Box, InputLabel, MenuItem, outlinedInputClasses, Select, selectClasses, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import React, { useState } from 'react'
import { Metadata } from '@/models/common/Metadata'

type FilterBoxProps = {
  filterOptions: Metadata[]
  type: number
}

const FilterBox: React.FC<FilterBoxProps> = (props: FilterBoxProps) => {
  const [val, setVal] = useState<number>()

  return (
    <Box
      sx={{
        marginTop: '0.5rem',
        padding: '0.5rem',
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px'
      }}
    >
      <Typography variant='body1' sx={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}>
        {TypeTranslation[props.type]}
      </Typography>
      <Select
        displayEmpty
        fullWidth
        disableUnderline
        labelId='inputLabel'
        IconComponent={ExpandMoreIcon}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
          }
        }}
        value={val}
        onChange={(event) => setVal(event.target.value as number)}
        sx={{
          mt: 1.5,
          [`& .${selectClasses.select}`]: {
            width: '100%',
            background: 'white',
            color: 'black',
            borderRadius: '4px',
            paddingLeft: '8px', // Reduce padding for smaller size
            paddingTop: '8px',
            paddingBottom: '8px',
            fontSize: '0.875rem' // Smaller font size
          },
          [`& .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'grey.300',
            borderStyle: 'solid',
            borderWidth: '2px'
          },
          '&:hover': {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'grey.400'
            }
          }
        }}
      >
        {props.filterOptions.map((e) => (
          <MenuItem key={e.id} value={0} sx={{ fontSize: '0.875rem', padding: '6px 12px' }}>
            {e.value}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default FilterBox
