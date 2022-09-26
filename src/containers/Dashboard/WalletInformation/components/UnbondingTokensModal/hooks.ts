import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store'
import { UnbondingModalProps, updateModal } from 'store/modal'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modal.unbonding)

  const handleModal = (modalState: Partial<UnbondingModalProps>) => {
    dispatch(updateModal({ unbonding: { ...modal, ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
