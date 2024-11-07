import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Job } from '@/models';
import { District, LocationService, Province } from '@/services';

type BannerProps = {
    job: Job,
    educationLevel: string,
    commitmentType: string
    workExperienceRequirement: string
    workArrangement: string
}

export const JobBanner: React.FC<BannerProps> = (props) => {
    const [district, setDistrict] = React.useState<District>();
    const [province, setProvince] = React.useState<Province>();

    React.useEffect(() => {
        const fetchProvince = async () => {
            const fetchedProvince = await LocationService.getProvinceById(props.job.provinceId);
            if (fetchedProvince) {
                setProvince(fetchedProvince);
            }
        };
        fetchProvince();
    }, [props.job.provinceId]);

    React.useEffect(() => {
        const fetchDistrict = async () => {
            const fetchedDistrict = await LocationService.getDistrictById(props.job.districtId);
            if (fetchedDistrict) {
                setDistrict(fetchedDistrict);
            }
        };
        fetchDistrict();
    }, [props.job.districtId]);
    return (
        <Grid2
            container
            spacing={2}
            className="m-0"
        >
            <Grid2
                size={7}
            >
                <Typography className='font-bold font-sans text-white mt-4'
                    variant="h4"
                >
                    {props.job.title}
                </Typography>
                <Box className='flex flex-row items-center mt-6'>
                    <AttachMoneyIcon
                        fontSize='medium'
                        className='text-colorPimaryText mr-1 font-semibold'>
                    </AttachMoneyIcon>
                    <Typography
                        className='font-sans font-semibold text-lg text-colorPimaryText'>
                        {props.job.salary} Tr/Tháng
                    </Typography>
                </Box>
                <Box className='flex flex-row items-center mt-1'>
                    <Box className='flex flex-row items-center mr-6'>
                        <BusinessCenterIcon
                            fontSize='medium'
                            className='text-colorPimaryText mr-1 font-semibold'>
                        </BusinessCenterIcon>
                        <Typography
                            className='font-sans text-lg text-white'>
                            {props.workExperienceRequirement}
                        </Typography>
                    </Box>
                    <Box className='flex flex-row items-center'>
                        <SchoolIcon
                            fontSize='medium'
                            className='text-colorPimaryText mr-1 font-semibold'>
                        </SchoolIcon>
                        <Typography
                            className='font-sans text-lg text-white'>
                            {props.educationLevel}
                        </Typography>
                    </Box>
                </Box>
                <Box className='flex flex-row items-center mt-1'>
                    <LocationOnIcon
                        fontSize='medium'
                        className='text-colorPimaryText mr-1 font-semibold'>
                    </LocationOnIcon>
                    <Typography className="font-sans text-lg text-white">
                        {district?.name ?? ''}, {province?.name ?? ''} · {props.workArrangement} · Việc làm {props.commitmentType}
                    </Typography>
                </Box>
                <Typography
                    className='font-sans text-base text-green-400 mt-1 mb-6'>
                    Cập nhật {props.job.createdAt ? Math.ceil((new Date().getTime() - new Date(props.job.createdAt).getTime()) / (1000 * 3600 * 24)) : 'N/A'} ngày trước
                </Typography>
            </Grid2>
            <Grid2
                size={5}
                className="flex justify-end items-end p-4"
            >
                <Box className="flex flex-row justify-end items-center">
                    <IconButton >
                        <BookmarkBorderIcon
                            fontSize="large"
                            className="text-white"
                        >
                        </BookmarkBorderIcon>
                    </IconButton>
                    <IconButton className="mr-4">
                        <ShareOutlinedIcon
                            fontSize="large"
                            className="text-white"
                        >
                        </ShareOutlinedIcon>
                    </IconButton>
                    <Button className='text-white bg-orange-600 pt-2 pb-2 pl-4 pr-4 font-bold '
                        size="medium"
                        variant="contained"
                    >
                        Ứng tuyển nhanh
                    </Button>
                </Box>
            </Grid2>
        </Grid2>
    );
}
