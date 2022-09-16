import { initialUnbondingModalProps } from 'store/modal'
import Dialog from 'components/Dialog'
import useModal from './hooks'
import Unbonding from './UnbondingModal'

const UnbondingModal: React.FC = () => {
  const { modal, handleModal } = useModal()
  const { open } = modal

  const handleClose = () => {
    handleModal({
      ...initialUnbondingModalProps
    })
  }

  const renderComponent = () => {
    return <Unbonding modalProps={modal} handleModal={handleModal} />
  }

  return (
    <Dialog open={open} handleClose={handleClose}>
      {renderComponent()}
    </Dialog>
  )
}

export default UnbondingModal
