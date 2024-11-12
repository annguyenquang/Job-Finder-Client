import * as React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid2 from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Company } from '@/models';
import { useCreateJobStore, useJobStore, useLocationStore } from '@/stores';
import { useEffect } from 'react';
import { LocationService, Province } from '@/services';
import { Autocomplete, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


type RecruitmentProps = {
    company: Company;
};

export const Recruitment: React.FC<RecruitmentProps> = ({ company }) => {
    const [province, setProvince] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [jobProvinces, setJobProvinces] = React.useState<{ [key: number]: Province }>({});
    const jobsPerPage = 4; // Số công việc trên mỗi trang
    const jobStore = useJobStore();
    const locationStore = useLocationStore();
    const createJobStore = useCreateJobStore();
    const [searchKeyword, setSearchKeyword] = React.useState('');


    // Hàm xử lý thay đổi trang
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    // Gọi loadJobs khi currentPage hoặc từ khóa tìm kiếm thay đổi
    useEffect(() => {
        const pagination = { page: currentPage, pageSize: jobsPerPage };
        jobStore.loadJobs(company.id, pagination);
    }, [currentPage, company.id, jobStore.keyword, jobStore.provinceId]);

    useEffect(() => {
        locationStore.loadAllProvince();
        const fetchProvinces = async () => {
            const provinces: { [key: number]: Province } = {};
            for (const job of jobStore.jobs) {
                const fetchedProvince = await LocationService.getProvinceById(job.provinceId);
                provinces[job.provinceId] = fetchedProvince || { name: '', code: 0, districts: [] };
            }
            setJobProvinces(provinces);
        };
        fetchProvinces();
    }, [jobStore.jobs]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchKeyword(value);
        jobStore.keyword = value;
        setCurrentPage(1);
        jobStore.loadJobs(company.id, { page: 1, pageSize: jobsPerPage });
    };

    const handleRefresh = () => {
        setProvince('');
        setSearchKeyword('');
        jobStore.keyword = '';
        jobStore.provinceId = 0;
        setCurrentPage(1);
        jobStore.loadJobs(company.id, { page: 1, pageSize: jobsPerPage });
    };

    const handleProvinceChange = (event: React.SyntheticEvent, newValue: Province | string | null) => {
        const code = (newValue as Province)?.code || 0;
        setProvince((newValue as Province)?.name || '');
        jobStore.provinceId = code;
        setCurrentPage(1);
        jobStore.loadJobs(company.id, { page: 1, pageSize: jobsPerPage });
    };

    const handleProvinceInputChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
        setProvince(newInputValue);
        if (!newInputValue) {
            jobStore.provinceId = 0;
            setCurrentPage(1);
            jobStore.loadJobs(company.id, { page: 1, pageSize: jobsPerPage });
        }
    };


    return (
        <Card className="flex flex-col mb-4">
            <Box className="bg-colorPrimary">
                <Typography variant="h6" className="font-medium p-3 text-white">
                    Tuyển dụng
                </Typography>
            </Box>
            <CardContent>
                <Grid2 container spacing={3}>
                    <Grid2 size={5}>
                        <TextField
                            id="outlined-basic"
                            label="Tên công việc, vị trí ứng tuyển..."
                            fullWidth
                            variant="outlined"
                            value={searchKeyword}
                            onChange={handleSearchChange}
                        />
                    </Grid2>
                    <Grid2 size={4}>
                        {
                            locationStore.allProvince &&
                            <Autocomplete
                                freeSolo
                                options={locationStore.allProvince || []} // Use an empty array if undefined
                                getOptionLabel={(option) => (typeof option === 'string' ? option : option.name) || ''}
                                isOptionEqualToValue={(option, value) => option.code === (value as Province)?.code}
                                className="w-60 -ml-1"
                                value={locationStore.allProvince?.find((province) => province.code === createJobStore.jobData.provinceId) || null}
                                onChange={handleProvinceChange}
                                inputValue={province}
                                onInputChange={handleProvinceInputChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tỉnh/Thành phố"
                                        size="medium"
                                        className="text-sm pb-4"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />

                        }
                    </Grid2>
                    <Grid2 size={3}>
                        <Button
                            className="text-white bg-colorPrimaryText font-medium items-center"
                            size="large"
                            variant="contained"
                            startIcon={<RefreshIcon className="text-white" />}
                            style={{ textTransform: 'none' }}
                            onClick={handleRefresh}
                        >
                            Làm mới
                        </Button>
                    </Grid2>
                </Grid2>

                {/* Displaying paginated job information */}
                <Box mt={3}>
                    {jobStore.jobs.length > 0 ? (
                        jobStore.jobs.map((job) => (
                            <Card key={job.id} className="mb-4 bg-blue-100">
                                <CardContent>
                                    <Box key={job.id}>
                                        <Grid2 spacing={3} container>
                                            <Grid2
                                                size={2}
                                                padding={2}
                                                className="flex justify-center rounded shadow-md bg-white items-center"
                                            >
                                                <Avatar
                                                    alt="avatar"
                                                    src={company.logo}
                                                    className="border-4 w-20 h-20 border-white"
                                                />
                                            </Grid2>
                                            <Grid2 size={7}>
                                                <Typography variant="body1" className="text-colorPrimary font-semibold">
                                                    {job.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    className="mb-8"
                                                >
                                                    {company.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    className="bg-slate-200 shadow-md text-gray-600 font-bold inline-block p-1 mr-3 rounded-md"
                                                >
                                                    {jobProvinces[job.provinceId]?.name || 'Đang tải...'}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    className="bg-slate-200 shadow-md text-gray-600 inline-block p-1 m-0 rounded"
                                                >
                                                    Ngày ngừng ứng tuyển <b>{new Date(job.closeDate).toLocaleDateString('Vi-VN')}</b>
                                                </Typography>
                                            </Grid2>
                                            <Grid2
                                                size={3}
                                                className="flex justify-start items-end flex-col"
                                            >
                                                <Typography
                                                    variant="body1"
                                                    className="mb-10 font-semibold text-colorPrimary"
                                                >
                                                    Tối đa {job.salary} Triệu
                                                </Typography>

                                                <Button
                                                    className="text-white bg-colorPrimaryText font-medium items-center"
                                                    size="medium"
                                                    variant="contained"
                                                    style={{ textTransform: 'none' }}
                                                >
                                                    Ứng tuyển
                                                </Button>
                                            </Grid2>
                                        </Grid2>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body2">Không có công việc nào được tìm thấy.</Typography>
                    )}
                </Box>

                {/* Pagination */}
                <Box mt={3} className="flex justify-center">
                    <Pagination
                        className='bg-blue-50'
                        count={Math.ceil(jobStore.totalJobs / jobsPerPage)}  // Tính tổng số trang
                        page={currentPage}  // Trang hiện tại
                        onChange={handlePageChange}  // Xử lý thay đổi trang
                        variant="outlined"
                        size="large"
                        shape="rounded"
                    />
                </Box>
            </CardContent>
        </Card>
    );
};