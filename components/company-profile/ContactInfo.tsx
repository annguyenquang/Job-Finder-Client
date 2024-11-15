import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { District, LocationService, Province } from '@/services';

type ContactInfoProps = {
    address: string
    districtId: number
    provinceId: number
}

export const ContactInfo: React.FC<ContactInfoProps> = (props: ContactInfoProps) => {
    const [districts, setDistricts] = React.useState<District>();
    const [province, setProvince] = React.useState<Province>();

    React.useEffect(() => {
        const fetchProvince = async () => {
            const fetchedProvince = await LocationService.getProvinceById(props.provinceId);
            if (fetchedProvince) {
                setProvince(fetchedProvince);
            }
        };
        fetchProvince();
    }, [props.provinceId]);

    React.useEffect(() => {
        const fetchDistricts = async () => {
            const fetchedDistricts = await LocationService.getDistrictById(props.districtId);
            if (fetchedDistricts) {
                setDistricts(fetchedDistricts);
            }
        };
        fetchDistricts();
    }, [props.districtId]);

    return (
        <Card
            className="flex flex-col mb-4">
            <Box
                className="bg-colorPrimary">
                <Typography
                    variant="h6"
                    className="font-medium p-3 text-white"
                >Thông tin liên hệ</Typography>
            </Box>
            <CardContent>
                <Box
                    className='flex flex-row mb-2'>
                    <LocationOnIcon
                        className='mr-2 text-colorPrimary'
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
                >{props.address}, {districts?.name}, {province?.name}
                </Typography>
            </CardContent>
        </Card>
    );
}
