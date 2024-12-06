'use client'
import React from 'react'
import { Box } from '@mui/material'

const GradientSpinner = () => {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 96, // Equivalent to w-24 in Tailwind (24 * 4px = 96px)
            height: 96, // Equivalent to h-24 in Tailwind
            animation: 'spin 2s linear infinite', // Using CSS animation
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1b1b1b, #22e2a5, #5a5151)' // Gradient from Tailwind
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 80, // Equivalent to w-20 in Tailwind
              height: 80, // Equivalent to h-20 in Tailwind
              backgroundColor: '#fff', // Equivalent to bg-gray-200 in Tailwind
              borderRadius: '50%',
              border: '2px solid #fff' // Equivalent to border-2 border-white in Tailwind
            }}
          />
        </Box>
      </Box>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default GradientSpinner
