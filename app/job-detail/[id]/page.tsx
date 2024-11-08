"use client";
import { Box, Card, CardContent, Container, Grid2 } from '@mui/material';
import { CompanyIntro, JobBanner, JobBreadcrumb, JobInfo, JobList } from '@/components';
import React, { useEffect } from 'react'
import { useJobStore } from '@/stores';
import { useParams } from 'next/navigation';
import { useMetadataStore } from '@/stores/MetadataStore';
import { JobDetail } from '../../../components/job-detail/JobDetail';


const JobDetailPage = () => {
    const { id } = useParams();
    const jobStore = useJobStore();
    const metadataStore = useMetadataStore();

    useEffect(() => {
        jobStore.loadJobById(id as string);
    }, [id]);


    useEffect(() => {
        metadataStore.loadMetadata(jobStore.job);
    }, [jobStore.job]);
    return (
        <JobDetail job={jobStore.job}></JobDetail>
    );
}
export default JobDetailPage;
