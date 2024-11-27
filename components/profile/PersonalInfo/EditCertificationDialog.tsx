import React from 'react'
import { Certification, UserAccount } from '@/models'
import CertificationDialog from './CertificationDialog'
import { useAccountStore, useUserStore } from '@/stores'

export const EditCertificationDialog: React.FC<{
  isOpen: boolean
  onClose: () => void
  certification: Certification | null
  index: number
}> = (props) => {
  const onClose = () => {
    props.onClose()
  }
  const onSave = async (newCertification: Certification) => {
    const user = useAccountStore.getState().account as UserAccount
    const newCertifications = user.certifications.filter((_, index) => index !== props.index).concat(newCertification)
    await useUserStore.getState().updateCertifications(newCertifications)
    await useAccountStore.getState().loadAccountByJwt()
    onClose()
  }

  return (
    <CertificationDialog
      title='Chỉnh sửa chứng chỉ'
      isOpen={props.isOpen}
      onSave={onSave}
      onClose={onClose}
      certification={props.certification}
      index={props.index}
    ></CertificationDialog>
  )
}
