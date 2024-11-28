import React from 'react'
import grey from '@mui/material/colors/grey'
import blue from '@mui/material/colors/blue'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddCircle from '@mui/icons-material/AddCircle'
import Person from '@mui/icons-material/Person'
import { UserAccount } from '@/models'
import { EditDescriptionDiaglog } from './EditDescriptionDialog'
import PersonalInfoItem from './PersonalInfoItem'
import CreateCertificationDialog from './CreateCertificationDialog'
import PersonalCertifications from './PersonalCertifications'
import PersonalSkills from './PersonalSkills'
type PersonalInfoSectionProps = {
  user: UserAccount | null
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = (props) => {
  const [isOpenCreateCertificantionDialog, setIsOpenCreateCertificantionDialog] = React.useState<boolean>(false)
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
  const onCreateCertification = () => {
    setIsOpenCreateCertificantionDialog(true)
  }
  const onCloseCreateCertificationDialog = () => {
    setIsOpenCreateCertificantionDialog(false)
  }

  return (
    <Stack spacing={4}>
      <EditDescriptionDiaglog
        description={props.user?.selfDescription ?? ' '}
        isOpen={isOpenDescriptionDialog}
        onClose={closeDescriptionDialog}
      />
      <CreateCertificationDialog
        isOpen={isOpenCreateCertificantionDialog}
        onClose={onCloseCreateCertificationDialog}
      />
      <CreateCertificationDialog
        isOpen={false}
        onClose={() => {}}
      />
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
          ></PersonalSkills>
        )}
      </PersonalInfoItem>
      <PersonalInfoItem
        label='CHỨNG CHỈ'
        emptyLabel='Thêm các chứng chỉ mà bạn có giúp gây ấn tưởng với nhà tuyển dụng'
        isEditable
        onEdit={onCreateCertification}
      >
        {!props.user || !props.user.certifications || props.user.certifications.length === 0 ? null : (
          <PersonalCertifications certifications={props.user.certifications} />
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
