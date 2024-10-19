import * as React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Grid2 from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { CompanyDetail, Job } from 'core/models';


type RecruitmentProps = {
    jobs: Job[];
    company: CompanyDetail;
};

export const Recruitment: React.FC<RecruitmentProps> = ({ jobs, company }) => {
    const [province, setProvince] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);  // Trang hiện tại
    const jobsPerPage = 3;  // Số lượng công việc mỗi trang

    // Hàm xử lý thay đổi trang
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    // Hàm tính toán phần tử bắt đầu và kết thúc trên mỗi trang
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob); // Lấy dữ liệu công việc hiện tại

    const handleChange = (event: SelectChangeEvent) => {
        setProvince(event.target.value);
    };

    return (
        <Card className="flex flex-col mb-4">
            <Box className="bg-gradient-to-r from-colorStartBanner to-colorEndBanner">
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
                        />
                    </Grid2>
                    <Grid2 size={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tỉnh</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={province}
                                label="Tỉnh"
                                onChange={handleChange}
                            >
                                <MenuItem disabled value="">
                                    <em>Tất cả tỉnh, thành phố</em>
                                </MenuItem>
                                {names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={3}>
                        <Button
                            className="text-white bg-green-500 font-medium items-center"
                            size="large"
                            variant="contained"
                            startIcon={<SearchIcon className="text-white" />}
                            style={{ textTransform: 'none' }}
                        >
                            Tìm kiếm
                        </Button>
                    </Grid2>
                </Grid2>

                {/* Displaying paginated job information */}
                <Box mt={3}>
                    {currentJobs.length > 0 ? (
                        currentJobs.map((job) => (
                            <Card key={job.id} className="mb-4 bg-green-100">
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
                                                    src={company.avatar}
                                                    className="border-4 w-20 h-20 border-white"
                                                />
                                            </Grid2>
                                            <Grid2 size={7}>
                                                <Typography variant="body1" className="font-semibold">
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
                                                    className="bg-slate-200 text-gray-600 font-bold inline-block p-1 mr-3 rounded-md"
                                                >
                                                    {job.location}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    className="bg-slate-200 text-gray-600 inline-block p-1 m-0 rounded"
                                                >
                                                    Ứng tuyển đến hết <b>{job.closeDate}</b>
                                                </Typography>
                                            </Grid2>
                                            <Grid2
                                                size={3}
                                                className="flex justify-start items-end flex-col"
                                            >
                                                <Typography
                                                    variant="body1"
                                                    className="mb-10 font-semibold text-green-500"
                                                >
                                                    Tối đa {job.salary} Triệu
                                                </Typography>

                                                <Button
                                                    className="text-white bg-green-500 font-medium items-center"
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
                        count={Math.ceil(jobs.length / jobsPerPage)}  // Tính tổng số trang
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

const names = [
    'TP. Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Bình Dương',
    'Bà Rịa - Vũng Tàu',
    'Đồng Nai',
    'Hải Phòng',
    'Cần Thơ',
    'Quảng Ninh',
    'Khánh Hòa',
    'Long An',
    'Bắc Ninh',
    'Hải Dương',
    'Thanh Hóa',
    'Nghệ An',
    'Quảng Nam',
    'Thừa Thiên Huế',
    'Lâm Đồng',
    'Tiền Giang',
    'Vĩnh Phúc',
    'Bình Thuận',
    'Quảng Ngãi',
    'Phú Yên',
    'Bắc Giang',
    'Hưng Yên',
    'Phú Thọ',
    'Hà Nam',
    'Bến Tre',
    'Kiên Giang',
    'Sóc Trăng',
    'An Giang',
    'Cà Mau',
    'Hậu Giang',
    'Tây Ninh',
    'Bạc Liêu',
    'Trà Vinh',
    'Đồng Tháp',
    'Lạng Sơn',
    'Lào Cai',
    'Điện Biên',
    'Sơn La',
    'Hòa Bình',
    'Tuyên Quang',
    'Yên Bái',
    'Lai Châu',
    'Kon Tum',
    'Gia Lai',
    'Đắk Lắk',
    'Đắk Nông',
    'Quảng Trị',
    'Bình Phước',
    'Ninh Thuận',
    'Bình Định',
    'Quảng Bình',
    'Ninh Bình',
    'Nam Định',
    'Hà Tĩnh',
    'Cao Bằng',
    'Bắc Kạn',
];