'use client'
import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import dayjs, { Dayjs } from 'dayjs'

type DateTimePickerProps = {
  onDateChange: (date: string) => void
}

export const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date)
    if (date) {
      // Format the date as 'YYYY-MM-DD' and pass it to the parent via callback
      props.onDateChange(date.format('YYYY-MM-DD'))
    } else {
      props.onDateChange('') // Handle null case
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        slotProps={{
          textField: {
            size: 'small',
            sx: {
              '& .MuiInputBase-root': {
                fontSize: '0.8rem', // Adjust text size
                padding: '2px 5px' // Adjust padding
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: '8px' // Cleaner rounded corners
              }
            }
          }
        }}
      />
    </LocalizationProvider>
  )
}
