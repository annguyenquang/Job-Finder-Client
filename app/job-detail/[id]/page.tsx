"use client";
import React, { useEffect } from 'react'
import { useJobStore } from '@/stores';
import { useParams } from 'next/navigation';
import { useMetadataStore } from '@/stores/MetadataStore';
import { JobDetail } from '@/components';


const JobDetailPage = () => {
    const { id } = useParams();
    const jobStore = useJobStore();
    const metadataStore = useMetadataStore();

    useEffect(() => {
        jobStore.loadJobById(id as string);
    }, [id]);


    useEffect(() => {
        metadataStore.loadValueMetadata(jobStore.job);
    }, [jobStore.job]);
    return (
        <JobDetail job={jobStore.job} activeCompanyPreview={true}></JobDetail>
    );
}
export default JobDetailPage;
