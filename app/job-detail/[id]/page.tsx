"use client";
import React, { useEffect } from 'react'
import { useCreateJobStore, useJobDetailStore } from '@/stores';
import { useParams } from 'next/navigation';
import { useMetadataStore } from '@/stores/MetadataStore';
import { JobDetail } from '@/components';


const JobDetailPage = () => {
  const { id } = useParams();
  const jobStore = useJobDetailStore();
  const metadataStore = useMetadataStore();
  const createJobStore = useCreateJobStore();

  useEffect(() => {
    jobStore.loadJobById(id as string);
    createJobStore.resetJobForm();
  }, [id]);


  useEffect(() => {
    metadataStore.loadValueMetadata(jobStore.job);
  }, [jobStore.job]);
  return (
    <JobDetail job={jobStore.job} activeCompanyPreview={true}></JobDetail>
  );
}
export default JobDetailPage;