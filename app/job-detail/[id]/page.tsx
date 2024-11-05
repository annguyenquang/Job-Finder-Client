"use client";
import { Box, Card, CardContent, Container, Grid2 } from '@mui/material';
import { CompanyIntro, JobBanner, JobBreadcrumb, JobInfo, JobList } from '@/components';
import React, { useEffect, useState } from 'react'
import { useJobStore } from '@/stores';
import { useParams } from 'next/navigation';
import { MetadataService } from '@/services/MetadataService';


const JobDetail = () => {
    const { id } = useParams();
    const jobStore = useJobStore();
    const [commitmentType, setCommitmentType] = useState<string>('');
    const [educationLevel, setEducationLevel] = useState<string>('');
    const [workArrangement, setWorkArrangement] = useState<string>('');
    const [genderRequirement, setGenderRequirement] = useState<string>('');
    const [workExperienceRequirement, setWorkExperienceRequirement] = useState<string>('');

    useEffect(() => {
        jobStore.loadJobById(id as string);
    }, [id]);

    useEffect(() => {
        const fetchMetadata = async () => {
            const metadata = await MetadataService.getAndParseMetadata();
            if (metadata && jobStore.job) {
                const { commitmentType, educationLevelRequirement, workArrangement, genderRequirement, workExperienceRequirement } = jobStore.job;
                setCommitmentType(metadata.find(item => item.id === commitmentType?.id)?.value ?? '');
                setEducationLevel(metadata.find(item => item.id === educationLevelRequirement?.id)?.value ?? '');
                setWorkArrangement(metadata.find(item => item.id === workArrangement?.id)?.value ?? '');
                setGenderRequirement(metadata.find(item => item.id === genderRequirement?.id)?.value ?? '');
                setWorkExperienceRequirement(metadata.find(item => item.id === workExperienceRequirement?.id)?.value ?? '');
            }
        };
        fetchMetadata();
    }, [jobStore.job]);
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
                        commitmentType={commitmentType}
                        educationLevel={educationLevel}
                        workExperienceRequirement={workExperienceRequirement}
                        workArrangement={workArrangement}
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
                            educationLevel={educationLevel}
                            workExperienceRequirement={workExperienceRequirement}
                            genderRequirement={genderRequirement}
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
