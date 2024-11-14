// CreateJobPage.tsx
"use client";
import { Typography, Box, Container, Button, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/navigation'; // useRouter for navigation
import { AddressCard, DescriptionCard, RequirementCard, SalaryCard, TitleCard } from '@/components';
import { useAccountStore, useCreateJobStore } from '@/stores';
import { useEffect } from 'react';
import { Company } from '@/models';

const CreateJobPage = () => {
    const router = useRouter();
    const createJobStore = useCreateJobStore();
    const accountStore = useAccountStore();


    useEffect(() => {
        if (!accountStore.account) {
            accountStore.loadAccountByJwt();
        }
    }, [])

    useEffect(() => {
        if (accountStore.account) {
            createJobStore.setCompany(accountStore.account as Company);
        }
    }, [accountStore.account])

    const handlePreviewClick = () => {
        router.push('/preview-job');
    };

    const handleClearClick = () => {
        createJobStore.resetJobForm();
    };

    const handleSubmitJob = () => {
        if (createJobStore.jobData) {
            createJobStore.submitJob();
        }
    };

    useEffect(() => {
        if (createJobStore.jobData.id) {
            router.push(`/job-detail/${createJobStore.jobData.id}`);
        }
    }, [createJobStore.jobData.id])

    const handleClose = () => {
        createJobStore.setsucceeded(true);
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
                        <Button
                            onClick={handleSubmitJob}
                            variant="contained"
                            className="normal-case">
                            Hoàn tất & Tạo tin đăng
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Box>
                <Snackbar
                    open={createJobStore.succeeded === null ? false : !createJobStore.succeeded}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert
                        onClose={handleClose}
                        severity="info"
                        className='bg-colorPrimary text-white shadow-md'
                    >
                        Vui lòng điền đầy đủ thông tin cần thiết
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default CreateJobPage;
