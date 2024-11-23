import { UserAccount } from '@/models'
import Person from '@mui/icons-material/Person'
import Box from '@mui/material/Box'
import blue from '@mui/material/colors/blue'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PersonalInfoItem from './PersonalInfoItem'
import grey from '@mui/material/colors/grey'
import AddCircle from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import React from 'react'
import { DescriptionDiaglog } from './DescriptionDialog'
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'
import TextField from '@mui/material/TextField/TextField'
import InputAdornment from '@mui/material/InputAdornment/InputAdornment'
import Search from '@mui/icons-material/Search'

type PersonalInfoSectionProps = {
  user: UserAccount | null
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = (props) => {
  const [isOpenDescriptionDialog, setIsOpenDescriptionDialog] = React.useState<boolean>(false)
  const [isEditingSkills, setIsEditingSkills] = React.useState<boolean>(false)
  const closeDescriptionDialog = () => {
    setIsOpenDescriptionDialog(false)
  }
  const openDescriptionDialog = () => {
    setIsOpenDescriptionDialog(true)
  }
  const generateDescriptionComponent = () => {
    if (!props.user?.selfDescription || props.user?.selfDescription.length === 0) return null
    return <Typography>{props.user?.selfDescription}</Typography>
  }
  const generateCertificationsComponent = () => {
    if (!props.user?.certifications || props.user?.certifications.length === 0) return null
    return props.user?.certifications?.map((certificate) => (
      <Stack
        key={certificate.name}
        direction={'row'}
        spacing={1}
      >
        <Box
          width={50}
          height={'70'}
          bgcolor={'silver'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography
            color='white'
            variant='h6'
            textAlign={'center'}
          >
            {certificate.issuingOrganization.slice(0, 3)}
          </Typography>
        </Box>
        <Stack>
          <Typography fontWeight={'bold'}>{certificate.name}</Typography>
          <Typography>{certificate.issuingOrganization}</Typography>
          <Stack
            direction={'row'}
            color={grey[500]}
            spacing={1}
          >
            <Typography>{'Issued ' + certificate?.issueDate?.toLocaleString()}</Typography>
            <Typography>{'Expires ' + certificate?.issueDate?.toLocaleString()}</Typography>
          </Stack>
        </Stack>
      </Stack>
    ))
  }
  const editSkills = () => {
    setIsEditingSkills(true)
  }
  const onCancelEditSkills = () => {
    setIsEditingSkills(false)
  }
  const onSaveEditSkills = () => {
    setIsEditingSkills(false)
  }
  return (
    <Stack spacing={4}>
      <DescriptionDiaglog
        description={props.user?.selfDescription ?? ' '}
        isOpen={isOpenDescriptionDialog}
        onClose={closeDescriptionDialog}
      ></DescriptionDiaglog>
      <Box
        sx={{ cursor: 'pointer' }}
        width={'fit-content'}
      >
        <Stack
          direction={'row'}
          color={blue[900]}
        >
          <Person fontSize='medium'></Person>
          <Typography variant='subtitle1'>
            <strong>THÔNG TIN CÁ NHÂN</strong>
          </Typography>
        </Stack>
        <Divider sx={{ borderBottomWidth: 5, borderColor: blue[900] }} />
      </Box>
      <Divider />
      <PersonalInfoItem
        label='Giới thiệu bản thân'
        isEditable
        onEdit={openDescriptionDialog}
      >
        {generateDescriptionComponent()}
      </PersonalInfoItem>
      <PersonalInfoItem
        label='Kỹ năng'
        emptyLabel='Thông tin về kỹ năng của bạn khiến nhà tuyển dụng để mắt đến bạn hơn'
        isEditable={true}
        onEdit={editSkills}
      >
        {!props.user || !props.user.skills || props.user.skills.length === 0 ? null : (
          <PersonalSkills
            skills={props?.user?.skills ?? []}
            isEditing={isEditingSkills}
            onCancel={onCancelEditSkills}
            onSave={onSaveEditSkills}
          ></PersonalSkills>
        )}
      </PersonalInfoItem>
      <PersonalInfoItem
        label='CHỨNG CHỈ'
        emptyLabel='Thêm các chứng chỉ mà bạn có giúp gây ấn tưởng với nhà tuyển dụng'
      >
        {generateCertificationsComponent()}
      </PersonalInfoItem>
      <PersonalInfoItem label='Vị hồ sơ ứng tuyển (CV)'>
        <Box
          display={'flex'}
          alignItems={'center'}
          flexDirection={'column'}
          gap={1}
        >
          <Typography
            color={grey[700]}
            textAlign={'center'}
          >
            77.4% nhà tuyển dụng rất coi trọng hồ sơ xin việc trong quá trình tuyển dụng
          </Typography>
          <Button
            startIcon={<AddCircle />}
            sx={{ width: 'fit-content', fontWeight: '' }}
          >
            Thêm hồ sơ
          </Button>
        </Box>
      </PersonalInfoItem>
      <PersonalInfoItem label='Kinh nghiệm làm việc'>
        <Box
          display={'flex'}
          gap={1}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Typography
            color={grey[700]}
            textAlign={'center'}
          >
            77.9% nhà tuyển dụng được khảo sát cho rằng kinh nghiệm làm việc sẽ là một trong những yếu tố quan trọng
            nhất trong CV ứng tuyển.
          </Typography>
          <Button
            startIcon={<AddCircle />}
            sx={{ width: 'fit-content', fontWeight: '' }}
          >
            Thêm kinh nghiệm làm việc
          </Button>
        </Box>
      </PersonalInfoItem>
      <PersonalInfoItem label='Trình độ học vấn'>
        <Box
          display={'flex'}
          alignItems={'center'}
          flexDirection={'column'}
          gap={1}
        >
          <Typography
            color={grey[700]}
            textAlign={'center'}
          >
            Thông tin về quá trình học vấn sẽ giúp tăng cơ hội phỏng vấn của bạn đến 23%
          </Typography>
          <Button
            startIcon={<AddCircle />}
            sx={{ width: 'fit-content', fontWeight: '' }}
          >
            Bổ sung Trình độ học vấnThêm kinh nghiệm làm việc
          </Button>
        </Box>
      </PersonalInfoItem>
      <PersonalInfoItem label='Portfolio, file đính kèm và liên kết mạng xã hội'>
        <Box
          display={'flex'}
          alignItems={'center'}
          flexDirection={'column'}
          gap={1}
        >
          <Typography
            color={grey[700]}
            textAlign={'center'}
          >
            Một hồ sơ hoàn chỉnh nhân đôi cơ hội có được những việc làm tốt nhất trên Glints.
          </Typography>
          <Button
            startIcon={<AddCircle />}
            sx={{ width: 'fit-content', fontWeight: '' }}
          >
            Thêm danh mục
          </Button>
        </Box>
      </PersonalInfoItem>
    </Stack>
  )
}

const PersonalSkills: React.FC<{ skills: string[]; isEditing: boolean; onSave: () => void; onCancel: () => void }> = (
  props
) => {
  const [skills, setSkills] = React.useState<string[]>(props.skills)

  const onDeleteSkill = (index: number) => {
    console.log('delete skill at index', index)
    setSkills(skills.filter((_, i) => i != index))
  }
  const onSkillChange = (_: React.ChangeEvent<object>, value: string[]) => {
    setSkills(value)
  }
  const onCancel = () => {
    setSkills(props.skills)
    props.onCancel()
  }
  const onSave = () => {
    //Call api
    props.onSave()
  }

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
