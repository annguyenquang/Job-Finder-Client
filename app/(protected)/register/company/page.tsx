'use client'

import React from 'react'
import { Box, Button, Stepper, Step, StepLabel, Typography, Container, TextField } from '@mui/material'
import { CompanyRegisterInfo } from '@/components'
import { CompanyService } from '@/services'
import { useRouter } from 'next/navigation'

type CompanyFormData = {
  name: string
  logo: File | null
  employeeCount: number
  website: string
  provinceId: number | null
  districtId: number | null
  phoneContact: string
  emailContact: string
  description: string
  address: string
  slug: string
  referralCode: string
  username: string
  password: string
  confirmPassword: string
}

enum RegisterCompanyStep {
  AccountInfo = 0,
  CompanyInfo = 1
}

const steps = ['Thông tin tài khoản', 'Thông tin công ty']

export default function RegisterCompanyPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = React.useState<RegisterCompanyStep>(RegisterCompanyStep.AccountInfo)
  const [formData, setFormData] = React.useState<CompanyFormData>({
    name: '',
    logo: null,
    employeeCount: 1,
    website: '',
    provinceId: null,
    districtId: null,
    address: '',
    emailContact: '',
    phoneContact: '',
    description: '',
    referralCode: '',
    username: '',
    password: '',
    slug: '',
    confirmPassword: ''
  })

  const handleSubmit = async () => {
    await CompanyService.createCompany({
      username: formData.username,
      password: formData.password,
      phone: formData.phoneContact,
      email: formData.emailContact,
      name: formData.name,
      emailContact: formData.emailContact,
      phoneContact: formData.phoneContact,
      description: formData.description,
      employeeCount: formData.employeeCount,
      address: formData.address,
      logoFile: formData.logo,
      provinceId: formData.provinceId?.toString() || '',
      districtId: formData.districtId?.toString() || '',
      website: formData.website,
      industry: '',
      slug: formData.slug
    })
    router.push('/login')
  }
  const setCompanyInfo = (data: Partial<CompanyFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }
  const handleNext = () => {
    if (activeStep === RegisterCompanyStep.CompanyInfo) {
      handleSubmit()
      return
    }

    if (!formData.username || !formData.password || !formData.confirmPassword) {
      alert('Vui lòng điền đầy đủ thông tin')
      return
    }

    if (formData.username.length < 8) {
      alert('Tên đăng nhập phải có ít nhất 8 ký tự')
      return
    }

    if (formData.password.length < 8) {
      alert('Mật khẩu phải có ít nhất 8 ký tự')
      return
    }

    if (activeStep === RegisterCompanyStep.AccountInfo) {
      if (formData.password !== formData.confirmPassword) {
        alert('Mật khẩu không khớp')
        return
      }
      setActiveStep(RegisterCompanyStep.CompanyInfo)
    }
  }

  return (
    <Box position={'relative'}>
      <Box
        display={'flex'}
        width={'100%'}
        justifyContent={'center'}
      >
        <Stepper
          activeStep={activeStep}
          sx={{ width: '50%' }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {activeStep === RegisterCompanyStep.CompanyInfo && (
        <CompanyRegisterInfo
          name={formData.name}
          logo={formData.logo}
          employeeCount={formData.employeeCount}
          website={formData.website}
          provinceId={formData.provinceId}
          districtId={formData.districtId}
          phoneContact={formData.phoneContact}
          emailContact={formData.emailContact}
          description={formData.description}
          address={formData.address}
          slug={formData.slug}
          referralCode={formData.referralCode}
          setCompanyInfo={setCompanyInfo}
          handleSubmit={handleSubmit}
        />
      )}
      {activeStep === RegisterCompanyStep.AccountInfo && (
        <Container
          maxWidth='md'
          sx={{ py: 4 }}
        >
          <Typography
            variant='h4'
            gutterBottom
          >
            Bắt đầu với thông tin tài khoản
          </Typography>
          <Typography
            variant='subtitle1'
            gutterBottom
            sx={{ color: 'text.secondary' }}
          >
            Bước đầu tiên để tạo tài khoản công ty của bạn
          </Typography>
          <Box>
            <TextField
              label='Tên đăng nhập'
              variant='outlined'
              fullWidth
              margin='normal'
              value={formData.username}
              onChange={(e) => setCompanyInfo({ username: e.target.value })}
            />
            <TextField
              label='Mật khẩu'
              variant='outlined'
              fullWidth
              margin='normal'
              type='password'
              value={formData.password}
              onChange={(e) => setCompanyInfo({ password: e.target.value })}
            />
            <TextField
              label='Nhập lại mật khẩu'
              variant='outlined'
              fullWidth
              margin='normal'
              type='password'
              value={formData.confirmPassword}
              onChange={(e) => setCompanyInfo({ confirmPassword: e.target.value })}
            />
          </Box>
        </Container>
      )}

      <Box
        bgcolor={'background.paper'}
        position={'fixed'}
        bottom={0}
        display={'flex'}
        justifyContent={'center'}
        width={'100%'}
        boxShadow={4}
        padding={1}
      >
        <Box sx={{ width: '50%', display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button
            disabled={activeStep === RegisterCompanyStep.AccountInfo}
            variant='outlined'
            onClick={() => setActiveStep(RegisterCompanyStep.AccountInfo)}
          >
            Quay lại
          </Button>
          <Button
            variant='contained'
            type='submit'
            color='primary'
            onClick={handleNext}
          >
            {activeStep === RegisterCompanyStep.CompanyInfo ? 'Hoàn thành' : 'Tiếp theo'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
