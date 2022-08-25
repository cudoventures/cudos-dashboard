import * as R from 'ramda'
import { formatToken } from 'utils/format_token'
import { chainConfig } from 'configs'
import { updateProposalDetails } from 'store/proposalDetails'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { useParams } from 'react-router-dom'
import {
  useProposalDetailsTallyQuery,
  ProposalDetailsTallyQuery,
  useProposalDetailsTallySubscriptionSubscription
} from '../../../../../graphql/types'

export const useVotesGraph = () => {
  const dispatch = useDispatch()
  const { proposalId } = useParams()
  const proposalState = useSelector((state: RootState) => state.proposalDetails)

  const handleSetState = (stateChange: any) => {
    dispatch(updateProposalDetails({ ...stateChange }))
  }

  const foramtProposalTally = (data: ProposalDetailsTallyQuery) => {
    return {
      votes: {
        yes: formatToken(
          R.pathOr('0', ['proposalTallyResult', 0, 'yes'], data),
          chainConfig.votingPowerTokenUnit
        ),
        no: formatToken(
          R.pathOr('0', ['proposalTallyResult', 0, 'no'], data),
          chainConfig.votingPowerTokenUnit
        ),
        veto: formatToken(
          R.pathOr('0', ['proposalTallyResult', 0, 'noWithVeto'], data),
          chainConfig.votingPowerTokenUnit
        ),
        abstain: formatToken(
          R.pathOr('0', ['proposalTallyResult', 0, 'abstain'], data),
          chainConfig.votingPowerTokenUnit
        )
      },
      bonded: formatToken(
        R.pathOr('0', ['stakingPool', 0, 'bondedTokens'], data),
        chainConfig.votingPowerTokenUnit
      )
    }
  }

  const foramtProposalTallySub = (data: ProposalDetailsTallyQuery) => {
    return {
      votes: {
        yes: formatToken(
          R.pathOr('0', ['proposalTallyResult', 0, 'yes'], data),
          chainConfig.votingPowerTokenUnit
        ),
        no: formatToken(
          R.pathOr('0', ['proposalTallyResult', 0, 'no'], data),
          chainConfig.votingPowerTokenUnit
        ),
        veto: formatToken(
          R.pathOr('0', ['proposalTallyResult', 0, 'noWithVeto'], data),
          chainConfig.votingPowerTokenUnit
        ),
        abstain: formatToken(
          R.pathOr('0', ['proposalTallyResult', 0, 'abstain'], data),
          chainConfig.votingPowerTokenUnit
        )
      }
    }
  }

  useProposalDetailsTallyQuery({
    variables: {
      proposalId: Number(proposalId) || 0
    },
    onCompleted: (data) => {
      handleSetState(foramtProposalTally(data))
    }
  })

  useProposalDetailsTallySubscriptionSubscription({
    variables: {
      proposalId: Number(proposalId) || 0
    },
    onSubscriptionData: (data: any) => {
      handleSetState(foramtProposalTallySub(data.subscriptionData.data))
    }
  })

  return {
    proposalState
  }
}
