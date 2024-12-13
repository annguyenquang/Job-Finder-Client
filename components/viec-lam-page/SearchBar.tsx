'use client'
import { Autocomplete, Container, Grid2, InputLabel, SelectChangeEvent, TextField } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import LoadingButton from '@mui/lab/LoadingButton'
import React from 'react'
import { LocationService, Province } from '@/services/LocationService'
import { useDebounce } from '../../hooks/useDebounce'
import { useJobListStore } from '@/stores'
import { useAIStore } from '@/stores/AIPopupStore'

interface SearchBarProps {
  location: string
  handleChange: (event: SelectChangeEvent<string>) => void
}
const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const jobStore = useJobListStore()
  const AIPopupStore = useAIStore()
  // Define your initial options state
  const initialOptions: Province[] = [
    {
      name: 'Thành phố Hà Nội',
      code: 1,
      districts: []
    },
    {
      name: 'Thành phố Hồ Chí Minh',
      code: 79,
      districts: []
    },
    {
      name: 'Thành phố Đà Nẵng',
      code: 48,
      districts: []
    }
  ]
  const [loading, setLoading] = React.useState(false)
  const [options, setOptions] = React.useState<Province[]>(initialOptions)
  const [locationQuery, setLocationQuery] = React.useState('')
  const [searchQuery, setSearchQuery] = React.useState('')
  const locationDebounce = useDebounce<string>(locationQuery)
  const searchDebounce = useDebounce<string>(searchQuery)

  React.useEffect(() => {
    const fetchProvinces = async () => {
      if (locationDebounce) {
        // Only fetch if there's a query
        setLoading(true) // Start loading
        try {
          const res = await LocationService.searchProvince(locationDebounce) // Fetch results
          setOptions(res!) // Update options with the fetched results
        } catch (error) {
          console.error('Error fetching provinces:', error) // Error handling
        } finally {
          setLoading(false) // End loading
        }
      } else {
        setOptions(initialOptions) // Clear options if the query is empty
        const newParam = jobStore.reqParam
        newParam.setProvinceId(null)
        newParam.setPage(1)
        jobStore.updateParam(newParam)
        jobStore.loadJobs()
      }
    }

    fetchProvinces()
  }, [locationDebounce])

  React.useEffect(() => {
    const currentParam = jobStore.reqParam
    currentParam.setQuery(searchDebounce)
    currentParam.setPage(1)
    jobStore.updateParam(currentParam)
    jobStore.loadJobs()
    if (searchDebounce) {
      const AIParam = AIPopupStore.reqParam
      AIParam.setRecentQueries([searchDebounce])
    }
  }, [searchDebounce])

  return (
    <Container
      className=' bg-background py-2'
      maxWidth='xl'
      disableGutters={true}
    >
      <Grid2
        className='px-0'
        container
        spacing={1}
      >
        <Grid2
          size={6}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <TextField
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
            fullWidth
            size='small'
            label='Tìm việc làm yêu thích'
            id='fullWidth'
          />
        </Grid2>
        <Grid2
          size={6}
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Container className='flex flex-row items-center justify-between'>
            <InputLabel id='demo-simple-select-label'>Địa điểm</InputLabel>
            {/* <Select
              inputProps={{ 'aria-label': 'Without label' }}
              size='small'
              displayEmpty
              id='location-select'
              IconComponent={LocationOnIcon}
              value={props.location}
              onChange={props.handleChange}
              sx={{ width: '85%' }}
            >
              <MenuItem value={'TP. Hồ Chí Minh'}>TP. Hồ Chí Minh</MenuItem>
              <MenuItem value={'Hà Nội'}>Hà Nội</MenuItem>
              <MenuItem value={'Đà Nẵng'}>Đà Nẵng</MenuItem>
            </Select> */}
            <Autocomplete
              disablePortal
              options={options.map((option) => option.name)}
              filterOptions={(options) => options}
              sx={{ width: '85%' }}
              loading={loading} // loading state
              loadingText='Đang tải...' // custom loading text
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Chọn địa điểm'
                />
              )}
              onInputChange={(e, newInputValue) => {
                setLocationQuery(newInputValue)
              }}
              onChange={(event, value) => {
                const selectedProvince = options.find((option) => option.name === value)
                if (selectedProvince) {
                  const newParam = jobStore.reqParam
                  // Call the passed setProvinceId function to set the province ID
                  newParam.setProvinceId(selectedProvince.code)
                  newParam.setPage(1)
                  jobStore.updateParam(newParam)
                  jobStore.loadJobs()
                }
              }}
            />
          </Container>
          <LoadingButton
            className='bg-colorPrimary text-text'
            loading={false}
            loadingPosition='start'
            startIcon={<SearchIcon />}
            variant='outlined'
          >
            Search
          </LoadingButton>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default SearchBar
