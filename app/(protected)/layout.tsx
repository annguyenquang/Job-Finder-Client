import React from 'react'
import { AIPopup, Navbar } from '@/components'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      {children}
      <AIPopup />
    </>
  )
}
