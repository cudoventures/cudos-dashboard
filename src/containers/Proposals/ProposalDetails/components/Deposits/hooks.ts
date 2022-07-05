import { useState } from 'react'
import * as R from 'ramda'
import { useProposalDetailsDepositsSubscription } from 'graphql/types'
import { chainConfig } from 'configs'
import { formatToken } from 'utils/format_token'
import { useParams } from 'react-router-dom'
import { DepositState } from './types'

export const useDeposits = () => {
  const { proposalId } = useParams()
  const [state, setState] = useState<DepositState>({
    data: []
  })

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState))
  }

  const foramtProposalDeposits = (data: any) => {
    const format = data.proposalDeposit.map((x: any) => {
      const isValidator = !!R.pathOr([], ['depositor', 'validator_infos'], x)
        .length
      const avatar = {
        moniker: R.pathOr(
          '',
          [
            'depositor',
            'validator_infos',
            0,
            'validator',
            'validator_descriptions',
            0,
            'moniker'
          ],
          x
        ),
        imageUrl: R.pathOr(
          '',
          [
            'depositor',
            'validator_infos',
            0,
            'validator',
            'validator_descriptions',
            0,
            'avatar_url'
          ],
          x
        ),
        validatorAddress: R.pathOr(
          '',
          ['depositor', 'validator_infos', 0, 'operator_address'],
          x
        )
      }
      return {
        amount: formatToken(
          R.pathOr('0', ['amount', 0, 'amount'], x),
          R.pathOr(chainConfig.primaryTokenUnit, ['amount', 0, 'denom'], x)
        ),
        user:
          R.pathOr(
            '',
            ['depositor', 'validator_infos', 0, 'operator_address'],
            x
          ) || R.pathOr('', ['depositorAddress'], x),
        isValidator,
        avatar,
        timestamp: R.pathOr('', ['block', 'timestamp'], x)
      }
    })

    return {
      data: format
    }
  }

  useProposalDetailsDepositsSubscription({
    variables: {
      proposalId: Number(proposalId)
    },
    onSubscriptionData: ({ subscriptionData }) => {
      handleSetState(foramtProposalDeposits(subscriptionData.data))
    }
  })

  return {
    state
  }
}
