"use client";
import {
    Box,
    Card,
    CardContent,
    Checkbox,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    Grid2,
    TextField,
    Typography, Button
} from '@mui/material';
import { blue, grey, lightBlue } from "@mui/material/colors"
import Image from "next/image";
import { CompanyIntro, JobBanner, JobBreadcrumb, JobInfo, JobList } from '@/components';
import React, { useEffect } from 'react'
import { useJobStore } from '@/stores';
import { useParams } from 'next/navigation';
import { useMetadataStore } from '@/stores/MetadataStore';
import { BookmarkBorder, Email, InsertDriveFile } from "@mui/icons-material";



const JobDetail = () => {
    const { id } = useParams();
    const jobStore = useJobStore();
    const metadataStore = useMetadataStore();
    useEffect(() => {
        jobStore.loadJobById(id as string);
    }, [id]);


    useEffect(() => {
        metadataStore.loadMetadata(jobStore.job);
    }, [jobStore.job]);
    return (
        <Box
            className="flex flex-col">
            <Dialog open={true}>
                <DialogTitle>Bạn đang ứng tuyển cho <strong>{jobStore.job.company.name}</strong> với vị
                    trí <strong>{jobStore.job.title}</strong>
                    <Image alt={jobStore.job.company.name} width={100} height={100} src={jobStore.job.company.logo}></Image>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex" }}>
                        <InsertDriveFile sx={{ marginRight: 1 }}></InsertDriveFile>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Hồ sơ xin việc *
                        </Typography>
                    </Box>
                    <Box sx={{ border: 1, borderColor: blue[500], borderStyle: "dashed", borderRadius: 1, display: "flex", justifyContent: "center", padding: 2, background: lightBlue[50], color: blue[500] }}>
                        <InsertDriveFile sx={{ marginX: 1 }}></InsertDriveFile>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Đăng tải hồ sơ của tôi
                        </Typography>
                    </Box>
                    <Typography variant='body2' sx={{ color: grey[500] }} >
                        Lưu ý : đảm bảo hồ sơ xin việc của bạn sử dụng ngôn ngữ trùng khớp với mô tả công việc (Ví dụ: viết CV bằng tiếng Anh nếu mô tả công việc bằng tiếng Anh) và đăng tải dưới dạng PDF dưới 5MB.
                        Hồ sơ đã đăng tải sẽ được lưu lại cho lần nộp đơn sau.
                    </Typography>
                    <TextField required label='Số điện thoại' type="number" sx={{ marginTop: 1 }} slotProps={{
                        input: {
                            startAdornment:
                                <Box sx={{ display: "inline-flex" }}>
                                    <Typography>+84</Typography>
                                    <Divider sx={{ opacity: 1, borderRightWidth: 2, marginX: 1 }} variant='fullWidth' orientation='vertical' flexItem></Divider>
                                </Box>
                        }
                    }}></TextField>
                    <Box display="flex">
                        <Email sx={{ marginRight: 1 }}></Email>
                        <Typography fontWeight={"bold"}>
                            Thư xin việc
                        </Typography>
                    </Box>
                    <FormControl fullWidth>
                        <FormControlLabel label="Tôi đã có thư xin việc" control={<Checkbox></Checkbox>}>
                        </FormControlLabel>
                        <TextField label="Viết thư xin việc của bạn" rows={4} multiline fullWidth></TextField>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Box width={"100%"} display="flex" flexDirection="column" justifyContent="center">
                        <Button sx={{ height: 50 }} fullWidth variant="contained" color="primary">
                            ỨNG TUYỂN NGAY
                        </Button>
                        <Typography textAlign="center">Bạn chưa chuẩn bị hồ sơ?</Typography>
                        <Typography textAlign={"center"}>Hãy lưu lại việc làm để ứng tuyển sau.</Typography>
                        <Box display={"flex"} justifyContent={"center"} color={blue[500]}>
                            <BookmarkBorder sx={{ marginRight: 1 }}></BookmarkBorder>
                            <Typography textAlign={"center"} >
                                Đánh dấu lưu lại vị trí công việc
                            </Typography>
                        </Box>
                    </Box>
                </DialogActions>
            </Dialog>
            <Container
                component="main"
                maxWidth="lg"
                className="flex-grow p-4">
                <JobBreadcrumb
                    currentPosition={`${jobStore.job.title}`}>
                </JobBreadcrumb>
            </Container>
            <Box className=" bg-colorPrimary">
                <Container
                    maxWidth="lg"
                    component="main"
                    className="flex-grow">
                    <JobBanner
                        job={jobStore.job}
                        commitmentType={metadataStore.commitmentType}
                        educationLevel={metadataStore.educationLevel}
                        workExperienceRequirement={metadataStore.workExperienceRequirement}
                        workArrangement={metadataStore.workArrangement}
                    ></JobBanner>
                </Container>
            </Box>
            <Container
                component="main"
                maxWidth="lg"

                className="flex-grow p-5"
            >
                <Grid2
                    spacing={2}
                    container
                >
                    <Grid2
                        size={8}
                    >
                        <JobInfo
                            job={jobStore.job}
                            educationLevel={metadataStore.educationLevel}
                            workExperienceRequirement={metadataStore.workExperienceRequirement}
                            genderRequirement={metadataStore.genderRequirement}
                        ></JobInfo>
                    </Grid2>
                    <Grid2
                        size={4}
                    >
                        <CompanyIntro
                            company={jobStore.job.company}
                        ></CompanyIntro>
                        <Card>
                            <CardContent>
                                <JobList></JobList>
                            </CardContent>
                        </Card>
                    </Grid2>

                </Grid2>
            </Container>
        </Box >

    );
}
export default JobDetail;
