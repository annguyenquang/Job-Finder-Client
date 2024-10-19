"use client";
import { Box, Card, CardContent, Container, Grid2 } from '@mui/material';
import { CompanyIntro, JobBanner, JobBreadcrumb, JobInfo, JobList } from 'components';
import React from 'react'
import { Job, JobStatus } from 'core/models';


const job: Job = {
    id: '1',
    title: 'Frontend Developer',
    salary: 15,
    location: 'Hà Nội',
    status: JobStatus.Open,
    description: 'Phát triển các thành phần giao diện người dùng cho ứng dụng web.',
    ownerId: '1',
    closeDate: '31-12-2024'
};

const JobDetail = () => {
    return (
        <Box
            className="flex flex-col">
            <Container
                component="main"
                maxWidth="lg"
                className="flex-grow p-4">
                <JobBreadcrumb
                    currentPosition={`Tuyển dụng ${job.title}`}>
                </JobBreadcrumb>
            </Container>
            <Box className=" bg-colorPrimary">
                <Container
                    maxWidth="lg"
                    component="main"
                    className="flex-grow">
                    <JobBanner ></JobBanner>
                </Container>
            </Box>
            <Container
                component="main"
                maxWidth="lg"

                className="flex-grow p-5"
            >
                <Grid2
                    spacing={2}
                    container
                >
                    <Grid2
                        size={8}
                    >
                        <JobInfo></JobInfo>
                    </Grid2>
                    <Grid2
                        size={4}
                    >
                        <CompanyIntro></CompanyIntro>
                        <Card>
                            <CardContent>
                                <JobList></JobList>
                            </CardContent>
                        </Card>
                    </Grid2>

                </Grid2>
            </Container>
        </Box>

    );
}
export default JobDetail;
