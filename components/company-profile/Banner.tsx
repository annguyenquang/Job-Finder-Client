import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Container, Grid2, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LanguageIcon from '@mui/icons-material/Language';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

type BannerProps = {
    avatar: string,
    name: string,
    employeeCount: number,
    website: string,
}

export const Banner: React.FC<BannerProps> = (props: BannerProps) => {
    return (
        <Card className="bg-white shadow-md rounded-lg mt-5 relative">
            <CardMedia
                className='h-full min-h-64'
                image="https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg"
                title="green iguana"
            />
            <Avatar
                alt="avatar"
                src={props.avatar}
                className='w-44 h-44 absolute left-10 top-40 border-4 border-white'
            />
            <Box className='flex-1 bg-gradient-to-r from-colorStartBanner to-colorEndBanner'>
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
                            </Grid2>
                        </Grid2>
                        <Grid2 size={3}>
                            <Box className='flex justify-end'>
                                <Button className='bg-white text-green-500 p-3 font-medium flex justify-center mt-5 mr-5'
                                    size="medium"
                                    variant="contained"
                                    startIcon={<AddIcon className='text-green-500' />}>
                                    Theo dõi công ty
                                </Button>

                            </Box>
                        </Grid2>

                    </Grid2>

                </CardContent>
            </Box>
        </Card >
    );
}
