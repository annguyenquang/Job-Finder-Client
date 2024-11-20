import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

import { Autocomplete, Chip, TextField, Typography } from '@mui/material'
import { useCreateJobStore } from '@/stores'
import { useAIStore } from '@/stores/AIPopupStore'

export function InitialLayout() {
  const AIPopupStore = useAIStore()

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
          Alan Podemski
        </Box>
        <Box
          component='span'
          sx={{
            fontSize: 14,
            color: 'grey.500',
            marginBottom: '0.875em'
          }}
        >
          Lumiere Riverside, East Tower, 277 Đ. Võ Nguyên Giáp, An Phú, Quận 2
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
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
                    background: 'linear-gradient(to right, #aa4ad0, #1547ac)', // Gradient colors
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
            />
          )}
        />
      </Box>
    </Card>
  )
}
