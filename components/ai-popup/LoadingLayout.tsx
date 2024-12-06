import React from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome' // Sparkle icon

import { Autocomplete, Button, Chip, TextField, Typography } from '@mui/material'
import { useCreateJobStore } from '@/stores'
import { useAIStore } from '@/stores/AIPopupStore'
import GradientSpinner from '../common/GradientSpinner'

export function LoadingLayout() {
  const AIPopupStore = useAIStore()

  return (
    <Card
      sx={{
        borderRadius: '12px',
        minWidth: '100%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)'
      }}
    >
      <GradientSpinner />
    </Card>
  )
}
