import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Card, CardContent, Grid2, IconButton } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'; type BannerProps = {

}

export const JobBanner: React.FC = () => {
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
                    Premier Life Consultant
                </Typography>
                <Box className='flex flex-row items-center mt-6'>
                    <AttachMoneyIcon
                        fontSize='medium'
                        className='text-colorPimaryText mr-1 font-semibold'>
                    </AttachMoneyIcon>
                    <Typography
                        className='font-sans font-semibold text-lg text-colorPimaryText'>
                        12-18 Tr/Tháng
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
                            {'<1 năm'}
                        </Typography>
                    </Box>
                    <Box className='flex flex-row items-center'>
                        <SchoolIcon
                            fontSize='medium'
                            className='text-colorPimaryText mr-1 font-semibold'>
                        </SchoolIcon>
                        <Typography
                            className='font-sans text-lg text-white'>
                            Tối thiểu Cao Đẳng
                        </Typography>
                    </Box>
                </Box>
                <Box className='flex flex-row items-center mt-1'>
                    <LocationOnIcon
                        fontSize='medium'
                        className='text-colorPimaryText mr-1 font-semibold'>
                    </LocationOnIcon>
                    <Typography
                        className='font-sans text-lg text-white'>
                        Quận Một, Thành phố Hồ Chí Minh  ·  Làm tại công ty  ·  Việc làm fulltime
                    </Typography>
                </Box>
                <Typography
                    className='font-sans text-base text-green-400 mt-1 mb-6'>
                    Cập nhật 16 ngày trước
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
