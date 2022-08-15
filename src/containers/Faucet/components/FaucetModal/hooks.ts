import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store'
import { updateModal, FaucetModalProps } from 'store/modal'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modal.faucet)

  const handleModal = (modalState: Partial<FaucetModalProps>) => {
    dispatch(updateModal({ faucet: { ...modal, ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
