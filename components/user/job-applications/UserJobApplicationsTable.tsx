'use client'

import { useLocationStore } from '@/stores'
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import Image from 'next/image'
import { JobApplicationState, UserJobApplication } from '@/models'

export const UserJobApplicationsTable: React.FC = () => {
  const locationStore = useLocationStore()
  const fakeApplications: UserJobApplication[] = [
    {
      id: '1',
      job: {
        description: 'We are looking for a software engineer to join our team',
        title: 'Software Engineer',
        salary: 100000,
        id: '1',
        status: 0,
        closeDate: new Date(),
        provinceId: 1,
        districtId: 1,
        genderRequirement: {
          type: 1,
          id: '1',
          value: ''
        },
        workArrangement: {
          type: 1,
          id: '1',
          value: ''
        },
        workExperienceRequirement: {
          type: 1,
          id: '1',
          value: ''
        },
        commitmentType: {
          type: 1,
          id: '1',
          value: ''
        },
        educationLevelRequirement: {
          type: 1,
          id: '1',
          value: ''
        },
        skills: ['React', 'NodeJS'],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: '',
        updatedBy: '',
        minAgeRequirement: null,
        maxAgeRequirement: null,
        company: {
          id: '1',
          name: 'Google',
          logo: 'https://lh3.googleusercontent.com/d_S5gxu_S1P6NR1gXeMthZeBzkrQMHdI5uvXrpn3nfJuXpCjlqhLQKH_hbOxTHxFhp5WugVOEcl4WDrv9rmKBDOMExhKU5KmmLFQVg',
          address: 'Mountain View, CA',
          industry: 'Technology',
          emailContact: '',
          phoneContact: '',
          slug: 'google',
          employeeCount: 0,
          website: 'https://www.google.com',
          districtId: 1,
          provinceId: 1,
          description:
            'Google is a multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, a search engine, cloud computing, software, and hardware.'
        }
      },
      userId: '1',
      cvLink: 'https://www.google.com',
      coverLetter: 'I am a good fit for this job',
      state: JobApplicationState.UnderReview,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null,
      updatedBy: null
    }
  ]

  React.useEffect(() => {
    if (locationStore.allProvince.length === 0) {
      locationStore.loadAllProvince()
    }
  }, [])

  React.useEffect(() => {
    if (locationStore.allDistrict.length === 0) {
      locationStore.loadAllDistrict()
    }
  }, [])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Công việc</TableCell>
            <TableCell>Thời gian ứng tuyển</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {fakeApplications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>
                <Stack
                  direction='row'
                  spacing={2}
                >
                  <Image
                    alt='company-logo'
                    src={application.job.company.logo}
                    width={100}
                    height={100}
                  />

                  <Stack>
                    <Typography
                      variant='h6'
                      fontWeight={'bold'}
                    >
                      {application.job.title}
                    </Typography>

                    <Typography sx={{ color: grey[500] }}>{application.job.company.name}</Typography>

                    <Typography sx={{ color: grey[500] }}>
                      {locationStore.getDistrictAndProvinceName(application.job.districtId, application.job.provinceId)}
                    </Typography>
                  </Stack>
                </Stack>
              </TableCell>
              <TableCell>{application.createdAt?.toLocaleDateString()}</TableCell>
              <TableCell>
                <Button
                  className='rounded-full'
                  variant='contained'
                >
                  Xem
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
