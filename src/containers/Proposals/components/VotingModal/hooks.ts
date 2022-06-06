import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store'
import { ModalProps, updateVotingModal } from 'store/votingModal'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.votingModal.modal)

  const handleModal = (modalState: ModalProps) => {
    dispatch(updateVotingModal({ modal: { ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
