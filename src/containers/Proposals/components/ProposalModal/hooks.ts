import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store'
import { ProposalModalProps, updateModal } from 'store/modal'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.modal.proposal)

  const handleModal = (modalState: Partial<ProposalModalProps>) => {
    dispatch(updateModal({ proposal: { ...modal, ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
