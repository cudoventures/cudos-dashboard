import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store'
import { ModalProps } from 'store/validator'
import { updateValidatorDetails } from 'store/validatorDetails'

export default () => {
  const dispatch = useDispatch()
  const modals = useSelector(
    (state: RootState) => state.validatorDetails.modals
  )

  const handleModal = (modalState: ModalProps) => {
    dispatch(
      updateValidatorDetails({
        modals: { ...modals, redelegation: { ...modalState } }
      })
    )
  }

  return {
    modal: modals.redelegation,
    handleModal
  }
}
