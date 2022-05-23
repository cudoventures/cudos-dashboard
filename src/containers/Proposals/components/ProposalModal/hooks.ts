import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store'
import { ModalProps, updateProposals } from 'store/proposals'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.proposals.modal)

  const handleModal = (modalState: ModalProps) => {
    dispatch(updateProposals({ modal: { ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
