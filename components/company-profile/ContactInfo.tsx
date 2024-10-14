import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Card, CardContent } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Divider from '@mui/material/Divider';
import MapIcon from '@mui/icons-material/Map';

type ContactInfoProps = {
    address: string
}

export const ContactInfo: React.FC<ContactInfoProps> = (props: ContactInfoProps) => {
    return (
        <Card
            className="flex flex-col mb-4">
            <Box
                className="bg-gradient-to-r from-colorStartBanner to-colorEndBanner">
                <Typography
                    variant="h6"
                    className="font-medium p-3 text-white"
                >Thông tin liên hệ</Typography>
            </Box>
            <CardContent>
                <Box
                    className='flex flex-row mb-2'>
                    <LocationOnIcon
                        className='mr-2 text-green-600'
                        fontSize='medium'
                    ></LocationOnIcon>
                    <Typography
                        className=''
                        variant='body1'
                    >Địa chỉ công ty</Typography>
                </Box>
                <Typography
                    variant="body2"
                    color='textSecondary'
                >{props.address}
                </Typography>
            </CardContent>
        </Card>
    );
}
