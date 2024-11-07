import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';



type CompanyInfoProps = {
    description: string
}

export const CompanyInfo: React.FC<CompanyInfoProps> = (props: CompanyInfoProps) => {
    return (
        <Card
            className="flex flex-col mb-4">
            <Box
                className="bg-gradient-to-r from-colorStartBanner to-colorEndBanner">
                <Typography
                    variant="h6"
                    className="font-medium p-3 text-white"
                >Giới thiệu công ty</Typography>
            </Box>
            <CardContent>
                <Typography
                    variant="body2"
                    color='textSecondary'>
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
}
