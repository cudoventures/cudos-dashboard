import { CircularProgress, Typography } from '@mui/material'
import { ModalContainer } from './styles'

const Loading: React.FC = () => {
  return (
    <ModalContainer sx={{ minWidth: '600px', padding: '4rem' }}>
      <CircularProgress thickness={5} sx={{ borderRadius: '20px' }} />
      <Typography variant="h4" fontWeight={900} letterSpacing={2}>
        Processing...
      </Typography>
      <Typography color="primary.main" fontWeight={900} letterSpacing={1}>
        Check details in your Keplr Wallet
      </Typography>
    </ModalContainer>
  )
}

export default Loading
