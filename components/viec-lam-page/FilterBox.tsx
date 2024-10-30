'use client'
import { Box, InputLabel, MenuItem, outlinedInputClasses, Select, selectClasses, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import React, { useEffect, useState } from 'react'
import { Metadata } from '@/models/common/Metadata'
import { TypeTranslation } from '@/models/enum/MetadataValue'
import { useJobStore } from '@/stores'

type FilterBoxProps = {
  filter: Metadata[]
  type: number
}

const FilterBox: React.FC<FilterBoxProps> = (props: FilterBoxProps) => {
  const jobStore = useJobStore()
  const [val, setVal] = useState<string>()
  const filterOptions = props.filter.filter((element) => props.type === element.type)

  const handleSelect = (metadataId: string) => {
    jobStore.modifyFilter(metadataId)
    setVal(metadataId) // Update local state to reflect selected value
  }

  useEffect(() => {
    console.log(`Current selected ID: type ${props.type}/${val}`)
  }, [val])
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
        onChange={(event) => handleSelect(event.target.value as string)} // Use handleSelect to update state
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
        {filterOptions.map((e) => (
          <MenuItem key={e.id} value={e.id} sx={{ fontSize: '0.875rem', padding: '6px 12px' }}>
            {e.value}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default FilterBox
