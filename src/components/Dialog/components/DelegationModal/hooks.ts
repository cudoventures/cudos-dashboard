import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store'
import { DelegationModalProps, updateModal } from 'store/modal'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modal.delegation)

  const handleModal = (modalState: Partial<DelegationModalProps>) => {
    dispatch(updateModal({ delegation: { ...modal, ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
