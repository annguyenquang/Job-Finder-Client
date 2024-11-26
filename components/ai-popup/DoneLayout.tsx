import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'

import Carousel from 'react-material-ui-carousel'

import { Autocomplete, Button, Chip, TextField, Typography } from '@mui/material'
import { useCreateJobStore } from '@/stores'
import { useAIStore } from '@/stores/AIPopupStore'
import GradientSpinner from '../common/GradientSpinner'
import JobCard from '../viec-lam-page/JobCard'
import { Job } from '@/models'

export function DoneLayout() {
  const AIPopupStore = useAIStore()
  function Item({ item }: { item: { description: string } }) {
    return <div style={{ width: '100%', height: '100%' }}>{item.description}</div>
  }
  const items: Job[] = [
    {
      title: 'Cybersecurity Analyst',
      description: "Protect an organization's systems from security threats.",
      salary: 90000,
      status: 1,
      closeDate: new Date(),
      provinceId: 18,
      districtId: 95,
      minAgeRequirement: 27,
      maxAgeRequirement: 45,
      genderRequirement: {
        type: 4,
        value: '{"data": "Others"}',
        id: '12497687-64b8-4d8e-814a-b7d1d33d3aab'
      },
      educationLevelRequirement: {
        type: 3,
        value: '{"data": "MasterDegree"}',
        id: 'bc44b9a9-5cd6-4195-a7bd-92b4bef6d8fb'
      },
      workExperienceRequirement: {
        type: 2,
        value: '{"data": "FiveToTenYears"}',
        id: 'bf38a1b9-dee3-455a-87c1-4e034fe806f7'
      },
      workArrangement: {
        type: 1,
        value: '{"data": "Hybrid"}',
        id: 'c199da74-c2fb-4381-b093-cf2f1e3e8f06'
      },
      commitmentType: {
        type: 0,
        value: '{"data": "FullTime"}',
        id: '540f318e-b42f-4485-9e60-8faa5bf80962'
      },
      company: {
        name: 'Tech Corp',
        emailContact: 'info@techcorp.com',
        phoneContact: '123456789',
        description: 'Tech Corp is a tech corp company.',
        employeeCount: 500,
        provinceId: 1,
        districtId: 0,
        logo: 'https://images-platform.99static.com/7v8-fjWpezqDYFTxbYGvEE3gnw8=/191x0:1338x1147/500x500/top/smart/99designs-contests-attachments/60/60612/attachment_60612660',
        slug: 'tech-corp',
        address: '123 Tech Lane',
        website: 'www.techcorp.com',
        industry: 'Technology',
        id: '7f9b407b-80e0-4f0c-a301-5a8bbf813b05'
      },
      skills: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null,
      updatedBy: null,
      id: '1d41e60a-ffb5-4039-b4b6-3e25e68d0f2c'
    },
    {
      title: 'Content Writer',
      description: 'Write and edit content for various platforms.',
      salary: 50000,
      status: 1,
      closeDate: new Date(),
      provinceId: 26,
      districtId: 135,
      minAgeRequirement: 21,
      maxAgeRequirement: 35,
      genderRequirement: {
        type: 4,
        value: '{"data": "Female"}',
        id: '7b5f69cb-5996-4a57-b9c6-9fee2a791bf6'
      },
      educationLevelRequirement: {
        type: 3,
        value: '{"data": "CollegeDegree"}',
        id: 'a3fb036a-04fc-4590-b87d-6ed32e2ec692'
      },
      workExperienceRequirement: {
        type: 2,
        value: '{"data": "LessThanOneYear"}',
        id: '4a3e2365-47f4-45d9-b1d4-326d9f2f3203'
      },
      workArrangement: {
        type: 1,
        value: '{"data": "Onsite"}',
        id: '04a9de34-0869-41b2-87a8-63c20c4ba22a'
      },
      commitmentType: {
        type: 0,
        value: '{"data": "FullTime"}',
        id: '540f318e-b42f-4485-9e60-8faa5bf80962'
      },
      company: {
        name: 'Tech Corp',
        emailContact: 'info@techcorp.com',
        phoneContact: '123456789',
        description: 'Tech Corp is a tech corp company.',
        employeeCount: 500,
        provinceId: 1,
        districtId: 0,
        logo: 'https://images-platform.99static.com/7v8-fjWpezqDYFTxbYGvEE3gnw8=/191x0:1338x1147/500x500/top/smart/99designs-contests-attachments/60/60612/attachment_60612660',
        slug: 'tech-corp',
        address: '123 Tech Lane',
        website: 'www.techcorp.com',
        industry: 'Technology',
        id: '7f9b407b-80e0-4f0c-a301-5a8bbf813b05'
      },
      skills: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null,
      updatedBy: null,
      id: '7c7616f2-3c2c-4c5f-9f40-470e78a847c7'
    },
    {
      title: 'Cybersecurity Analyst',
      description: "Protect an organization's systems from security threats.",
      salary: 90000,
      status: 1,
      closeDate: new Date(),
      provinceId: 18,
      districtId: 95,
      minAgeRequirement: 27,
      maxAgeRequirement: 45,
      genderRequirement: {
        type: 4,
        value: '{"data": "Others"}',
        id: '12497687-64b8-4d8e-814a-b7d1d33d3aab'
      },
      educationLevelRequirement: {
        type: 3,
        value: '{"data": "MasterDegree"}',
        id: 'bc44b9a9-5cd6-4195-a7bd-92b4bef6d8fb'
      },
      workExperienceRequirement: {
        type: 2,
        value: '{"data": "FiveToTenYears"}',
        id: 'bf38a1b9-dee3-455a-87c1-4e034fe806f7'
      },
      workArrangement: {
        type: 1,
        value: '{"data": "Hybrid"}',
        id: 'c199da74-c2fb-4381-b093-cf2f1e3e8f06'
      },
      commitmentType: {
        type: 0,
        value: '{"data": "FullTime"}',
        id: '540f318e-b42f-4485-9e60-8faa5bf80962'
      },
      company: {
        name: 'Tech Corp',
        emailContact: 'info@techcorp.com',
        phoneContact: '123456789',
        description: 'Tech Corp is a tech corp company.',
        employeeCount: 500,
        provinceId: 1,
        districtId: 0,
        logo: 'https://images-platform.99static.com/7v8-fjWpezqDYFTxbYGvEE3gnw8=/191x0:1338x1147/500x500/top/smart/99designs-contests-attachments/60/60612/attachment_60612660',
        slug: 'tech-corp',
        address: '123 Tech Lane',
        website: 'www.techcorp.com',
        industry: 'Technology',
        id: '7f9b407b-80e0-4f0c-a301-5a8bbf813b05'
      },
      skills: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null,
      updatedBy: null,
      id: '1d41e60a-ffb5-4039-b4b6-3e25e68d0f2c'
    },
    {
      title: 'Data Scientist',
      description: 'Develop data models and predictive analytics.',
      salary: 95000,
      status: 1,
      closeDate: new Date(),
      provinceId: 7,
      districtId: 40,
      minAgeRequirement: 26,
      maxAgeRequirement: 45,
      genderRequirement: {
        type: 4,
        value: '{"data": "Others"}',
        id: '12497687-64b8-4d8e-814a-b7d1d33d3aab'
      },
      educationLevelRequirement: {
        type: 3,
        value: '{"data": "MasterDegree"}',
        id: 'bc44b9a9-5cd6-4195-a7bd-92b4bef6d8fb'
      },
      workExperienceRequirement: {
        type: 2,
        value: '{"data": "ThreeToFiveYears"}',
        id: '67db1aef-c1b1-4424-8313-774a5dccdb9d'
      },
      workArrangement: {
        type: 1,
        value: '{"data": "Remote/WFH"}',
        id: '376764fa-28ec-4a08-80e3-a6ab407e8601'
      },
      commitmentType: {
        type: 0,
        value: '{"data": "FullTime"}',
        id: '540f318e-b42f-4485-9e60-8faa5bf80962'
      },
      company: {
        name: 'Tech Corp',
        emailContact: 'info@techcorp.com',
        phoneContact: '123456789',
        description: 'Tech Corp is a tech corp company.',
        employeeCount: 500,
        provinceId: 1,
        districtId: 0,
        logo: 'https://images-platform.99static.com/7v8-fjWpezqDYFTxbYGvEE3gnw8=/191x0:1338x1147/500x500/top/smart/99designs-contests-attachments/60/60612/attachment_60612660',
        slug: 'tech-corp',
        address: '123 Tech Lane',
        website: 'www.techcorp.com',
        industry: 'Technology',
        id: '7f9b407b-80e0-4f0c-a301-5a8bbf813b05'
      },
      skills: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: null,
      updatedBy: null,
      id: 'c3e8ff99-9f1a-4e4e-aaa4-4d1c8e5e3b5a'
    }
  ]

  const [index, setIndex] = React.useState(0)

  const handleChange = (cur: number, prev: number) => {
    setIndex(cur)
    console.log(cur, prev)
  }

  return (
    <Box
      sx={{
        borderRadius: '12px',
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '30%',
          padding: 2,
          marginBottom: 2
        }}
      >
        <Typography sx={{ fontWeight: '600', fontFamily: 'sans-serif', display: 'inline' }}>Explanation:</Typography>
        <Typography sx={{ fontSize: '13px', fontWeight: '400', fontFamily: 'sans-serif', display: 'inline' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard
          dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
          specimen book.
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          flex: 1,
          padding: 2,
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Adds depth
          borderRadius: '16px', // Rounds the corners
          overflow: 'hidden', // Keeps the content tidy
          backgroundColor: '#ffffff' // Sets a background color for the carousel
        }}
      >
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: '600',
            fontFamily: 'Roboto, sans-serif',
            color: '#000000', // Primary color
            textAlign: 'center',
            marginBottom: '16px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          <LightbulbOutlinedIcon fontSize='medium' sx={{ color: '#0172e3' }} /> {/* Lightbulb Icon */}
          Your suggestions
        </Typography>
        <div>
          <Carousel
            index={index}
            interval={4000}
            animation='slide'
            indicators={false}
            stopAutoPlayOnHover
            swipe
            className='w-[100%] h-[100%]'
          >
            {items.map((item, i) => (
              <JobCard key={item.id} job={item} />
            ))}
          </Carousel>
        </div>
      </Box>
    </Box>
  )
}
