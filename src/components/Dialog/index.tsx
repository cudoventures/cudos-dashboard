import { Dialog as MuiDialog } from '@mui/material'

type DialogProps = {
  open: boolean
  height?: any
  handleClose: () => void
}

const Dialog: React.FC<DialogProps> = ({
  open,
  handleClose,
  children,
  height
}) => {
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
          overflow: 'hidden',
          minHeight: height
        }
      }}
    >
      {children}
    </MuiDialog>
  )
}

export default Dialog
