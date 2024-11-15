import { Box } from '@mui/material';
import * as React from 'react';

interface JobDescriptionProps {
    description: string;
}

const JobDescription: React.FC<JobDescriptionProps> = ({ description }) => {
    React.useEffect(() => {
        console.log('description: ', description);
    }, [description]);

    return (
        <Box className="pl-2">
            <Box
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </Box>
    );
};

export default JobDescription;
