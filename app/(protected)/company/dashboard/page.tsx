'use client'
import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Tab,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  IconButton,
  Container,
  Pagination,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Search,
  AccessTime,
  LocationOn,
  CalendarToday,
  Warning,
  SwapVert,
  Add,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import Image from 'next/image';
import { useAccountStore, useJobsByCompanyStore, useLocationStore, useMetadataStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { LocationService, Province } from '@/services';
import { CompanyAccount, Job } from '@/models';
import Link from 'next/link';

const formatCurrency = (amount: number) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ"; // Định dạng số tiền
};

const CompanyPage = () => {
  const accountStore = useAccountStore();
  const jobsByCompanyStore = useJobsByCompanyStore();
  const metadataStore = useMetadataStore()
  const router = useRouter()
  const locationStore = useLocationStore()
  const companyAccount = accountStore.account as CompanyAccount;

  const [currentPage, setCurrentPage] = React.useState(1)
  const jobsPerPage = 4
  const [jobProvinces, setJobProvinces] = React.useState<{ [key: number]: Province }>({})
  const [searchKeyword, setSearchKeyword] = React.useState('')
  const [searchInput, setSearchInput] = useState('');

  React.useEffect(() => {
    if (!accountStore.account) {
      accountStore.loadAccountByJwt();
    }
  }, [])

  React.useEffect(() => {
    const pagination = { page: currentPage, pageSize: jobsPerPage }
    if (accountStore.account) {
      jobsByCompanyStore.loadAllJobs(accountStore.account.id, pagination)
    }
  }, [currentPage, accountStore.account?.id, jobsByCompanyStore.keyword, jobsByCompanyStore.provinceId])

  React.useEffect(() => {
    const pagination = { page: currentPage, pageSize: jobsPerPage }
    if (accountStore.account) {
      jobsByCompanyStore.loadOpenJobs(accountStore.account.id, pagination)
    }
  }, [currentPage, accountStore.account?.id,])

  React.useEffect(() => {
    const pagination = { page: currentPage, pageSize: jobsPerPage }
    if (accountStore.account) {
      jobsByCompanyStore.loadClosedJobs(accountStore.account.id, pagination)
    }
  }, [currentPage, accountStore.account?.id,])

  React.useEffect(() => {
    console.log(jobsByCompanyStore.loadClosedJobs)
  }, [jobsByCompanyStore.loadClosedJobs])

  React.useEffect(() => {
    locationStore.loadAllProvince()
    const fetchProvinces = async () => {
      const provinces: { [key: number]: Province } = {}
      for (const job of jobsByCompanyStore.allJobs) {
        const fetchedProvince = await LocationService.getProvinceById(job.provinceId)
        provinces[job.provinceId] = fetchedProvince || { name: '', code: 0, districts: [] }
      }
      setJobProvinces(provinces)
    }
    fetchProvinces()
  }, [jobsByCompanyStore.allJobs])

  const [tabValue, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleCreateJob = () => {
    router.push('/create-job');
  }

  // Hàm xử lý thay đổi trang
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const handleSearch = () => {
    setCurrentPage(1);
    jobsByCompanyStore.setSearchKeyword(searchInput);

    const pagination = { page: 1, pageSize: jobsPerPage };
    if (accountStore.account) {
      switch (tabValue) {
        case '1':
          jobsByCompanyStore.loadAllJobs(accountStore.account.id, pagination);
          break;
        case '2':
          jobsByCompanyStore.loadOpenJobs(accountStore.account.id, pagination);
          break;
        case '3':
          jobsByCompanyStore.loadClosedJobs(accountStore.account.id, pagination);
          break;
      }
    }
  };

  const handleRefresh = () => {
    setSearchInput('');
    jobsByCompanyStore.setSearchKeyword('');
    const pagination = { page: currentPage, pageSize: jobsPerPage };
    if (accountStore.account) {
      switch (tabValue) {
        case '1':
          jobsByCompanyStore.loadAllJobs(accountStore.account.id, pagination);
          break;
        case '2':
          jobsByCompanyStore.loadOpenJobs(accountStore.account.id, pagination);
          break;
        case '3':
          jobsByCompanyStore.loadClosedJobs(accountStore.account.id, pagination);
          break;
      }
    }
  };

  const JobCard = ({ jobs }: { jobs: Job[] }) => (
    <Box>
      {jobs.length > 0 ? (
        jobs.map((job: any) => (
          <Card variant="outlined" className="border-gray-300 mb-4">
            <CardContent>
              <Box className="flex justify-between mb-4">
                <Link
                  href={`/job-detail/${job.id}`}
                >
                  <Typography variant="h6" className="font-semibold hover:underline hover:text-blue-500" >
                    {job.title}
                  </Typography>
                </Link>
                <Typography className={`${job.status == 1 ? 'text-colorPrimaryText' : 'text-red-500'}`}>
                  {job.status == 1 ? "Đang mở" : "Đã đóng"}
                </Typography>
              </Box>

              <Box className="flex justify-between">
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} className="items-center">
                    <AccessTime fontSize="small" className="text-gray-500" />
                    <Typography>{formatCurrency(job?.salary || 0)}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} className="items-center">
                    <LocationOn fontSize="small" className="text-gray-500" />
                    <Typography>
                      {jobProvinces[job.provinceId]?.name || 'Đang tải...'}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} className="items-center">
                    <CalendarToday fontSize="small" className="text-gray-500" />
                    <Typography>
                      Tạo ngày: {new Date(job.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' })} {/* Updated formatting */}
                    </Typography>
                  </Stack>
                </Stack>

                <Box className="border rounded-lg flex">
                  <Stack className="p-4 text-center min-w-[120px]">
                    <Typography variant="h6">0</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Bắt đầu chat
                    </Typography>
                    <Button color="primary">Xem</Button>
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack className="p-4 text-center min-w-[120px]">
                    <Typography variant="h6">0</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Đang cần nhắc
                    </Typography>
                    <Button color="primary">Xem</Button>
                  </Stack>
                  <Divider orientation="vertical" flexItem />
                  <Stack className="p-4 text-center min-w-[120px]">
                    <Typography variant="h6">0</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Không phù hợp
                    </Typography>
                    <Button color="primary">Xem</Button>
                  </Stack>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant='body2'>Không có công việc nào được tìm thấy.</Typography>
      )}
    </Box>
  )

  return (
    <Container maxWidth="lg" className="py-6">
      {/* Company Info Card */}
      <Card variant="outlined" className="mb-4">
        <CardContent>
          <Box className="flex justify-between items-center">
            <Stack direction="row" spacing={2} className="items-center">
              <Image
                src={companyAccount?.logo}
                alt="Company logo"
                width={100}
                height={100}
                className="rounded"
              />
              <Stack spacing={1}>
                <Typography variant="h5" className="font-bold">
                  {companyAccount?.name}
                </Typography>
                <Stack direction="row" spacing={1} className="items-center">
                  <Typography className="text-green-500">
                    Đã xác minh
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Link
              href={`/company-profile/${companyAccount?.slug}`}
            >
              <Button
                variant="outlined"
                className="font-medium"
                size="small"
              >
                Chỉnh sửa hồ sơ công ty
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>

      {/* Job List Card */}
      <Card variant="outlined">
        <CardContent>
          <Box className="mb-6 flex justify-between items-center">
            <Typography variant="h6" className="font-bold">
              Danh sách tin
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateJob}
              startIcon={<Add />}
              size="medium"
            >
              Đăng tin tuyển dụng
            </Button>
          </Box>

          {/* Updated Search and Sort */}
          <Box className="flex justify-between mb-4">
            <Box className="flex gap-2 w-1/2">
              <TextField
                placeholder="Nhập tên vị trí ứng tuyển"
                variant="outlined"
                size="small"
                className="flex-grow"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                onClick={handleSearch}
                size="small"
              >
                Tìm kiếm
              </Button>
              <IconButton
                onClick={handleRefresh}
                size="small"
                className="border border-gray-300"
              >
                <RefreshIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Tabs */}
          <TabContext value={tabValue}>
            <Box className="border-b">
              <TabList onChange={handleChange} className="border-b-0">
                <Tab
                  label={
                    <Box className="flex items-center">
                      Tất cả công việc <Typography className="ml-1 text-gray-500">({jobsByCompanyStore.totalAllJobs})</Typography>
                    </Box>
                  }
                  value="1"
                />
                <Tab
                  label={
                    <Box className="flex items-center">
                      Công việc đang mở <Typography className="ml-1 text-gray-500">({jobsByCompanyStore.totalOpenJobs})</Typography>
                    </Box>
                  }
                  value="2"
                />
                <Tab
                  label={
                    <Box className="flex items-center">
                      Công việc hết hạn <Typography className="ml-1 text-gray-500">({jobsByCompanyStore.totalClosedJobs})</Typography>
                    </Box>
                  }
                  value="3"
                />
              </TabList>
            </Box>

            {/* All Jobs Tab */}
            <TabPanel value="1" className="px-0">
              <JobCard jobs={jobsByCompanyStore.allJobs} />
              {/* Pagination */}
              <Box
                mt={3}
                className='flex justify-center'
              >
                <Pagination
                  count={Math.ceil(jobsByCompanyStore.totalAllJobs / jobsPerPage)} // Tính tổng số trang
                  page={currentPage} // Trang hiện tại
                  onChange={handlePageChange} // Xử lý thay đổi trang
                  variant='outlined'
                  size='large'
                  shape='rounded'
                />
              </Box>
            </TabPanel>

            {/* Open Jobs Tab */}
            <TabPanel value="2" className="px-0">
              <JobCard jobs={jobsByCompanyStore.openJobs} />
              {/* Pagination */}
              <Box
                mt={3}
                className='flex justify-center'
              >
                <Pagination
                  count={Math.ceil(jobsByCompanyStore.totalOpenJobs / jobsPerPage)} // Tính tổng số trang
                  page={currentPage} // Trang hiện tại
                  onChange={handlePageChange} // Xử lý thay đổi trang
                  variant='outlined'
                  size='large'
                  shape='rounded'
                />
              </Box>
            </TabPanel>

            {/* Expired Jobs Tab */}
            <TabPanel value="3" className="px-0">
              <JobCard jobs={jobsByCompanyStore.closedJobs} />
              {/* Pagination */}
              <Box
                mt={3}
                className='flex justify-center'
              >
                <Pagination
                  count={Math.ceil(jobsByCompanyStore.totalClosedJobs / jobsPerPage)} // Tính tổng số trang
                  page={currentPage} // Trang hiện tại
                  onChange={handlePageChange} // Xử lý thay đổi trang
                  variant='outlined'
                  size='large'
                  shape='rounded'
                />
              </Box>
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CompanyPage;