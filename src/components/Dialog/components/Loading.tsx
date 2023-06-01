import { CircularProgress, Typography } from '@mui/material'
import { ModalContainer } from './styles'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

const Loading: React.FC = () => {

  const { connectedLedger } = useSelector((state: RootState) => state.profile)

  return (
    <ModalContainer sx={{ minWidth: '600px', padding: '4rem' }}>
      <CircularProgress thickness={5} sx={{ borderRadius: '20px' }} />
      <Typography variant="h4" fontWeight={900} letterSpacing={2}>
        Processing...
      </Typography>
      <Typography color="primary.main" fontWeight={900} letterSpacing={1}>
        {`Check details in your ${connectedLedger} Wallet`}
      </Typography>
    </ModalContainer>
  )
}

export default Loading
