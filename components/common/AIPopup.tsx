'use client'
import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import { Paper, Typography, Box, Stack, Container } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome' // Sparkle icon
import MinimizeIcon from '@mui/icons-material/Minimize' // Minimize icon from Material UI

export const AIPopup = () => {
  const [clicked, setClicked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setClicked((prev) => !prev)
  }

  return (
    <div>
      <Box
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          width: clicked ? '450px' : '64px',
          height: clicked ? '600px' : '64px',
          borderRadius: clicked ? '20px' : '50%',
          background: 'linear-gradient(135deg, #53e2b9, #b2deac, #2b9db1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.6s ease',
          transformOrigin: 'right bottom'
        }}
      >
        {!clicked && <AutoAwesomeIcon style={{ fontSize: 36, color: '#fff' }} />}
        {clicked && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #53e2b9, #b2deac, #2b9db1)'
            }}
          >
            <Container
              sx={{
                display: 'flex',
                borderRadius: '20px',

                justifyContent: 'space-between',
                padding: '10px',
                background: 'linear-gradient(135deg, #7c8e89, #b2deac, #2b9db1)'
              }}
            >
              <Typography variant='subtitle1' color='white'>
                AI Assistant
              </Typography>
              <Box
                onClick={(event) => {
                  event.stopPropagation() // Prevent the click event from reaching the parent
                  handleClick() // Toggle the clicked state
                }}
                sx={{
                  width: '25px',
                  height: '25px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.1)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.6s ease',
                  transformOrigin: 'right bottom',
                  '&:hover': {
                    background: 'white',
                    transform: 'scale(1.2)',
                    boxShadow: '0 0 30px rgba(0, 0, 0, 0.4)'
                  }
                }}
              >
                <MinimizeIcon sx={{ fontSize: '20px', color: 'black' }} />
              </Box>
            </Container>
          </Box>
        )}
      </Box>

      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 10px rgba(0, 157, 255, 0.6), 0 0 20px rgba(0, 157, 255, 0.4),
              0 0 30px rgba(0, 157, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 157, 255, 0.8), 0 0 30px rgba(155, 54, 255, 0.6),
              0 0 40px rgba(249, 38, 114, 0.4);
          }
          100% {
            box-shadow: 0 0 10px rgba(0, 157, 255, 0.6), 0 0 20px rgba(0, 157, 255, 0.4),
              0 0 30px rgba(0, 157, 255, 0.2);
          }
        }
      `}</style>
    </div>
  )
}
