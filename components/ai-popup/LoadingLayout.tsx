import React from 'react'
import Card from '@mui/material/Card'

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
