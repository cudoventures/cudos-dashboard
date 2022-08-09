import { Box, Typography, Button } from '@mui/material'
import FailureIcon from 'assets/vectors/failure.svg?component'
import { ModalContainer, CancelRoundedIcon } from './styles'

type FailureProps = {
  failureMessage: {
    title: string
    subtitle: string
  }
  handleClose: () => void
  handleTryAgain: () => void
}

const Failure: React.FC<FailureProps> = ({
  failureMessage,
  handleClose,
  handleTryAgain
}) => {
  const { title, subtitle } = failureMessage

  return (
    <ModalContainer sx={{ padding: '4rem' }}>
      <FailureIcon />
      <CancelRoundedIcon onClick={handleClose} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        gap={1}
      >
        <Typography variant="h4" fontWeight={900} letterSpacing={2}>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={() => ({
          width: '50%',
          fontWeight: 700
        })}
        onClick={handleTryAgain}
      >
        Try again
      </Button>
    </ModalContainer>
  )
}

export default Failure
