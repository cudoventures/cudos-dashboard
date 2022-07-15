import { ModalStatus, initialModalState } from 'store/validator'
import Dialog from 'components/Dialog'
import Loading from 'components/Dialog/components/Loading'
import Failure from 'components/Dialog/components/Failure'
import Success from 'components/Dialog/components/DelegationModal/Success'
import Undelegation from './Undelegation'
import useModal from './hooks'

const DelegationModal: React.FC = () => {
  const { modal, handleModal } = useModal()
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
        return <Undelegation modalProps={modal} handleModal={handleModal} />
    }
  }

  return (
    <Dialog open={open} handleClose={handleClose}>
      {renderComponent()}
    </Dialog>
  )
}

export default DelegationModal
