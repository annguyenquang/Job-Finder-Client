import { Box } from '@mui/material';
import * as React from 'react';

interface TranslateDescriptionProps {
    description: string;
}

const TranslateDescription: React.FC<TranslateDescriptionProps> = ({ description }) => {
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

export default TranslateDescription;
