'use client'
import React from 'react'
import { useCreateJobStore, useJobDetailStore, useMetadataStore } from '@/stores'
import { useParams } from 'next/navigation'
import { JobDetail } from '@/components'

const JobDetailPage = () => {
  const { id } = useParams()
  const jobStore = useJobDetailStore()
  const metadataStore = useMetadataStore()
  const createJobStore = useCreateJobStore()

  React.useEffect(() => {
    jobStore.loadJobById(id as string)
    createJobStore.resetJobForm()
  }, [id])

  React.useEffect(() => {
    metadataStore.loadValueMetadata(jobStore.job)
  }, [jobStore.job])
  return (
    <JobDetail
      job={jobStore.job}
      activeCompanyPreview={true}
    ></JobDetail>
  )
}
export default JobDetailPage
