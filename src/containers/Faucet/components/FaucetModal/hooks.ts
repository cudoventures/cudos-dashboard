import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store'
import { ModalProps, updateFaucetModal } from 'store/faucetModal'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.faucetModal.modal)

  const handleModal = (modalState: ModalProps) => {
    dispatch(updateFaucetModal({ modal: { ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
