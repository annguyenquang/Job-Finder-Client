"use client";
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Banner, BasicBreadcrumb, CompanyInfo, ContactInfo, Share, Recruitment } from '@/components'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Grid2';


import { useCompanyStore, useJobStore } from '@/stores';

const Profile = () => {
    const { slug } = useParams();

    const companyDetailStore = useCompanyStore();
    const jobStore = useJobStore();


    function getIdFromUrl(url: string) {
        // Sử dụng phương thức split để tách chuỗi bằng dấu '-'
        const parts = url.split('-');

        // Lấy phần tử cuối cùng trong mảng, đó chính là id
        const id = parts[parts.length - 1];

        return id;
    }

    useEffect(() => {
        // Tải chi tiết công ty
        const loadComapanyDetail = async () => {
            companyDetailStore.loadCompany(slug as string);
        }

        // Tải jobs và sau đó hiển thị từng đối tượng job
        const loadJobs = async () => {
            const id = getIdFromUrl(slug as string);
            await jobStore.loadJobs(id); // Gọi loadJobs

        };

        loadComapanyDetail();
        loadJobs(); // Gọi hàm bất đồng bộ
    }, [slug]); // Thêm slug vào dependency




    return (
        <Box
            className="flex flex-col min-h-screen">
            <Container
                component="main"
                className="flex-grow p-5">
                <BasicBreadcrumb
                    currentPosition={`Thông tin công ty & tin tuyển dụng từ ${companyDetailStore.Company.name}`}>
                </BasicBreadcrumb>
                <Banner
                    avatar={companyDetailStore.Company.avatar}
                    name={companyDetailStore.Company.name}
                    employeeCount={companyDetailStore.Company.employeeCount}
                    email={companyDetailStore.Company.emailContact}
                    website={companyDetailStore.Company.website ?? ''}>
                </Banner>

                <Grid2
                    container
                    spacing={2}
                    className="mt-4">
                    <Grid2
                        size={8}>
                        <CompanyInfo
                            description={companyDetailStore.Company.description}>
                        </CompanyInfo>
                        <Recruitment
                            jobs={jobStore.jobs}
                            company={companyDetailStore.Company}
                        >
                        </Recruitment>
                    </Grid2>
                    <Grid2
                        size={4}>
                        <ContactInfo
                            address={companyDetailStore.Company.address}
                        ></ContactInfo>
                        <Share />
                    </Grid2>
                </Grid2>
            </Container>
        </Box>

    );
};

export default Profile;