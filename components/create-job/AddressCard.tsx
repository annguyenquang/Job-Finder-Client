import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { ProvinceAndDistrictInput } from './ProvinceAndDistrictInput'
import { useMetadataStore } from '@/stores'
import { useCreateJobStore } from '@/stores'

export const AddressCard: React.FC = () => {
  const metadataStore = useMetadataStore()
  const createJobStore = useCreateJobStore()

  const handleArrangementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    createJobStore.setWorkArrangementId(event.target.value)
  }

  React.useEffect(() => {
    const fetchWorkArrangement = async () => {
      await metadataStore.loadMetadataByWorkArrangement()
    }
    fetchWorkArrangement()
  }, [])

  return (
    <Card className='mb-4'>
      <Box className='p-2 flex-row flex'>
        <Typography className='font-semibold font-sans text-lg pl-2 pt-2 pb-2'>Địa điểm làm việc</Typography>
        <Typography className='font-semibold font-sans text-red-600 text-xl pt-2'>*</Typography>
      </Box>
      <Divider variant='fullWidth' />
      <Box className='p-2'>
        <Typography className='font-semibold font-sans text-base pl-2 pt-2'>Hình thức làm việc</Typography>

        <FormControl>
          {metadataStore.listWorkArrangement.length > 0 && (
            <RadioGroup
              row
              className='pl-2'
              value={createJobStore.jobData.workArrangement.id}
              onChange={handleArrangementChange}
            >
              {metadataStore.listWorkArrangement.map((workArrangement) => (
                <FormControlLabel
                  key={workArrangement.id}
                  value={workArrangement.id}
                  control={<Radio />}
                  label={<span className='text-sm'>{workArrangement.value}</span>}
                />
              ))}
            </RadioGroup>
          )}
        </FormControl>

        <Typography className='font-semibold font-sans text-base pl-2 pt-2 pb-4'>Địa điểm làm việc</Typography>
        <ProvinceAndDistrictInput
          provinceId={createJobStore.jobData.provinceId}
          districtId={createJobStore.jobData.districtId}
          setProvinceId={createJobStore.setProvinceId}
          setDistrictId={createJobStore.setDistrictId}
        ></ProvinceAndDistrictInput>
      </Box>
    </Card>
  )
}
