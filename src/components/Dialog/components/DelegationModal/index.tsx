import { ModalStatus, initialDelegationModalState } from 'store/modal'
import Dialog from 'components/Dialog'
import Delegation from './Delegation'
import Success from './Success'
import Loading from '../Loading'
import Failure from '../Failure'
import useModal from './hooks'

const DelegationModal: React.FC = () => {
  const { modal, handleModal } = useModal()
  const { open, status } = modal

  const handleClose = () => {
    if (status !== ModalStatus.LOADING) {
      handleModal({
        ...initialDelegationModalState
      })
    }
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
        return <Delegation modalProps={modal} handleModal={handleModal} />
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

export default DelegationModal
