import axios from 'axios'
import { AccountUndelegationsDocument } from '../graphql/account_actions'

export const fetchUndedelegations = async (
  address: string,
  signal?: AbortSignal
) => {
  const undelegationsArray: {
    validatorAddress: string
    amount: string
  }[] = []

  try {
    const { data } = await axios.post(
      import.meta.env.VITE_GRAPHQL_URL?.toString(),
      {
        variables: { address },
        query: AccountUndelegationsDocument
      },
      {
        signal
      }
    )

    data.data.undelegations.undelegations.map((value: any) => {
      return undelegationsArray.push({
        validatorAddress: value.validator_address,
        amount: value.entries.length
          ? value.entries.map((val: any) => val.balance)
          : '0'
      })
    })

    return { undelegationsArray }
  } catch (error) {
    return { undelegationsArray: [] }
  }
}
