import { useSelector } from 'react-redux'

import { RootState } from 'store'

export default () => {
  const count = useSelector((state: RootState) => state.validator.count)

  return {
    count
  }
}
