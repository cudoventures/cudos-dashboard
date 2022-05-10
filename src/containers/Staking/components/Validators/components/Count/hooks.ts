import { useSelector } from 'react-redux'

import { RootState } from 'store'

export default () => {
  const items = useSelector((state: RootState) => state.validator.items)

  return {
    count: items.length
  }
}
