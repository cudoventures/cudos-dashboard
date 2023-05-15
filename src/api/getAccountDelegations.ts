import axios from 'axios'
import { CHAIN_DETAILS } from 'utils/constants'
import { AccountDelegationsDocument } from '../graphql/account_actions'

export const fetchDelegations = async (
  address: string,
  signal?: AbortSignal
) => {
  const delegationsArray: { address: string; amount: string }[] = []

  try {
    const { data } = await axios.post(
      CHAIN_DETAILS.GRAPHQL_URL,
      {
        variables: { address },
        query: AccountDelegationsDocument
      },
      {
        signal
      }
    )

    data.data.delegations.delegations.map((value: any) => {
      return delegationsArray.push({
        address: value.validator_address,
        amount: value.coins.length ? value.coins[0].amount.split('.')[0] : '0'
      })
    })

    return { delegationsArray }
  } catch (error) {
    return { delegationsArray: [] }
  }
}
