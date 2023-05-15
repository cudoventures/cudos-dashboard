import axios from 'axios'
import BigNumber from 'bignumber.js'
import { CHAIN_DETAILS } from 'utils/constants'
import { AccountRedelegationsDocument } from '../graphql/account_actions'

export const fetchRedelegations = async (
  address: string,
  signal?: AbortSignal
) => {
  const redelegationsArray: {
    sourceAddress: string
    destinationAddress: string
    amount: BigNumber
  }[] = []

  try {
    const { data } = await axios.post(
      CHAIN_DETAILS.GRAPHQL_URL,
      {
        variables: { address },
        query: AccountRedelegationsDocument
      },
      {
        signal
      }
    )

    data.data.redelegations.redelegations.map((value: any) => {
      return redelegationsArray.push({
        sourceAddress: value.validator_src_address,
        destinationAddress: value.validator_dst_address,
        amount: value.entries.length
          ? value.entries.map((val: any) => val.balance)
          : '0'
      })
    })

    return { redelegationsArray }
  } catch (error) {
    return { redelegationsArray: [] }
  }
}
