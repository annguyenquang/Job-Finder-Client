'use client'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { Banner, BasicBreadcrumb, CompanyInfo, ContactInfo, Share, Recruitment } from '@/components'
import { Box, Container, Grid2 } from '@mui/material'
import { useCompanyDetailStore, useJobStore } from '@/stores'

const Profile = () => {
  const { slug } = useParams()

  const companyDetailStore = useCompanyDetailStore()
  const jobStore = useJobStore()

  function getIdFromUrl(url: string) {
    // Sử dụng phương thức split để tách chuỗi bằng dấu '-'
    const parts = url.split('-')

    // Lấy phần tử cuối cùng trong mảng, đó chính là id
    const id = parts[parts.length - 1]

    return id
  }

  useEffect(() => {
    // Tải chi tiết công ty
    const loadComapanyDetail = async () => {
      companyDetailStore.loadCompanyDetail(slug as string)
    }

    // Tải jobs và sau đó hiển thị từng đối tượng job
    const loadJobs = async () => {
      const id = getIdFromUrl(slug as string)
      await jobStore.loadJobsByCompanyId(id) // Gọi loadJobs
    }

    loadComapanyDetail()
    loadJobs() // Gọi hàm bất đồng bộ
  }, [slug]) // Thêm slug vào dependency

  return (
    <Box className='flex flex-col min-h-screen'>
      <Container component='main' className='flex-grow p-5'>
        <BasicBreadcrumb
          currentPosition={`Thông tin công ty & tin tuyển dụng từ ${companyDetailStore.CompanyDetail.name}`}
        ></BasicBreadcrumb>
        <Banner
          avatar={companyDetailStore.CompanyDetail.avatar}
          name={companyDetailStore.CompanyDetail.name}
          employeeCount={companyDetailStore.CompanyDetail.employeeCount}
          website={companyDetailStore.CompanyDetail.website ?? ''}
        ></Banner>

        <Grid2 container spacing={2} className='mt-4'>
          <Grid2 size={8}>
            <CompanyInfo description={companyDetailStore.CompanyDetail.description}></CompanyInfo>
            <Recruitment jobs={jobStore.jobs} company={companyDetailStore.CompanyDetail}></Recruitment>
          </Grid2>
          <Grid2 size={4}>
            <ContactInfo address={companyDetailStore.CompanyDetail.address}></ContactInfo>
            <Share />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  )
}

export default Profile
