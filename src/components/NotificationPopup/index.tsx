import { Snackbar, Stack, Typography } from '@mui/material'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'

import { useNotifications } from './hooks'
import { styles } from './styles'

const icons = {
  error: <ErrorRoundedIcon />,
  warning: <WarningRoundedIcon />,
  info: <InfoRoundedIcon />
}

type NotificationPopupProps = {
  type: 'error' | 'warning' | 'info'
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ type }) => {
  const { state, clearState } = useNotifications()

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={!!state[type]}
      onClose={() => clearState()}
      autoHideDuration={10000}
      message={
        <Stack direction="row" gap={1} alignItems="center">
          {icons[type]}
          <Typography variant="body2">{state[type]}</Typography>
        </Stack>
      }
      ContentProps={{
        sx: styles[type]
      }}
    />
  )
}

export default NotificationPopup
