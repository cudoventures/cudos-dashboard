import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store'
import { updateModal, RewardsModalProps } from 'store/modal'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modal.rewards)

  const handleModal = (modalState: Partial<RewardsModalProps>) => {
    dispatch(updateModal({ rewards: { ...modal, ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
