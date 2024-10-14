export type Job = {
    id: string,
    title: string,
    salary: number,
    position: string,
    status: JobStatus,
    description: string,
    ownerId: string,
    closeDate: string
}