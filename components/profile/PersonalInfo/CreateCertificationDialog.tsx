import { Certification, UserAccount } from '@/models'
import CertificationDialog from './CertificationDialog'
import { useAccountStore, useUserStore } from '@/stores'

type CreateCertificationDialogProps = {
  isOpen: boolean
  onClose: () => void
}
const CreateCertificationDialog: React.FC<CreateCertificationDialogProps> = (props) => {
  const onSave = async (certification: Certification) => {
    const user = useAccountStore.getState().account as UserAccount
    await useUserStore.getState().updateCertifications(user.certifications.concat(certification))
    await useAccountStore.getState().loadAccountByJwt()
    props.onClose()
  }
  return (
    <CertificationDialog
      title='Thêm chứng chỉ'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSave={onSave}
      certification={null}
      index={null}
    />
  )
}

export default CreateCertificationDialog
