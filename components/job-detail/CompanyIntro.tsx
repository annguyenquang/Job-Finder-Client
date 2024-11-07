import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

type CompanyInfoProps = {
    company: any,
}


export const CompanyIntro: React.FC<CompanyInfoProps> = (props) => {

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
                        alt=""
                        className='w-10 h-10 mr-4'
                        src={props.company.logo}>
                    </img>
                    <Box
                        className="flex flex-col"
                    >
                        <Typography
                            className='font-sans text-lg font-semibold text-black'
                        >
                            {props.company.name}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            className='font-sans'
                        >
                            {props.company.employeeCount} nhân viên
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
                    {props.company.address}
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