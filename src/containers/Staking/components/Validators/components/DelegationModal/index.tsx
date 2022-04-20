import { DelegationStatus, ModalProps } from '../../../../../../store/validator'
import Dialog from '../../../../../../components/Dialog'
import Delegation from './Delegation'
import Loading from './Loading'
import Success from './Success'
import Failure from './Failure'

type DelegationModalProps = {
  modalProps: ModalProps
  handleModal: (modalProps: ModalProps) => void
}

const DelegationModal: React.FC<DelegationModalProps> = ({
  modalProps,
  handleModal
}) => {
  const { open, status } = modalProps

  const handleClose = () => {
    handleModal({ open: false, validator: null, amount: null, status: null })
  }

  const renderComponent = () => {
    switch (status) {
      case DelegationStatus.LOADING:
        return <Loading />
      case DelegationStatus.SUCCESS:
        return <Success modalProps={modalProps} handleModal={handleModal} />
      case DelegationStatus.FAILURE:
        return <Failure modalProps={modalProps} handleModal={handleModal} />
      default:
        return <Delegation modalProps={modalProps} handleModal={handleModal} />
    }
  }

  return (
    <Dialog open={open} handleClose={handleClose}>
      {renderComponent()}
    </Dialog>
  )
}

export default DelegationModal
