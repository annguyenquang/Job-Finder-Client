import { Box, Card, CardContent, Container, Grid2 } from '@mui/material';
import { CompanyIntro, JobBanner, JobBreadcrumb, JobInfo, JobList } from '@/components';
import { Job } from '@/models';
import { useMetadataStore } from '@/stores/MetadataStore';
import { useEffect } from 'react';


type JobdetailProps = {
    job: Job;
    activeCompanyPreview: Boolean;
}

export const JobDetail: React.FC<JobdetailProps> = (props) => {

    const metadataStore = useMetadataStore();

    useEffect(() => {
        metadataStore.loadValueMetadata(props.job);
    }, [props.job]);

    return (
        <Box
            className="flex flex-col">
            <Container
                component="main"
                maxWidth="lg"
                className="flex-grow p-4">
                <JobBreadcrumb
                    currentPosition={`Tuyển dụng ${props.job.title}`}>
                </JobBreadcrumb>
            </Container>
            <Box className=" bg-colorPrimary">
                <Container
                    maxWidth="lg"
                    component="main"
                    className="flex-grow">
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
                            company={props.job.company}
                            job={props.job}
                            educationLevel={metadataStore.educationLevel}
                            workExperienceRequirement={metadataStore.workExperienceRequirement}
                            genderRequirement={metadataStore.genderRequirement}
                            skills={props.job.skills}
                        ></JobInfo>
                    </Grid2>
                    <Grid2
                        size={4}
                    >
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

    );
}