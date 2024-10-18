import { JobStatus } from "./JobStatus"
export type Job = {
    id: string,
    title: string,
    salary: number,
    location: string,
    status: JobStatus,
    description: string,
    ownerId: string,
    closeDate: string
}