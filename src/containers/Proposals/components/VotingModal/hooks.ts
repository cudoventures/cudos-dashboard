import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store'
import { updateModal, VotingModalProps } from 'store/modal'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modal.voting)

  const handleModal = (modalState: Partial<VotingModalProps>) => {
    dispatch(updateModal({ voting: { ...modal, ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
