import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store'
import { RedelegationModalProps, updateModal } from 'store/modal'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modal.redelegation)

  const handleModal = (modalState: Partial<RedelegationModalProps>) => {
    dispatch(updateModal({ redelegation: { ...modal, ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
