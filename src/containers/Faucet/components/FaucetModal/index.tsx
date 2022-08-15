import Dialog from 'components/Dialog'
import Loading from 'components/Dialog/components/Loading'
import { initialFaucetModalProps, ModalStatus } from 'store/modal'
import Failure from 'components/Dialog/components/Failure'
import useModal from './hooks'
import Success from './Success'

const FaucetModal = () => {
  const { modal, handleModal } = useModal()
  const { open, status } = modal

  const handleClose = () => {
    handleModal({
      ...initialFaucetModalProps
    })
  }

  const renderComponent = () => {
    switch (status) {
      case ModalStatus.LOADING:
        return <Loading />
      case ModalStatus.SUCCESS:
        return <Success handleClose={handleClose} />
      case ModalStatus.FAILURE:
        return (
          <Failure
            failureMessage={modal.failureMessage}
            handleClose={handleClose}
            handleTryAgain={handleClose}
          />
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} handleClose={handleClose}>
      {renderComponent()}
    </Dialog>
  )
}

export default FaucetModal
