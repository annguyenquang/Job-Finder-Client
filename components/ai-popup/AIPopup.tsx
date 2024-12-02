'use client'
import React, { useEffect, useState } from 'react'
import { Paper, Typography, Box, Stack, Container, Button } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome' // Sparkle icon
import MinimizeIcon from '@mui/icons-material/Minimize' // Minimize icon from Material UI
import { InitialLayout } from './InitialLayout'
import { useAIStore } from '@/stores/AIPopupStore'
import { LoadingLayout } from './LoadingLayout'
import { useAccountStore } from '@/stores'
import { DoneLayout } from './DoneLayout'
import { DoneLayoutSkeleton } from './DoneLayoutSkeleton'
import { AccountType, UserAccount } from '@/models'

const AICaption = {
  INITIAL: 'Seeking for help ?',
  LOADING: 'Waiting for us to process ...',
  DONE: 'Hope you like our suggestions'
}

export const AIPopup = () => {
  const [clicked, setClicked] = useState(false)
  const AIStore = useAIStore()
  const accountStore = useAccountStore()

  const TestValue: UserAccount = {
    id: '123',
    username: 'annguyeen0',
    firstName: 'An',
    lastName: 'Nguyen',
    phone: '0389553233',
    email: 'annguyeen0@gmail.com',
    selfDescription: 'I am a software engineer',
    skills: ['React', 'NodeJS'],
    certifications: [
      { issueDate: new Date(), expirationDate: new Date(), name: 'React', issuingOrganization: 'Facebook' }
    ],
    dateOfBirth: new Date()
  }
  const [user, setUser] = React.useState<UserAccount | null>(TestValue)

  useEffect(() => {
    if (!accountStore.account) {
      accountStore.loadAccountByJwt()
    }
    console.log('Account: ' + accountStore.account)
    const userId = accountStore.account?.id
    const param = AIStore.reqParam
    if (userId) param.setUserId(userId)
    AIStore.updateParam(param)
  }, [])
  useEffect(() => {
    if (accountStore.accountType === AccountType.User) {
      setUser(accountStore.account as UserAccount)
    }
  }, [accountStore.account, accountStore.accountType])

  const layoutMap = {
    INITIAL: <InitialLayout />,
    LOADING: <DoneLayoutSkeleton />,
    DONE: <DoneLayout></DoneLayout>
  }

  const AICaption = {
    INITIAL: 'Seeking for help ?',
    LOADING: 'Waiting for us to proccess ...',
    DONE: 'Hope you like our suggestions'
  }

  const handleClick = () => {
    setClicked((prev) => !prev)
    AIStore.updateProcessState('INITIAL')
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
          height: clicked ? '700px' : '64px',
          borderRadius: clicked ? '20px' : '50%',
          // background: 'linear-gradient(135deg, #53e2b9, #b2deac, #2b9db1)',
          background: 'linear-gradient(135deg, #000000, #808080)',
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
              // background: 'linear-gradient(135deg, #53e2b9, #b2deac, #2b9db1)'
              background: 'black'
            }}
          >
            <Container
              sx={{
                display: 'flex',
                borderRadius: '20px',
                justifyContent: 'space-between',
                padding: '10px',
                // background: 'linear-gradient(135deg, #f6f6f6, #badbb6, #ffffff)'
                background: 'white'
              }}
            >
              <Typography
                variant='subtitle1'
                color='black'
              >
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
                key={AIStore.processState} // Add key to re-render on state change
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
                {AICaption[AIStore.processState]}
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
              {layoutMap[AIStore.processState]}
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
