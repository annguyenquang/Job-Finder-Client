'use client'

import { Container, SelectChangeEvent, Typography } from '@mui/material'
import React from 'react'
import Pagination from '../../../components/common/Pagination'
import { useCompanyStore } from '@/stores'
import SearchBar from '../../../components/company-page/SearchBar'
import CompanyList from '../../../components/company-page/CompanyList'

const CompanyPage: React.FC = () => {
  const companyStore = useCompanyStore()
  const [location, setLocation] = React.useState<string>('TP. Hồ Chí Minh')
  const handleLocationChange = (event: SelectChangeEvent<string>) => {
    setLocation(event.target.value)
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= companyStore.total) {
      const updateParam = companyStore.reqParam
      updateParam.setPage(page)
      companyStore.updateParam(updateParam)
      companyStore.loadCompanies()
    }
  }

  React.useEffect(() => {
    companyStore.loadCompanies()
  }, [])

  return (
    <div>
      <Container maxWidth='lg'>
        <SearchBar {...{ location, handleChange: handleLocationChange }} />
        <Typography
          className='text-primary font-sans font-semibold'
          variant='h4'
        >
          Danh sách công ty
        </Typography>
        <CompanyList />
        <Pagination
          currentPage={companyStore.reqParam.pagination.page}
          totalPages={companyStore.total}
          onPageChange={handlePageChange}
        />
      </Container>
    </div>
  )
}

export default CompanyPage
