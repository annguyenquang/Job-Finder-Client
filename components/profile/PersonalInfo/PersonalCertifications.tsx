import { Certification } from '@/models'
import React from 'react'
import { EditCertificationDialog } from './EditCertificationDialog'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import grey from '@mui/material/colors/grey'
import Button from '@mui/material/Button'
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import { useAccountStore, useUserStore } from '@/stores'

const PersonalCertifications: React.FC<{ certifications: Certification[] }> = (props) => {
  const [isOpenEditCertificationDialog, setIsOpenEditCertificationDialog] = React.useState<boolean>(false)
  const [editingCertification, setEditingCertification] = React.useState<Certification | null>(null)
  const [certificationIndex, setCertificationIndex] = React.useState<number>(-1)

  const onEditCertification = (certification: Certification, index: number) => {
    setCertificationIndex(index)
    setEditingCertification(certification)
    setIsOpenEditCertificationDialog(true)
  }
  const onCloseEditCertificationDialog = () => {
    setIsOpenEditCertificationDialog(false)
  }

  const onDeleteCertification = async (index: number) => {
    const newCertifications = props.certifications.filter((_, idx) => idx !== index)
    await useUserStore.getState().updateCertifications(newCertifications)
    await useAccountStore.getState().loadAccountByJwt()
  }

  return (
    <>
      <EditCertificationDialog
        isOpen={isOpenEditCertificationDialog}
        onClose={onCloseEditCertificationDialog}
        index={certificationIndex}
        certification={editingCertification}
      />
      {props.certifications.map((cert, idx) => (
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
              <Typography>{'Issued ' + cert?.issueDate}</Typography>
              <Typography>{'Expires ' + cert?.expirationDate}</Typography>
            </Stack>
          </Stack>
          <Stack
            position={'absolute'}
            direction={'row'}
            right={0}
          >
            <Button
              onClick={() => {
                onEditCertification(cert, idx)
              }}
              startIcon={<Edit />}
            >
              Chỉnh sửa
            </Button>
            <Button
              color='error'
              startIcon={<Delete />}
              onClick={() => {
                onDeleteCertification(idx)
              }}
            >
              Xóa
            </Button>
          </Stack>
        </Stack>
      ))}
    </>
  )
}

export default PersonalCertifications
