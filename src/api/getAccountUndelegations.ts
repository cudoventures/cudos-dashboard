import axios from 'axios'
import { CHAIN_DETAILS } from 'utils/constants'
import { AccountUndelegationsDocument } from '../graphql/account_actions'

export const fetchUndedelegations = async (
  chosenNetwork: string,
  address: string,
  signal?: AbortSignal
) => {
  const undelegationsArray: {
    validatorAddress: string
    amount: string
    completionTime: string
  }[] = []

  try {
    const { data } = await axios.post(
      CHAIN_DETAILS.GRAPHQL_URL[chosenNetwork! as keyof typeof CHAIN_DETAILS.GRAPHQL_URL].toString(),
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
          : '0',
        completionTime: value.entries.map((entry: any) => entry.completion_time)
      })
    })

    return { undelegationsArray }
  } catch (error) {
    return { undelegationsArray: [] }
  }
}
