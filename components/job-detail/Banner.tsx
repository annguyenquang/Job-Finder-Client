import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Card, CardContent, Grid2 } from '@mui/material';


type BannerProps = {

}

export const JobBanner: React.FC = () => {
    return (
        <Card className="bg-white shadow-md rounded-lg mt-5 relative">
            <CardContent className='bg-blue-600'>
                <Grid2
                    container
                    spacing={2}
                >
                    <Grid2
                        size={7}
                    >
                        <Typography className='font-semibold font-sans text-blue-600 mt-4'
                            gutterBottom variant="h5"
                            sx={{ color: 'text-blue-600' }}
                            component="div">
                            Premier Life Consultant
                        </Typography>
                    </Grid2>
                    <Grid2
                        size={5}
                    >

                    </Grid2>
                </Grid2>
            </CardContent>
        </Card >
    );
}
