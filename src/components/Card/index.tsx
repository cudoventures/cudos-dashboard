import { Paper, styled } from '@mui/material'

const Card = styled(Paper)(({ theme }) => ({
  borderRadius: '20px',
  padding: '20px',
  background: theme.custom.backgrounds.primary
}))

export default Card
