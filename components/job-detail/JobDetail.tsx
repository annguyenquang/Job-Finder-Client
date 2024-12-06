'use client'
import { Box, Card, CardContent, Container, Grid2 } from '@mui/material'
import { CompanyIntro, JobBanner, JobBreadcrumb, JobInfo, JobList } from '@/components'
import { Job } from '@/models'
import { useAccountStore, useMetadataStore } from '@/stores'
import { useEffect } from 'react'
import ApplicationDialog from './ApplicationDialog'

type JobdetailProps = {
  job: Job
  activeCompanyPreview: boolean
}

export const JobDetail: React.FC<JobdetailProps> = (props) => {
  const metadataStore = useMetadataStore()
  const accountStore = useAccountStore()

  useEffect(() => {
    metadataStore.loadValueMetadata(props.job)
  }, [props.job])

  useEffect(() => {
    if (accountStore.account == null) {
      accountStore.loadAccountByJwt()
    }
  }, [])

  return (
    <Box className='flex flex-col'>
      <ApplicationDialog />

      <Container
        component='main'
        maxWidth='lg'
        className='flex-grow pb-1'
      >
        <JobBreadcrumb currentPosition={`Tuyển dụng ${props.job.title}`}></JobBreadcrumb>
      </Container>
      <Box className=' bg-colorPrimary'>
        <Container
          maxWidth='lg'
          component='main'
          className='flex-grow'
        >
          <JobBanner
            job={props.job}
            commitmentType={metadataStore.commitmentType}
            educationLevel={metadataStore.educationLevel}
            workExperienceRequirement={metadataStore.workExperienceRequirement}
            workArrangement={metadataStore.workArrangement}
          ></JobBanner>
        </Container>
      </Box>
      <Container
        component='main'
        maxWidth='lg'
        className='flex-grow p-5'
      >
        <Grid2
          spacing={2}
          container
        >
          <Grid2 size={8}>
            <JobInfo
              company={props.job.company}
              job={props.job}
              educationLevel={metadataStore.educationLevel}
              workExperienceRequirement={metadataStore.workExperienceRequirement}
              genderRequirement={metadataStore.genderRequirement}
              skills={props.job.skills}
            ></JobInfo>
          </Grid2>
          <Grid2 size={4}>
            <CompanyIntro
              activeCompanyPreview={props.activeCompanyPreview}
              company={props.job.company}
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
  )
}
