"use client";
import { Box, Card, CardContent, Container, Grid2 } from '@mui/material';
import { CompanyIntro, JobBanner, JobBreadcrumb, JobInfo, JobList } from '@/components';
import React, { useEffect } from 'react'
import { useJobDetailStore } from '@/stores';
import { useParams } from 'next/navigation';
import { useMetadataStore } from '@/stores/MetadataStore';


const JobDetail = () => {
  const { id } = useParams();
  const jobStore = useJobDetailStore();
  const metadataStore = useMetadataStore();

  useEffect(() => {
    jobStore.loadJobById(id as string);
  }, [id]);


  useEffect(() => {
    metadataStore.loadMetadata(jobStore.job);
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
            commitmentType={metadataStore.commitmentType}
            educationLevel={metadataStore.educationLevel}
            workExperienceRequirement={metadataStore.workExperienceRequirement}
            workArrangement={metadataStore.workArrangement}
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
              educationLevel={metadataStore.educationLevel}
              workExperienceRequirement={metadataStore.workExperienceRequirement}
              genderRequirement={metadataStore.genderRequirement}
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