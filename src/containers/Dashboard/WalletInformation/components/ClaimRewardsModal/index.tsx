import Dialog from 'components/Dialog'
import Loading from 'components/Dialog/components/Loading'
import Failure from 'components/Dialog/components/Failure'
import { initialRewardsModalProps, ModalStatus } from 'store/modal'
import Rewards from './Rewards'
import Success from './Success'
import useModal from './hooks'

const RewardsClaimModal: React.FC = () => {
  const { modal, handleModal } = useModal()
  const { open, status } = modal

  const handleClose = () => {
    handleModal({
      ...initialRewardsModalProps
    })
  }

  const handleTryAgain = () => {
    handleModal({
      status: ModalStatus.IN_PROGRESS
    })
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
      default:
        return <Rewards modalProps={modal} handleModal={handleModal} />
    }
  }

  return (
    <Dialog open={open} handleClose={handleClose}>
      {renderComponent()}
    </Dialog>
  )
}

export default RewardsClaimModal
