import * as React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid2 from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import AddIcon from '@mui/icons-material/Add';
import LanguageIcon from '@mui/icons-material/Language';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box';


type BannerProps = {
    avatar: string,
    name: string,
    employeeCount: number,
    website: string,
    email: string,
}

export const Banner: React.FC<BannerProps> = (props: BannerProps) => {
    const BANNER_IMAGE = 'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/184125/Originals/bo-suu-tap-background-xanh-duong-1.png'
    return (
        <Card className="bg-white shadow-md rounded-lg mt-5 relative">
            <CardMedia
                className='h-full min-h-64'
                image={BANNER_IMAGE}
                title="green iguana"
            />
            <Avatar
                alt="avatar"
                src={props.avatar}
                className='w-44 h-44 absolute left-10 top-40 border-4 border-white'
            />
            <Box className='flex-1 bg-colorPrimary'>
                <CardContent className='ml-60'>
                    <Grid2 container spacing={2}>
                        <Grid2 size={9}>
                            <Typography className='font-semibold font-sans text-white mt-4'
                                gutterBottom variant="h5"
                                component="div">
                                {props.name}
                            </Typography>
                            <Grid2 container spacing={1}
                                className="ml-4 mt-4">
                                <Grid2 className="flex flex-row justify-center text-white mr-6">
                                    <LanguageIcon />
                                    <Link href={props.website} underline="none" variant="body1"
                                        className='ml-3 text-white'
                                        target="_blank" rel="noopener noreferrer">
                                        {props.website}
                                    </Link>
                                </Grid2>
                                <Grid2 className="flex flex-row justify-center text-white">
                                    <PeopleAltIcon />
                                    <Typography variant="body1" className='ml-3'>
                                        {props.employeeCount} nhân viên
                                    </Typography>
                                </Grid2>
                                <Grid2 className="flex flex-row justify-center text-white">
                                    <EmailIcon />
                                    <Typography variant="body1" className='ml-3'>
                                        {props.email}
                                    </Typography>
                                </Grid2>
                            </Grid2>
                        </Grid2>
                        <Grid2 size={3}>
                            <Box className='flex justify-end'>
                                <Button className='bg-blue-50 font-sans shadow-sm text-colorPrimary p-3 font-bold flex justify-center mt-5 mr-5'
                                    size="medium"
                                    variant="contained"
                                    startIcon={<AddIcon className='text-colorPrimary' />}>
                                    Theo dõi công ty
                                </Button>

                            </Box>
                        </Grid2>

                    </Grid2>

                </CardContent>
            </Box >
        </Card >
    );
}
