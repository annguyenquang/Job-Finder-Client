import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';


type BreadcrumbProps = {
    currentPosition: string;
}


export const BasicBreadcrumb: React.FC<BreadcrumbProps> = (props: BreadcrumbProps) => {
    return (
        <Box>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/cong-ty">
                    Danh sách công ty
                </Link>
                <Typography className='text-colorPrimary'>{props.currentPosition}</Typography>
            </Breadcrumbs>
        </Box>
    );
}
