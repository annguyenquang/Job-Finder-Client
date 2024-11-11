"use client";
import { useAccountStore, useCreateJobStore } from '@/stores';
import { JobDetail } from '../../components/job-detail/JobDetail';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Company } from '@/models';

const PreviewPage = () => {
    const createJobStore = useCreateJobStore();
    const accountStore = useAccountStore();
    const jobData = createJobStore.jobData;
    const router = useRouter();

    useEffect(() => {
        accountStore.loadAccountByJwt();
    }, [])

    useEffect(() => {
        if (accountStore.account) {
            createJobStore.setCompany(accountStore.account as Company);
        }
    }, [accountStore.account])

    const handlehandleBackClick = () => {
        router.push('/create-job');
    };

    if (!jobData) return <div>Loading...</div>;

    return (
        <Box>
            <JobDetail job={jobData} />
            <Box className="pb-12"></Box>
            <Box className="bg-white shadow fixed bottom-0 left-0 right-0 z-10">
                <Container maxWidth="md" className="flex-grow flex flex-row justify-between p-4">
                    <Box className="flex flex-row">
                        <Typography className="font-semibold text-lg font-sans pr-2">
                            Trạng thái:
                        </Typography>
                        <Typography className="font-semibold text-yellow-700 text-lg font-sans">
                            Xem trước
                        </Typography>
                    </Box>

                    <Box className="flex flex-row">
                        <Button
                            className="mr-2 normal-case"
                            variant="outlined"
                            onClick={handlehandleBackClick}
                        >
                            Trở về
                        </Button>
                        <Button variant="contained" className="normal-case">
                            Hoàn tất & Tạo tin đăng
                        </Button>
                    </Box>
                </Container>
            </Box>
            );
        </Box>
    )
};

export default PreviewPage;
