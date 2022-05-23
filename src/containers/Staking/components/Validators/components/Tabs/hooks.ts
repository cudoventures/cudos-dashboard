import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store'
import { updateValidators } from 'store/validator'

export default () => {
  const dispatch = useDispatch()
  const tab = useSelector((state: RootState) => state.validator.tab)

  const handleTabChange = (_event: any, newValue: number) => {
    dispatch(updateValidators({ tab: newValue }))
  }

  return {
    tab,
    handleTabChange
  }
}
