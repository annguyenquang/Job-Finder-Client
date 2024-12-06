'use client'

import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import FilterBox from './FilterBox'
import { useJobListStore } from '@/stores'

const SideBar = () => {
  const jobStore = useJobListStore()
  const [uniqueTypes, setUniqueTypes] = React.useState<number[]>([])

  React.useEffect(() => {
    const getJob = async () => {
      jobStore.loadJobs()
    }
    //Every time filter reset, get the unique type of filter
    const uniqueTypes: number[] = jobStore.filter.reduce<number[]>((acc, item) => {
      if (!acc.includes(item.type)) {
        acc.push(item.type)
      }
      return acc
    }, [])
    setUniqueTypes(uniqueTypes)
    //Update param filter
    const currentParam = jobStore.reqParam
    const currentActiveFilter = jobStore.filter.filter((e) => e.active === 1) // TODO
    currentParam.setFilter(currentActiveFilter)
    currentParam.setPage(1)
    jobStore.updateParam(currentParam)

    getJob()
  }, [jobStore.filter])

  React.useEffect(() => {
    const getFilter = async () => {
      await jobStore.loadFilter() // Await to ensure completion
    }
    getFilter()
  }, [])

  const handleClearFilter = () => {
    jobStore.triggerReset()
    jobStore.loadFilter()
  }

  return (
    <Container
      disableGutters={true}
      className='h-[100%] bg-background'
    >
      <Button
        onClick={handleClearFilter}
        variant='outlined'
        startIcon={<DeleteIcon />}
      >
        Clear Filter
      </Button>
      {uniqueTypes.map((e) => (
        <FilterBox
          key={e}
          type={e}
          filter={jobStore.filter}
        />
      ))}
    </Container>
  )
}

export default SideBar
