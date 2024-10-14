import { Job } from "@/models";
import { JobService } from "@/services";
import { create } from "zustand";

type JobStore = {
    jobs: Job[]; // Rename to 'jobs' instead of 'Job' for clarity
    loadJobs: (ownerId: string) => Promise<void>;
};

export const useJobStore = create<JobStore>((set) => ({
    jobs: [
        {
            id: '',
            title: '',
            salary: 0,
            position: '',
            status: '',
            description: '',
            ownerId: '',
            closeDate: ''
        }
    ],
    loadJobs: async (ownerId: string) => {
        const res = await JobService.getJobs(ownerId);
        set(() => ({ jobs: Array.isArray(res?.jobs) ? res.jobs : []}));

    }
}));