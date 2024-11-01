"use client";
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Banner, BasicBreadcrumb, CompanyInfo, ContactInfo, Share, Recruitment } from '@/components'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Grid2';
import { useCompanyStore } from '@/stores';

const Profile = () => {
    const { slug } = useParams();
    const companyStore = useCompanyStore();

    useEffect(() => {
        companyStore.loadCompany(slug as string);
    }, [slug]);

    return (
        <Box
            className="flex flex-col min-h-screen">
            <Container
                component="main"
                className="flex-grow p-5">
                <BasicBreadcrumb
                    currentPosition={`Thông tin công ty & tin tuyển dụng từ ${companyStore.Company.name}`}>
                </BasicBreadcrumb>
                <Banner
                    avatar={companyStore.Company.logo}
                    name={companyStore.Company.name}
                    employeeCount={companyStore.Company.employeeCount}
                    email={companyStore.Company.emailContact}
                    website={companyStore.Company.website ?? ''}>
                </Banner>

                <Grid2
                    container
                    spacing={2}
                    className="mt-4">
                    <Grid2
                        size={8}>
                        <CompanyInfo
                            description={companyStore.Company.description}>
                        </CompanyInfo>
                        <Recruitment
                            company={companyStore.Company}
                        >
                        </Recruitment>
                    </Grid2>
                    <Grid2
                        size={4}>
                        <ContactInfo
                            address={companyStore.Company.address}
                        ></ContactInfo>
                        <Share />
                    </Grid2>
                </Grid2>
            </Container>
        </Box>

    );
};

export default Profile;