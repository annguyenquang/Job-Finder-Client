import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import { useLocationStore } from '@/stores'
import { District, LocationService, Province } from '@/services'

type ProvinceAndDistrictInputProps = {
  provinceId: number | null
  districtId: number | null
  setProvinceId: (value: number) => void
  setDistrictId: (value: number) => void
}

export const ProvinceAndDistrictInput: React.FC<ProvinceAndDistrictInputProps> = (props) => {
  const locationStore = useLocationStore()
  const [inputDistrictText, setInputDistrictText] = React.useState<string>('')
  const [inputProvinceText, setInputProvinceText] = React.useState<string>('')

  const [listDistrict, setListDistrict] = React.useState<District[] | undefined>([])

  const handleProvinceChange = (event: React.SyntheticEvent, newValue: Province | string | null) => {
    const code = (newValue as Province)?.code
    setListDistrict([])
    setInputDistrictText('')
    props.setDistrictId(0)
    props.setProvinceId(code)
  }

  const handleDistrictChange = (event: React.SyntheticEvent, newValue: District | string | null) => {
    const code = (newValue as District)?.code
    props.setDistrictId(code)
  }

  React.useEffect(() => {
    const fetchAllProvince = async () => {
      await locationStore.loadAllProvince()
    }

    fetchAllProvince()
  }, [])

  React.useEffect(() => {
    const fetchDistrictName = async () => {
      const districtId = props.districtId

      if (locationStore.allDistrict.length === 0) {
        await locationStore.loadAllDistrict()
      }

      const districtName = locationStore.allDistrict.find((district) => district.code === districtId)?.name || ''

      setInputDistrictText(districtName)
    }

    fetchDistrictName()
  }, [props.districtId, locationStore])

  React.useEffect(() => {
    if (props.provinceId === 0 || null) {
      setInputProvinceText('')
    }
    if (props.provinceId) {
      const fetchAllDistrict = async (selectedProvinceId: number) => {
        const listDistrict = await LocationService.getDistrictsByProvinceId(selectedProvinceId)
        setListDistrict(listDistrict)
      }
      fetchAllDistrict(props.provinceId)
    }
  }, [props.provinceId])

  return (
    <Box className='flex flex-row'>
      {locationStore.allProvince && (
        <Autocomplete
          freeSolo
          options={locationStore.allProvince}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.name) || ''}
          isOptionEqualToValue={(option, value) => option.code === value?.code}
          className='w-60 pl-2 mr-1'
          value={locationStore.allProvince.find((province) => province.code === props.provinceId)}
          inputValue={inputProvinceText}
          onInputChange={(event, newInputValue) => setInputProvinceText(newInputValue)}
          onChange={handleProvinceChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Tỉnh/Thành phố'
              size='small'
              className='text-sm pb-4'
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      )}

      {listDistrict && (
        <Autocomplete
          freeSolo
          options={listDistrict}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.name) || ''}
          isOptionEqualToValue={(option, value) => option.code === value?.code}
          className='w-60 pl-2 mr-1'
          value={listDistrict.find((district) => district.code === props.districtId)}
          inputValue={inputDistrictText}
          onInputChange={(event, newInputValue) => setInputDistrictText(newInputValue)}
          onChange={handleDistrictChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Quận/Huyện'
              size='small'
              className='text-sm pb-4'
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      )}
    </Box>
  )
}
