import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store'
import { ModalProps, updateValidators } from '../../../../../../store/validator'

export default () => {
  const dispatch = useDispatch()
  const modal = useSelector((state: RootState) => state.validator.modal)

  const handleModal = (modalState: ModalProps) => {
    dispatch(updateValidators({ modal: { ...modalState } }))
  }

  return {
    modal,
    handleModal
  }
}
