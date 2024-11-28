import { useAccountStore, useUserStore } from '@/stores'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import React from 'react'

const PersonalSkills: React.FC<{ skills: string[]; isEditing: boolean; onCancel: () => void }> = (props) => {
  const [skills, setSkills] = React.useState<string[]>(props.skills)

  const onDeleteSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i != index))
  }
  const onSkillChange = (_: React.ChangeEvent<object>, value: string[]) => {
    setSkills(value)
  }
  const onCancel = () => {
    setSkills(props.skills)
    props.onCancel()
  }
  const onSave = async () => {
    await useUserStore.getState().updateSkills(skills)
    await useAccountStore.getState().loadAccountByJwt()
    onCancel()
  }

  React.useEffect(() => {
    setSkills(props.skills)
  }, [props.skills])

  return (
    <Stack
      direction={'row'}
      spacing={1}
      position={'relative'}
    >
      {props.isEditing ? (
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          className='w-96 pl-2'
          value={skills}
          onChange={onSkillChange}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => {
              const { key, ...tagProps } = getTagProps({ index })
              return (
                <Chip
                  variant='outlined'
                  key={key}
                  label={option}
                  {...tagProps}
                  onDelete={() => onDeleteSkill(index)}
                  size='small'
                />
              )
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label='Tìm kỹ năng'
              size='small'
              className='text-sm pb-4'
            />
          )}
        />
      ) : (
        skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            size='small'
          />
        ))
      )}
      {props.isEditing && (
        <Stack
          direction={'row'}
          sx={{ position: 'absolute', right: 0 }}
        >
          <Button
            onClick={onSave}
            variant='contained'
          >
            Lưu
          </Button>
          <Button onClick={onCancel}>Hủy</Button>
        </Stack>
      )}
    </Stack>
  )
}

export default PersonalSkills
