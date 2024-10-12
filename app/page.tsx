'use client';
import { Button, Container, Typography } from '@mui/material';
import { Navbar } from '@/components';
import { useRouter } from 'next/navigation';
import JobCard from '../components/home-page/JobCard';
import JobGrid from 'components/home-page/JobGrid';

const Home = () => {
    const router = useRouter();
    const onClick = () => {
        router.push('/example-user-page');
    };
    return (
        <div>
            <Container maxWidth="lg">
                <Typography className="text-primary font-sans font-semibold" variant="h4">
                    Công việc mới nhất
                </Typography>
                <JobGrid />
            </Container>
        </div>
    );
};

export default Home;
