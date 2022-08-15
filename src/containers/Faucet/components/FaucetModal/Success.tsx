import { Box, Typography, Button } from '@mui/material'
import SuccessIcon from 'assets/vectors/success.svg'
import { ModalContainer, CancelRoundedIcon } from './styles'

type SuccessProps = {
  handleClose: () => void
}

const Success: React.FC<SuccessProps> = ({ handleClose }) => {
  return (
    <ModalContainer sx={{ padding: '4rem' }}>
      <img src={SuccessIcon} alt="success-icon" />
      <CancelRoundedIcon onClick={handleClose} />
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <Typography variant="h4" fontWeight={900} letterSpacing={2}>
          Success!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Transaction was successfully executed!
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={() => ({
          width: '50%',
          fontWeight: 700
        })}
        onClick={handleClose}
      >
        Finish
      </Button>
    </ModalContainer>
  )
}

export default Success
