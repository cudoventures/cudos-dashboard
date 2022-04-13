import React from 'react'
import { Paper } from '@mui/material'
import theme from '../../theme'

const Card = ({
  children,
  style
}: {
  children: React.ReactNode
  style: any
}) => {
  return (
    <Paper
      sx={{
        borderRadius: '20px',
        padding: '20px',
        background: '#20273E'
      }}
      style={style}
    >
      {children}
    </Paper>
  )
}

export default Card
