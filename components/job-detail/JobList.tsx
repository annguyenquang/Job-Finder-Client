import { Box, Card, CardContent, Divider, Grid2, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SchoolIcon from '@mui/icons-material/School';


export const JobList: React.FC = () => {
    const jobListings = [
        {
            title: "Tuyển sinh viên Bán Hàng xoay ca linh động",
            avatar: "https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/qBfrVeU5wVAfunKSH2WH004bDiWkG2O1_1709184279____b41b0027409b4c36f833508084ed0a1f.png",
            company: "TIẾN NGA JSC",
            location: "Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            salary: "5-8 Tr",
            education: "Tối thiểu Trung Học Cơ Sở",
            updated: "Cập nhật 4 ngày trước"
        },
        {
            title: "NV tư vấn bán hàng giờ hành chính",
            avatar: "https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/qBfrVeU5wVAfunKSH2WH004bDiWkG2O1_1709184279____b41b0027409b4c36f833508084ed0a1f.png",
            company: "TIẾN NGA JSC",
            location: "Quận Phú Nhuận, Thành phố Hồ Chí Minh",
            salary: "7,5-13 Tr",
            education: "Tối thiểu Trung Học Cơ Sở",
            updated: "Cập nhật 4 ngày trước"
        },
        {
            title: "Nhân viên kinh doanh",
            avatar: "https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/qBfrVeU5wVAfunKSH2WH004bDiWkG2O1_1709184279____b41b0027409b4c36f833508084ed0a1f.png",
            company: "CÔNG TY TNHH ĐẦU TƯ CÔNG NGHỆ FUTURELINK",
            location: "Quận Hai, Thành phố Hồ Chí Minh",
            salary: "7-15 Tr",
            education: "Tối thiểu Cao Đẳng",
            updated: "Cập nhật 18 ngày trước"
        }
    ];

    return (
        <Box>
            <Typography
                variant='h5'
                className='font-sans font-semibold text-black mb-4'
            >
                Công việc tương tự
            </Typography>
            {jobListings.map((job, index) => (
                <Grid2
                    spacing={2}
                    container
                    border={1}
                    key={index} className="flex flex-row rounded cursor-pointer text-gray-300 p-2 mb-4">
                    <Grid2
                        size={2}
                        className="flex flex-col"
                    >
                        <Box className="-mr-2">
                            <img
                                className='w-full h-full'
                                src={job.avatar}>
                            </img>
                        </Box>
                    </Grid2>
                    <Grid2
                        size={10}
                        className="flex flex-col"
                    >
                        <Typography className="text-base font-semibold text-black">{job.title}</Typography>
                        <Typography className="text-sm text-blue-500">{job.company}</Typography>
                        <Box className='flex flex-row items-center mt-1'>
                            <LocationOnIcon
                                className='text-gray-500 text-xs mr-1'>
                            </LocationOnIcon>
                            <Typography className="text-xs text-black">{job.location}</Typography>
                        </Box>
                        <Box className='flex flex-row items-center mt-1'>
                            <AttachMoneyIcon
                                className='text-gray-500 text-xs mr-1'>
                            </AttachMoneyIcon>
                            <Typography className="text-xs text-black">{job.salary}</Typography>
                        </Box>
                        <Box className='flex flex-row items-center mt-1'>
                            <SchoolIcon
                                className='text-gray-500 text-xs mr-1'>
                            </SchoolIcon>
                            <Typography className="text-xs text-black">{job.education}</Typography>
                        </Box>
                    </Grid2>
                    <Box className="flex flex-col w-full">
                        <Divider variant="fullWidth" />
                        <Typography variant="caption" className="text-gray-500 mt-2">{job.updated}</Typography>
                    </Box>

                </Grid2>
            ))}
        </Box>
    );
}