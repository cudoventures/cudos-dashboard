import { ModalStatus, initialModalState, ModalProps } from 'store/validator'
import Dialog from 'components/Dialog'
import Loading from 'components/Dialog/components/Loading'
import Failure from 'components/Dialog/components/Failure'
import Rewards from './Rewards'
import Success from './Success'

type RewardsClaimProps = {
  modal: ModalProps
  handleModal: (newState: any) => void
  validators: string[]
}

const RewardsClaimModal: React.FC<RewardsClaimProps> = ({
  modal,
  handleModal,
  validators
}) => {
  const { open, status } = modal

  const handleClose = () => {
    handleModal({
      ...initialModalState
    })
  }

  const renderComponent = () => {
    switch (status) {
      case ModalStatus.LOADING:
        return <Loading />
      case ModalStatus.SUCCESS:
        return <Success modalProps={modal} handleModal={handleModal} />
      case ModalStatus.FAILURE:
        return <Failure modalProps={modal} handleModal={handleModal} />
      default:
        return (
          <Rewards
            modalProps={modal}
            handleModal={handleModal}
            validators={validators}
          />
        )
    }
  }

  return (
    <Dialog open={open} handleClose={handleClose}>
      {renderComponent()}
    </Dialog>
  )
}

export default RewardsClaimModal
