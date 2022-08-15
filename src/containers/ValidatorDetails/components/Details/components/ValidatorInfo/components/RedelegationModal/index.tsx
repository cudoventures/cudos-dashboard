import { ModalStatus, initialRedelegationModalState } from 'store/modal'
import Dialog from 'components/Dialog'
import Loading from 'components/Dialog/components/Loading'
import Failure from 'components/Dialog/components/Failure'
import Success from 'components/Dialog/components/DelegationModal/Success'
import useModal from './hooks'
import Redelegation from './Redelegation'

const DelegationModal: React.FC = () => {
  const { modal, handleModal } = useModal()
  const { open, status } = modal

  const handleClose = () => {
    handleModal({
      ...initialRedelegationModalState
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
        return <Redelegation modalProps={modal} handleModal={handleModal} />
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
