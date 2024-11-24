import React from 'react'
import grey from '@mui/material/colors/grey'
import blue from '@mui/material/colors/blue'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import AddCircle from '@mui/icons-material/AddCircle'
import Person from '@mui/icons-material/Person'
import { Certification, UserAccount } from '@/models'
import { EditCertificationDialog } from './EditCertificationDialog'
import { EditDescriptionDiaglog } from './EditDescriptionDialog'
import PersonalInfoItem from './PersonalInfoItem'
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
      <EditDescriptionDiaglog
        description={props.user?.selfDescription ?? ' '}
        isOpen={isOpenDescriptionDialog}
        onClose={closeDescriptionDialog}
      ></EditDescriptionDiaglog>
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
        {!props.user || !props.user.certifications || props.user.certifications.length === 0 ? null : (
          <PersonalCertifications certifications={props.user.certifications}></PersonalCertifications>
        )}
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
const PersonalCertifications: React.FC<{ certifications: Certification[] }> = (props) => {
  const [isOpenEditCertificationDialog, setIsOpenEditCertificationDialog] = React.useState<boolean>(false)
  const [editingCertification, setEditingCertification] = React.useState<Certification | null>(null)
  const onClose = () => {
    setIsOpenEditCertificationDialog(false)
  }
  const onEditCertification = (certification: Certification) => {
    setEditingCertification(certification)
    setIsOpenEditCertificationDialog(true)
  }
  return (
    <>
      <EditCertificationDialog
        isOpen={isOpenEditCertificationDialog}
        onClose={onClose}
        certification={editingCertification}
      ></EditCertificationDialog>
      {props.certifications.map((cert) => (
        <Stack
          key={cert.name}
          direction={'row'}
          spacing={1}
          position={'relative'}
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
              {cert.issuingOrganization.slice(0, 3)}
            </Typography>
          </Box>
          <Stack>
            <Typography fontWeight={'bold'}>{cert.name}</Typography>
            <Typography>{cert.issuingOrganization}</Typography>
            <Stack
              direction={'row'}
              color={grey[500]}
              spacing={2}
            >
              <Typography>{'Issued ' + cert?.issueDate?.toLocaleDateString()}</Typography>
              <Typography>{'Expires ' + cert?.issueDate?.toLocaleDateString()}</Typography>
            </Stack>
          </Stack>
          <Stack
            position={'absolute'}
            direction={'row'}
            right={0}
          >
            <Button
              onClick={() => {
                onEditCertification(cert)
              }}
              startIcon={<Edit />}
            >
              Chỉnh sửa
            </Button>
            <Button
              color='error'
              startIcon={<Delete />}
            >
              Xóa
            </Button>
          </Stack>
        </Stack>
      ))}
    </>
  )
}
