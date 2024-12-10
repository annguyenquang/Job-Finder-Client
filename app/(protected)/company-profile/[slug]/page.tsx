'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import { Banner, BasicBreadcrumb, CompanyInfo, ContactInfo, Share, Recruitment } from '@/components'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid2 from '@mui/material/Grid2'
import { useCompanyStore } from '@/stores'

const CompanyProfilePage = () => {
  const { slug } = useParams()
  const companyStore = useCompanyStore()

  React.useEffect(() => {
    companyStore.loadCompany(slug as string)
  }, [slug])

  return (
    <Box className='flex flex-col min-h-screen'>
      <Container
        component='main'
        className='flex-grow'
      >
        <BasicBreadcrumb
          currentPosition={`Thông tin công ty & tin tuyển dụng từ ${companyStore.company.name}`}
        ></BasicBreadcrumb>
        <Banner
          avatar={companyStore.company.logo}
          name={companyStore.company.name}
          employeeCount={companyStore.company.employeeCount}
          email={companyStore.company.emailContact}
          website={companyStore.company.website ?? ''}
        ></Banner>

        <Grid2
          container
          spacing={2}
          className='mt-4'
        >
          <Grid2 size={8}>
            <CompanyInfo description={companyStore.company.description}></CompanyInfo>
            <Recruitment company={companyStore.company}></Recruitment>
          </Grid2>
          <Grid2 size={4}>
            <ContactInfo
              address={companyStore.company.address}
              districtId={companyStore.company.districtId}
              provinceId={companyStore.company.provinceId}
            ></ContactInfo>
            <Share />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  )
}

export default CompanyProfilePage
