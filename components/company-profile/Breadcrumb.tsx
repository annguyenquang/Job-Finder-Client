import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert'


type BreadcrumbProps = {
    currentPosition: string;
}

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
}

export const BasicBreadcrumb: React.FC<BreadcrumbProps> = (props: BreadcrumbProps) => {
    console.log(props.currentPosition);
    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Danh sách công ty
                </Link>
                <Typography sx={{ color: 'text.primary' }}>{props.currentPosition}</Typography>
            </Breadcrumbs>
        </div>
    );
}
