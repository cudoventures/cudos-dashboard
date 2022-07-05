import { useState } from 'react'
import * as R from 'ramda'
import axios from 'axios'
import { useProposalDetailsVotesSubscription } from 'graphql/types'
import { ProposalDetailsVotesWeightedDocument } from 'graphql/proposal_details_votes_weighted'
import { useParams } from 'react-router-dom'
import { VoteState } from './types'

export const useVotingStatistics = (resetPagination: any) => {
  const { proposalId } = useParams()
  const [state, setState] = useState<VoteState>({
    data: [],
    validatorsNotVoted: [],
    voteCount: {
      yes: 0,
      no: 0,
      abstain: 0,
      veto: 0,
      didNotVote: 0
    },
    tab: 0
  })

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState))
  }

  const handleTabChange = (_event: any, newValue: number) => {
    if (resetPagination) {
      resetPagination()
    }
    handleSetState({
      tab: newValue
    })
  }

  const fetchWeightedVotes = async () => {
    return axios.post(import.meta.env.VITE_GRAPHQL_URL, {
      variables: {
        proposalId
      },
      query: ProposalDetailsVotesWeightedDocument
    })
  }

  const mergeRegularVotesWithWeighted = (
    proposalVote: any,
    votesWeightedData: any
  ) => {
    const mergedVotesData: { proposalVote: any[] } = {
      proposalVote: R.pathOr(
        [],
        ['data', 'data', 'proposalVoteWeighted'],
        votesWeightedData
      )
    }

    proposalVote.forEach((x: any) => {
      x.weight = '100.00%'
      x.isValidator = !!R.pathOr([], ['account', 'validator_infos'], x).length
      x.avatar = {
        moniker: R.pathOr(
          '',
          [
            'account',
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
            'account',
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
          ['account', 'validator_infos', 0, 'operator_address'],
          x
        )
      }
    })

    mergedVotesData.proposalVote.forEach((x: any) => {
      x.weight = `${(parseFloat(x.weight) * 100.0).toFixed(2)}%`
    })

    mergedVotesData.proposalVote = [
      ...proposalVote,
      ...mergedVotesData.proposalVote
    ]

    return mergedVotesData
  }

  const formatVotes = (data: any) => {
    const validatorDict: { [key: string]: boolean } = {}

    let yes = 0
    let no = 0
    let abstain = 0
    let veto = 0

    const votes = data.proposalVote.map((x: any) => {
      if (x.option === 'VOTE_OPTION_YES') {
        yes += 1
      }
      if (x.option === 'VOTE_OPTION_ABSTAIN') {
        abstain += 1
      }
      if (x.option === 'VOTE_OPTION_NO') {
        no += 1
      }
      if (x.option === 'VOTE_OPTION_NO_WITH_VETO') {
        veto += 1
      }
      if (validatorDict[x.voterAddress] === false) {
        validatorDict[x.voterAddress] = true
      }

      return {
        user: x.avatar.validatorAddress || x.voterAddress,
        vote: x.option,
        weight: x.weight,
        avatar: x.avatar,
        isValidator: x.isValidator
      }
    })

    return {
      data: votes,
      voteCount: {
        yes,
        no,
        veto,
        abstain
      }
    }
  }

  useProposalDetailsVotesSubscription({
    variables: {
      proposalId: Number(proposalId)
    },
    onSubscriptionData: (data) => {
      fetchWeightedVotes().then((votesWeightedData) => {
        const mergedVotesData = mergeRegularVotesWithWeighted(
          data.subscriptionData.data?.proposalVote,
          votesWeightedData
        )
        handleSetState(formatVotes(mergedVotesData))
      })
    }
  })

  return {
    state,
    handleTabChange
  }
}
