import { Dialog as MuiDialog } from '@mui/material'

type DialogProps = {
  open: boolean
  handleClose: () => void
}

const Dialog: React.FC<DialogProps> = ({ open, handleClose, children }) => {
  const onClose = (ev: any, reason: string) => {
    if (reason !== 'backdropClick') {
      handleClose()
    }
  }

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: 'transparent',
          boxShadow: 'none',
          position: 'fixed',
          overflow: 'hidden'
        }
      }}
    >
      {children}
    </MuiDialog>
  )
}

export default Dialog
