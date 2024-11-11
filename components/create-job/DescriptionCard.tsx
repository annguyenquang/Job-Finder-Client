import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import dynamic from 'next/dynamic';
import { useCreateJobStore } from '@/stores';


// Import ReactQuill động và tắt SSR
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});
import 'react-quill/dist/quill.snow.css';

export const DescriptionCard: React.FC = () => {
    const createJobStore = useCreateJobStore();

    React.useEffect(() => {
        console.log("Description jobStore: ", createJobStore.jobData.description);
    }, [createJobStore.jobData.description])

    const handleQuillChange = (value: string): void => {
        createJobStore.setJobDescription(value);
    };
    return (
        <Card
            className="mb-4"
        >
            <Box
                className="p-2 flex-row flex">
                <Typography
                    className='font-semibold font-sans text-lg pl-2 pt-2 pb-2'
                >
                    Mô tả công việc
                </Typography>
                <Typography
                    className='font-semibold font-sans text-red-600 text-xl pt-2'
                >
                    *
                </Typography>
            </Box>
            <Divider variant="fullWidth" />
            <Box
                className="p-2"
            >
                <ReactQuill
                    theme="snow"
                    value={createJobStore.jobData.description}
                    className="p-2 [&_.ql-editor]:min-h-[200px] [&_.ql-container]:mb-2 [&_.ql-editor]:text-[16px]"
                    onChange={handleQuillChange}
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'font': [] }],
                            [{ 'align': [] }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            ['blockquote', 'code-block'],
                            ['link', 'image', 'video'],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            ['clean']
                        ],
                    }}
                />
            </Box>
        </Card>
    )
}