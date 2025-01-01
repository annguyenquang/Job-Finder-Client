import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome' // Sparkle icon

import { Autocomplete, Button, Chip, TextField, Typography } from '@mui/material'
import { useAIStore } from '@/stores/AIPopupStore'
import { AIService, JobService, LocationService, Province } from '@/services'
import { useDebounce } from '../../hooks/useDebounce'
import { ParsedJobSuggestion, UserAccount } from '@/models'
import { useAccountStore } from '@/stores'

const InitialLayout = () => {
  const AIPopupStore = useAIStore()

  const accountStore = useAccountStore()

  React.useEffect(() => {
    if (!accountStore.account) {
      accountStore.loadAccountByJwt()
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  const handleSkillChange = (event: React.ChangeEvent<{}>, newValue: string[]) => {
    const param = AIPopupStore.reqParam
    param.setSkills(newValue)
    AIPopupStore.updateParam(param)
  }

  const handleSkillDelete = (indexToDelete: number) => {
    const param = AIPopupStore.reqParam
    const updatedSkills = param.skills.filter((_, index) => index !== indexToDelete)
    param.setSkills(updatedSkills)
    AIPopupStore.updateParam(param)
  }

  const handleGenerate = async () => {
    AIPopupStore.updateProcessState('LOADING')
    try {
      const suggestionParam = AIPopupStore.reqParam.constructParam()
      const suggestions = await AIService.getSuggestion(suggestionParam)
      const jobSuggestion = suggestions?.result.suggestions
      const explanation = suggestions?.result.explanation
      if (jobSuggestion && explanation) {
        const parsedSuggestion: ParsedJobSuggestion[] = await Promise.all(
          jobSuggestion.map(async (e, i) => {
            const jobDetail = await JobService.getJobById(e.jobId)
            return { job: jobDetail?.result, detailExplanation: e.detailExplanation }
          })
        )
        AIPopupStore.updateSuggestionJobs(parsedSuggestion)
        AIPopupStore.updateOverallExplanation(explanation)
      }
    } catch (error) {
    } finally {
      AIPopupStore.updateProcessState('DONE')
    }
  }

  const [locationQuery, setLocationQuery] = React.useState('')

  const locationDebounce = useDebounce<string>(locationQuery)

  React.useEffect(() => {
    const fetchProvinces = async () => {
      if (locationDebounce) {
        // Only fetch if there's a query
        try {
          const res = await LocationService.searchProvince(locationDebounce) // Fetch results
          setOptions(res!) // Update options with the fetched results
        } catch (error) {
          console.error('Error fetching provinces:', error) // Error handling
        }
      } else {
        setOptions(initialOptions) // Clear options if the query is empty
        const newParam = AIPopupStore.reqParam
        newParam.setProvinceId(null)
        newParam.setPage(1)
        AIPopupStore.updateParam(newParam)
      }
    }

    fetchProvinces()
  }, [locationDebounce])
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
  const [options, setOptions] = React.useState<Province[]>(initialOptions)

  return (
    <Card
      sx={{
        borderRadius: '12px',
        minWidth: '100%',
        textAlign: 'center',
        boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)'
      }}
    >
      <CardContent
        sx={{
          //   background: 'linear-gradient(135deg, #e5b6e3, #ececec, #37adb1)'
          background: 'white'
        }}
      >
        <Avatar
          src={'https://i.pravatar.cc/300'}
          sx={{
            width: 60,
            height: 60,
            margin: 'auto'
          }}
        />
        <Box
          component='h3'
          sx={{
            fontSize: 18,
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            marginTop: 1,
            marginBottom: 0
          }}
        >
          {accountStore.account?.username}
        </Box>
        <Box
          component='span'
          sx={{
            fontSize: 14,
            color: 'grey.500',
            marginBottom: '0.875em'
          }}
        >
          {(accountStore.account as UserAccount).selfDescription}
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant='subtitle1'>Thêm kĩ năng bạn đang tìm kiếm: </Typography>

        <Autocomplete
          sx={{
            width: '70%'
          }}
          multiple
          freeSolo
          options={[]}
          value={AIPopupStore.reqParam.skills}
          onChange={handleSkillChange}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => {
              const { key, ...tagProps } = getTagProps({ index })
              return (
                <Chip
                  key={key}
                  sx={{
                    // background: 'linear-gradient(135deg, #76f5d5, #4fb7c5)', // Gradient colors
                    background: 'black',
                    color: '#fff', // Text color
                    '& .MuiChip-deleteIcon': {
                      color: '#fff' // Delete icon color
                    }
                  }}
                  label={option}
                  {...tagProps}
                  onDelete={() => handleSkillDelete(index)}
                  size='small'
                />
              )
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              size='small'
              className='text-sm pb-4'
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position='start'></InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px', // Rounded corners
                  '& fieldset': {
                    borderColor: '#7a7c7c' // Default border color
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6a6a6a', // Remove blue border
                    borderWidth: 2
                  }
                },
                '& .MuiInputLabel-root': {
                  color: '#4fb7c5' // Label color
                }
              }}
            />
          )}
        />
        <Typography variant='subtitle1'>Lựa chọn địa điểm: </Typography>
        <Autocomplete
          disablePortal
          options={options.map((option) => option.name)}
          filterOptions={(options) => options}
          sx={{ width: '85%' }}
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
              const newParam = AIPopupStore.reqParam
              // Call the passed setProvinceId function to set the province ID
              newParam.setProvinceId(selectedProvince.code)
              newParam.setPage(1)
              AIPopupStore.updateParam(newParam)
            }
          }}
        />
        <Button
          variant='contained'
          onClick={handleGenerate}
          startIcon={<AutoAwesomeIcon />}
          sx={{
            // background: 'linear-gradient(135deg, #53e2b9, #b2deac, #2b9db1)',
            background: 'linear-gradient(135deg, #000000, #808080)',
            marginTop: 4,
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '25px', // Rounded corners
            padding: '10px 20px',
            textTransform: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0px 4px 10px rgba(116, 219, 174, 0.3)', // Subtle shadow
            '&:hover': {
              // background: 'linear-gradient(135deg, #76f5d5, #4fb7c5)', // Brighter gradient on hover
              background: 'black',
              transform: 'scale(1.05)', // Slight zoom effect
              boxShadow: '0px 6px 15px rgba(24, 139, 181, 0.5)' // More prominent shadow
            },
            '& .MuiButton-startIcon': {
              color: 'white', // Ensure the icon matches the text color
              animation: 'sparkle 1.5s infinite' // Custom sparkle animation
            }
          }}
        >
          Start Generating
        </Button>
      </Box>
    </Card>
  )
}

export default InitialLayout
