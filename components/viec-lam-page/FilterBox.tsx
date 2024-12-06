'use client'

import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Select, { selectClasses } from '@mui/material/Select'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import { Metadata, TypeTranslation } from '@/models'
import { useJobListStore } from '@/stores'

type FilterBoxProps = {
  filter: Metadata[]
  type: number
}

const FilterBox: React.FC<FilterBoxProps> = (props: FilterBoxProps) => {
  const jobStore = useJobListStore()
  const [val, setVal] = React.useState<string>('')
  const filterOptions = props.filter.filter((element) => props.type === element.type)

  const handleSelect = (metadataId: string) => {
    jobStore.modifyFilter(metadataId)

    setVal(metadataId) // Update local state to reflect selected value
  }

  React.useEffect(() => {
    setVal('')
  }, [jobStore.resetFlag])
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
      <Typography
        variant='body1'
        sx={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
      >
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
          <MenuItem
            key={e.id}
            value={e.id}
            sx={{ fontSize: '0.875rem', padding: '6px 12px' }}
          >
            {e.value}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default FilterBox
