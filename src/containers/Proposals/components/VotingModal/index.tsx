import Dialog from 'components/Dialog'
import Loading from 'components/Dialog/components/Loading'
import Failure from 'components/Dialog/components/Failure'
import { initialVotingModalState, ModalStatus } from 'store/modal'
import useModal from './hooks'
import Success from './Success'
import Vote from './Vote'

const VotingModal = () => {
  const { modal, handleModal } = useModal()
  const { open, status } = modal

  const handleClose = () => {
    handleModal({ ...initialVotingModalState })
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
        return <Vote modalProps={modal} handleModal={handleModal} />
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

export default VotingModal
