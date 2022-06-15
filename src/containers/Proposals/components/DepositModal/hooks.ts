import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store'
import { ModalProps, updateDepositModal } from 'store/depositModal'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.depositModal.modal)

  const handleModal = (modalState: ModalProps) => {
    dispatch(updateDepositModal({ modal: { ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
