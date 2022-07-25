import Dialog from 'components/Dialog'
import Loading from 'components/Dialog/components/Loading'
import { FaucetStatus, initialModalState } from 'store/faucetModal'
import useModal from './hooks'
import Failure from './Failure'
import Success from './Success'

const FaucetModal = () => {
  const { modal, handleModal } = useModal()
  const { open, status } = modal

  const handleClose = () => {
    handleModal({
      ...initialModalState
    })
  }

  const renderComponent = () => {
    switch (status) {
      case FaucetStatus.LOADING:
        return <Loading />
      case FaucetStatus.SUCCESS:
        return <Success modalProps={modal} handleModal={handleModal} />
      case FaucetStatus.FAILURE:
        return <Failure modalProps={modal} handleModal={handleModal} />
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
