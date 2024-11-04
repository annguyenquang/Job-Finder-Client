import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import JobDescription from './JobDescription';
import { Job } from '@/models';
type JobInfoProps = {
    job: Job,
}

export const JobInfo: React.FC<JobInfoProps> = (props) => {
    const requirements = [
        "Dưới một năm kinh nghiệm",
        "Tối thiểu Cao Đẳng",
        "22-35 tuổi"
    ];

    const skills = [
        "B2C Sales",
        "Sales Strategy",
        "Sales Management",
        "Sales and Marketing",
        "Negotiation Skills",
        "Contract Negotiation",
        "Teamwork",
        "Sales Operations"
    ];

    return (
        <Card>
            <CardContent>
                <Box
                    border={1}
                    className="rounded-lg text-gray-400"
                >
                    <Box className="flex flex-row items-center">
                        <img
                            alt=""
                            className='w-20 h-20 m-2'
                            src={props.job.company.logo}>
                        </img>
                        <Box
                            className="flex flex-col"
                        >
                            <Typography
                                className='font-sans text-lg font-semibold text-black'
                            >
                                {props.job.createdBy ?? "Tên người tạo tuyển dụng"}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                className='font-sans'
                            >
                                Nhà tuyển dụng · {props.job.company.name}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Typography
                    variant='h5'
                    className='font-sans font-semibold text-black mt-4 mb-4'
                >
                    Chi tiết công việc
                </Typography>
                <JobDescription description={props.job.description} />
                <Typography
                    className='font-sans text-lg font-semibold text-gray-600 mt-4 mb-4'
                >
                    Mô tả công việc
                </Typography>
                {requirements.map((requirement) => (
                    <Chip key={requirement} className='mr-2' label={requirement} />
                ))}
                <Typography
                    className='font-sans text-lg font-semibold text-gray-600 mt-4 mb-4'
                >
                    Kỹ năng
                </Typography>
                {skills.map((skill) => (
                    <Chip key={skill} className='mr-2 mb-2' label={skill} />
                ))}
            </CardContent>
        </Card>
    )
}