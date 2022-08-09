import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store'
import { updateModal, DepositModalProps } from 'store/modal'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modal.deposit)

  const handleModal = (modalState: Partial<DepositModalProps>) => {
    dispatch(updateModal({ deposit: { ...modal, ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
