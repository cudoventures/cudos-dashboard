import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress'

const LinearProgressChart = ({
  color,
  value
}: {
  color: string
  value: number
}) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#2E354F'
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 10,
      backgroundImage: color
    }
  }))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BorderLinearProgress variant="determinate" value={value} />
    </Box>
  )
}

export default LinearProgressChart
