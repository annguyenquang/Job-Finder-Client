import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Box, Button, Card, CardContent } from '@mui/material';

export const CompanyIntro: React.FC = () => {
    const AVATAR = "https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/qBfrVeU5wVAfunKSH2WH004bDiWkG2O1_1709184279____b41b0027409b4c36f833508084ed0a1f.png"

    return (
        <Card className='mb-4'>
            <CardContent>
                <Typography
                    variant='h5'
                    className='font-sans font-semibold text-black mt-4 mb-4'
                >
                    Giới thiệu về công ty
                </Typography>
                <Box className="flex flex-row items-center">
                    <img
                        className='w-10 h-10 mr-4'
                        src={AVATAR}>
                    </img>
                    <Box
                        className="flex flex-col"
                    >
                        <Typography
                            className='font-sans text-lg font-semibold text-black'
                        >
                            NOUS BY SUN LIFE MIỀN NAM
                        </Typography>
                        <Typography
                            color="textSecondary"
                            className='font-sans'
                        >
                            200 nhân viên
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    className='font-sans text-lg font-semibold text-gray-600 mt-2 mb-2'
                >
                    Địa chỉ văn phòng
                </Typography>
                <Typography
                    className='font-sans text-lg text-black mb-2'
                >
                    Số 102C Nguyễn Văn Cừ, Phường Nguyễn Cư Trinh, Quận 1
                </Typography>
                <Box className='flex justify-center'>
                    <Button
                        className='w-full'
                        variant="outlined">
                        Xem công ty
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}