"use client";
import { Box, Container } from '@mui/material';
import { JobBanner, JobBreadcrumb } from 'components';
import React from 'react'
import { Job, JobStatus } from 'core/models';


const job: Job = {
    id: '1',
    title: 'Frontend Developer',
    salary: 15,
    position: 'Hà Nội',
    status: JobStatus.Open,
    description: 'Phát triển các thành phần giao diện người dùng cho ứng dụng web.',
    ownerId: '1',
    closeDate: '31-12-2024'
};

const JobDetail = () => {
    return (
        <Box
            className="flex flex-col min-h-screen">
            <Container
                component="main"
                className="flex-grow p-5">
                <JobBreadcrumb
                    currentPosition={`Tuyển dụng ${job.title}`}>
                </JobBreadcrumb>
                <JobBanner></JobBanner>
            </Container>
        </Box>

    );
}
export default JobDetail;
