import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import JobDescription from './JobDescription';
import { Company, Job } from '@/models';
type JobInfoProps = {
    company: Company,
    job: Job,
    educationLevel: string,
    workExperienceRequirement: string,
    genderRequirement: string,
    skills: string[]
}

export const JobInfo: React.FC<JobInfoProps> = (props) => {
    const getAgeRequirement = (job: Job) => {
        if (job.minAgeRequirement === null && job.maxAgeRequirement === null) {
            return "Không yêu cầu độ tuổi";
        }
        if (job.minAgeRequirement === null && job.maxAgeRequirement !== null) {
            return `Tối đa ${job.maxAgeRequirement} tuổi`;
        }
        if (job.minAgeRequirement !== null && job.maxAgeRequirement === null) {
            return `Tối thiểu ${job.minAgeRequirement} tuổi`;
        }
        return `${job.minAgeRequirement} - ${job.maxAgeRequirement} tuổi`;
    };

    const requirements = [
        props.educationLevel || 'Không yêu cầu trình độ',
        props.workExperienceRequirement || 'Không yêu cầu kinh nghiệm',
        props.genderRequirement || 'Không yêu cầu giới tính',
        getAgeRequirement(props.job)
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
                            src={props.company.logo}>
                        </img>
                        <Box
                            className="flex flex-col"
                        >
                            <Typography
                                className='font-sans text-lg font-semibold text-black'
                            >
                                {props.company.name ?? "Tên công ty"}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                className='font-sans'
                            >
                                Nhà tuyển dụng · {props.company.name}
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
                {requirements.map((requirement, index) => (
                    <Chip key={`${requirement}-${index}`} className="mr-2" label={requirement} />
                ))}
                <Typography
                    className='font-sans text-lg font-semibold text-gray-600 mt-4 mb-4'
                >
                    Kỹ năng
                </Typography>
                {props.skills.length > 0 ? props.skills.map((skill, index) => (
                    <Chip key={`${skill}-${index}`} className='mr-2 mb-2' label={skill} />
                )) : "Không yêu cầu kỹ năng"
                }
            </CardContent>
        </Card>
    )
}