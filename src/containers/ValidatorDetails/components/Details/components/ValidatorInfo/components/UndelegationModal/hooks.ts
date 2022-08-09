import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store'
import { UndelegationModalProps, updateModal } from 'store/modal'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modal.undelegation)

  const handleModal = (modalState: Partial<UndelegationModalProps>) => {
    dispatch(updateModal({ undelegation: { ...modal, ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
