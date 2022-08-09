import Dialog from 'components/Dialog'
import Loading from 'components/Dialog/components/Loading'
import Failure from 'components/Dialog/components/Failure'
import { initialDepositModalState, ModalStatus } from 'store/modal'
import useModal from './hooks'
import Success from './Success'
import Deposit from './Deposit'

const DepositModal = () => {
  const { modal, handleModal } = useModal()
  const { open, status } = modal

  const handleClose = () => {
    handleModal({
      ...initialDepositModalState
    })
  }

  const handleTryAgain = () => {
    handleModal({ status: ModalStatus.IN_PROGRESS })
  }

  const renderComponent = () => {
    switch (status) {
      case ModalStatus.LOADING:
        return <Loading />
      case ModalStatus.SUCCESS:
        return <Success modalProps={modal} handleModal={handleModal} />
      case ModalStatus.FAILURE:
        return (
          <Failure
            failureMessage={modal.failureMessage}
            handleClose={handleClose}
            handleTryAgain={handleTryAgain}
          />
        )
      case ModalStatus.IN_PROGRESS:
        return <Deposit modalProps={modal} handleModal={handleModal} />
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

export default DepositModal
