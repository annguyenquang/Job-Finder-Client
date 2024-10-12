import { Grid2, Pagination } from '@mui/material';
import React from 'react';
import JobCard from './JobCard';

const JobGrid = () => {
    return (
        <div className="mt-5 flex flex-col items-center gap-4">
            <Grid2 container spacing={1}>
                <Grid2 size={4} display="flex" justifyContent="center" alignItems="center">
                    <JobCard />
                </Grid2>
                <Grid2 size={4} display="flex" justifyContent="center" alignItems="center">
                    <JobCard />
                </Grid2>
                <Grid2 size={4} display="flex" justifyContent="center" alignItems="center">
                    <JobCard />
                </Grid2>
                <Grid2 size={4} display="flex" justifyContent="center" alignItems="center">
                    <JobCard />
                </Grid2>
                <Grid2 size={4} display="flex" justifyContent="center" alignItems="center">
                    <JobCard />
                </Grid2>
                <Grid2 size={4} display="flex" justifyContent="center" alignItems="center">
                    <JobCard />
                </Grid2>
            </Grid2>
            <Pagination count={5} variant="outlined" shape="rounded" size="large" color="primary" />
        </div>
    );
};

export default JobGrid;
