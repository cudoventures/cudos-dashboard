import React from 'react'
import { Paper } from '@mui/material'

const Card = ({ children }: { children: React.ReactNode }) => {
  return <Paper>{children}</Paper>
}

export default Card
