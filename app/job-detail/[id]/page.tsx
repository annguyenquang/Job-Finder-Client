"use client";
import { Box, Card, CardContent, Container, Grid2 } from '@mui/material';
import { CompanyIntro, JobBanner, JobBreadcrumb, JobInfo, JobList } from '@/components';
import React, { useEffect } from 'react'
import { useJobStore } from '@/stores';
import { useParams } from 'next/navigation';


const JobDetail = () => {
    const { id } = useParams();
    const jobStore = useJobStore();

    useEffect(() => {
        jobStore.loadJobById(id as string);
    }, [id])
    return (
        <Box
            className="flex flex-col">
            <Container
                component="main"
                maxWidth="lg"
                className="flex-grow p-4">
                <JobBreadcrumb
                    currentPosition={`Tuyển dụng ${jobStore.job.title}`}>
                </JobBreadcrumb>
            </Container>
            <Box className=" bg-colorPrimary">
                <Container
                    maxWidth="lg"
                    component="main"
                    className="flex-grow">
                    <JobBanner
                        job={jobStore.job}
                    ></JobBanner>
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
                        <JobInfo
                            job={jobStore.job}
                        ></JobInfo>
                    </Grid2>
                    <Grid2
                        size={4}
                    >
                        <CompanyIntro
                            company={jobStore.job.company}
                        ></CompanyIntro>
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
