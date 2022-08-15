import { Dialog as MuiDialog } from '@mui/material'

type DialogProps = {
  open: boolean
  handleClose: () => void
}

const Dialog: React.FC<DialogProps> = ({ open, handleClose, children }) => {
  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          background: 'transparent',
          boxShadow: 'none',
          position: 'fixed',
          overflow: 'hidden'
        }
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0,0,30,0.4)'
        }
      }}
    >
      {children}
    </MuiDialog>
  )
}

export default Dialog
