import {
  CompanyDescription,
  CompanyLogo,
  CompanySize,
  CompanyWebsite,
  ProvinceAndDistrictInput,
  ReferralCode
} from '@/components'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { CompanyEmailContact } from './CompanyEmailContact'
import { CompanyPhoneContact } from './CompanyPhoneContact'

type CompanyRegisterInfoProps = {
  logo: File | null
  employeeCount: number
  website: string
  provinceId: number | null
  districtId: number | null
  phoneContact: string
  emailContact: string
  description: string
  address: string
  referralCode: string
  setCompanyInfo: (data: CompanyRegisterInfoProps) => void
  handleSubmit: (e: React.FormEvent) => void
}

export const CompanyRegisterInfo: React.FC<CompanyRegisterInfoProps> = (props) => {
  return (
    <Container
      maxWidth='md'
      sx={{ py: 4 }}
    >
      <Typography
        variant='h4'
        gutterBottom
      >
        Đăng ký tài khoản công ty
      </Typography>
      <Typography
        variant='subtitle1'
        gutterBottom
        sx={{ color: 'text.secondary' }}
      >
        Xây dựng hồ sơ hoàn chỉnh cho công ty của bạn để thu hút nhiều ứng viên hơn. Bạn có thể cập nhật lại sau.
      </Typography>

      <Box
        component='form'
        onSubmit={props.handleSubmit}
        sx={{ mt: 4 }}
      >
        <CompanyLogo
          value={props.logo}
          onChange={(logo) => props.setCompanyInfo({ ...props, logo })}
        />

        <CompanySize
          value={props.employeeCount}
          onChange={(employeeCount) => props.setCompanyInfo({ ...props, employeeCount })}
        />

        <CompanyWebsite
          value={props.website}
          onChange={(website) => props.setCompanyInfo({ ...props, website })}
        />

        <CompanyDescription
          description={props.description}
          setDescription={(description) => props.setCompanyInfo({ ...props, description })}
        />

        <CompanyEmailContact
          value={props.emailContact}
          onChange={(emailContact) => props.setCompanyInfo({ ...props, emailContact })}
        />

        <CompanyPhoneContact
          value={props.phoneContact}
          onChange={(phoneContact) => props.setCompanyInfo({ ...props, phoneContact })}
        />

        <Box mt={2}>
          <Typography mb={1}>Địa chỉ</Typography>
          <ProvinceAndDistrictInput
            provinceId={props.provinceId}
            districtId={props.districtId}
            setProvinceId={(provinceId) => props.setCompanyInfo({ ...props, provinceId })}
            setDistrictId={(districtId) => props.setCompanyInfo({ ...props, districtId })}
          />
          <TextField
            value={props.address}
            onChange={(e) => props.setCompanyInfo({ ...props, address: e.target.value })}
            fullWidth
            sx={{ ml: 1 }}
            placeholder='499 Hoàng Quốc Việt, Cầu Giấy, Hà Nội'
            label='Địa chỉ cụ thể'
            size='small'
          ></TextField>
        </Box>

        <ReferralCode
          value={props.referralCode}
          onChange={(code) => props.setCompanyInfo({ ...props, referralCode: code })}
        />
      </Box>
    </Container>
  )
}
