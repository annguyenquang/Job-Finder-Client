'use client'
import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'
import { Paper, Typography, Box, Stack, Container, Button } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome' // Sparkle icon
import MinimizeIcon from '@mui/icons-material/Minimize' // Minimize icon from Material UI
import { InitialLayout } from './InitialLayout'

const AICaption = {
  INITIAL: 'Seeking for help ?',
  LOADING: 'Waiting for us to process ...',
  DONE: 'Hope you like our suggestions'
}

type ProcessState = 'INITIAL' | 'LOADING' | 'DONE'

export const AIPopup = () => {
  const [clicked, setClicked] = useState(false)
  const [processState, setProcessState] = useState<ProcessState>('INITIAL')

  const AICaption = {
    INITIAL: 'Seeking for help ?',
    LOADING: 'Waiting for us to proccess ...',
    DONE: 'Hope you like our suggestions'
  }

  const handleClick = () => {
    setClicked((prev) => !prev)
    setProcessState('INITIAL')
  }

  return (
    <div>
      <Box
        onClick={() => {
          if (!clicked) handleClick()
        }}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          cursor: clicked ? 'default' : 'pointer',
          width: clicked ? '450px' : '64px',
          height: clicked ? '600px' : '64px',
          borderRadius: clicked ? '20px' : '50%',
          background: 'linear-gradient(135deg, #53e2b9, #b2deac, #2b9db1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.4s ease',
          transformOrigin: 'right bottom'
        }}
      >
        {!clicked && <AutoAwesomeIcon style={{ fontSize: 36, color: '#fff' }} />}
        {clicked && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
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
                background: 'linear-gradient(135deg, #f6f6f6, #badbb6, #ffffff)'
              }}
            >
              <Typography variant='subtitle1' color='black'>
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
                <MinimizeIcon sx={{ lineHeight: 1, fontSize: '25px', color: 'black' }} />
              </Box>
            </Container>
            <Container
              sx={{
                width: '100%',
                background: 'transparent',
                height: '20%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Typography
                key={processState} // Add key to re-render on state change
                sx={{
                  overflow: 'hidden',
                  borderRight: '.15em solid purple',
                  whiteSpace: 'nowrap',
                  fontFamily: 'sans-serif',
                  fontWeight: '600',
                  margin: '0 auto',
                  letterSpacing: '.05em',
                  animation: 'typing 1.5s steps(40, end), blink-caret .75s step-end infinite',
                  background: 'linear-gradient(135deg, #0c97ff, #e64165, #00dce8)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent'
                }}
                variant='h5'
              >
                {AICaption[processState]}
              </Typography>
            </Container>
            <Container
              disableGutters={true}
              sx={{
                width: '100%',
                background: 'white',
                flexGrow: 1,
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <InitialLayout />
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

        /* The typing effect */
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 300px;
          }
        }

        /* The typewriter cursor effect */
        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: purple;
          }
        }
      `}</style>
    </div>
  )
}
