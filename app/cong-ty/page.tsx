import { Container, Typography } from '@mui/material';
import React from 'react';
import CompanyGrid from '../../components/company-page/CompanyGrid';

const CompanyPage: React.FC = () => {
    return (
        <div>
            <Container maxWidth="lg">
                <Typography className="text-primary font-sans font-semibold" variant="h4">
                    Danh sách công ty
                </Typography>
                <CompanyGrid />
            </Container>
        </div>
    );
};

export default CompanyPage;
