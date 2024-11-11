// CreateJobPage.tsx
"use client";
import { Typography, Box, Container, Button } from '@mui/material';
import { useRouter } from 'next/navigation'; // useRouter for navigation
import { AddressCard, DescriptionCard, RequirementCard, SalaryCard, TitleCard } from '@/components';
import { useCreateJobStore } from '@/stores';

const CreateJobPage = () => {
    const router = useRouter();
    const createJobStore = useCreateJobStore();

    const handlePreviewClick = () => {
        router.push('/preview-job');
    };

    const handleClearClick = () => {
        createJobStore.resetJobForm();
    };


    return (
        <Box className="flex flex-col bg-colorLittleWhite">
            <Box className="bg-white shadow-md">
                <Container maxWidth="lg" className="flex-grow">
                    <Typography className="font-semibold font-sans p-4" variant="h6">
                        Đăng Tin Tuyển Dụng
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="sm" className="flex-grow mt-4 mb-16">
                <TitleCard />
                <AddressCard />
                <DescriptionCard />
                <SalaryCard />
                <RequirementCard />
            </Container>

            <Box className="bg-white shadow fixed bottom-0 left-0 right-0 z-10">
                <Container maxWidth="md" className="flex-grow flex flex-row justify-between p-4">
                    <Box className="flex flex-row">
                        <Typography className="font-semibold text-lg font-sans pr-2">
                            Trạng thái:
                        </Typography>
                        <Typography className="font-semibold text-yellow-700 text-lg font-sans">
                            Bản nháp
                        </Typography>
                    </Box>

                    <Box className="flex flex-row">
                        <Button
                            className='mr-2 normal-case'
                            variant="outlined"
                            color="error"
                            onClick={handleClearClick}
                        >
                            Làm mới
                        </Button>
                        <Button
                            className="mr-2 normal-case"
                            variant="outlined"
                            onClick={handlePreviewClick}
                        >
                            Xem trước
                        </Button>
                        <Button variant="contained" className="normal-case">
                            Hoàn tất & Tạo tin đăng
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default CreateJobPage;
